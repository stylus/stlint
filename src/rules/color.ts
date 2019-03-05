import { Rule } from "../core/rule";
import { IState } from "../core/types/state";
import { Block, RGB } from "../core/ast";

interface IColorState extends IState {
	allowOnlyInVar: boolean
}

export class Color extends Rule<IColorState> {
	nodesFilter = ['rgb'];

	checkNode(node: RGB) {
		const checkReg = this.state.conf === 'uppercase' ? /[a-z]/ : /[A-Z]/;

		if (this.state.allowOnlyInVar) {
			let elm = node.parent;

			while (elm) {
				if (elm instanceof Block) {
					this.msg(`Set color only in variable`, node.lineno, node.column, node.column + node.value.length - 1);
					break;
				}
				elm = elm.parent;
			}
		}

		if (node.value && typeof node.value === 'string' && checkReg.test(node.value)) {
			this.msg(`Only ${ this.state.conf } HEX format`, node.lineno, node.column, node.column + node.value.length - 1);
			return true;
		}

		return false;
	}
}

import { Rule } from "../core/rule";
import { INode } from "../core/types/ast/node";

export class Color extends Rule {
	nodesFilter = ['rgb'];

	checkNode(node: INode) {
		const checkReg = this.state.conf === 'uppercase' ? /[a-z]/ : /[A-Z]/;

		if (node.value && typeof node.value === 'string' && checkReg.test(node.value)) {
			this.msg(`Only ${ this.state.conf } HEX format`, node.lineno, node.column, node.column + node.value.length - 1);
			return true;
		}

		return false;
	}
}

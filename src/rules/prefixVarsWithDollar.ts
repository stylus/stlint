import { Rule } from "../core/rule";
import { Func, Ident, Tree} from "../core/ast";
import { IState } from "../core/types/state";

interface IPrefixVarState extends IState {
	prefix: string
}

/**
 * Check that $ is used when declaring vars
 */

export class PrefixVarsWithDollar extends Rule<IPrefixVarState> {
	nodesFilter = ['ident'];

	checkNode(node: Ident): boolean | void {
		if (!(node.parent instanceof Tree) || (node.value instanceof Func)) {
			return;
		}

		let
			hasDollar = node.key.indexOf(this.state.prefix) === 0;

		if (this.state.conf === 'always' && hasDollar === false) {
			//console.log(node.key.length);
			this.msg( `variables and parameters must be prefixed with the ${this.state.prefix} sign (${node.key})`, node.lineno, node.column, node.column + node.key.length - 1);
		}
		else if (this.state.conf === 'never' && hasDollar === true) {
			this.msg( `${this.state.prefix} sign is disallowed for variables and parameters (${node.key})`, node.lineno, node.column, node.column + node.key.length - 1);
		}

		return hasDollar;
	}
}

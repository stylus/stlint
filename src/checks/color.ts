import { Check } from "../core/check";
import { INode } from "../core/types/ast/node";

export class Color extends Check {
	nodesFilter = ['rgba'];

	isHasLowerCase(value: string):boolean {
		return /[a-z]/.test(value)
	}

	process(node: INode) {
		if (node.raw && this.isHasLowerCase(node.nodeName)) {
			this.msg('Only lowercase HEX format', node.lineno);
		}
	}
}

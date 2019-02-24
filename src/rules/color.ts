import { Rule } from "../core/rule";
import { INode } from "../core/types/ast/node";

export class Color extends Rule {
	nodesFilter = ['rgb'];

	checkNode(node: INode) {
		if (node.value && typeof node.value === 'string' && /[a-z]/.test(node.value)) {
			this.msg('Only lowercase HEX format', node.lineno, node.column, node.column + node.value.length - 1);
		}
	}
}

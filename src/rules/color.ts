import { Rule } from "../core/rule";

export class Color extends Rule {
	nodesFilter = ['rgba'];

	isHasLowerCase(value: string):boolean {
		return /[a-z]/.test(value)
	}

	process(node) {
		if (node.raw && this.isHasLowerCase(node.raw)) {
			this.msg('Only lowercase HEX format', node.lineno);
		}
	}
}

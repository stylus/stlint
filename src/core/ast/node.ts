import { INode } from "../types/ast/node";
import { ISNode } from "../types/ast/snode";

export class Node implements INode {
	parent: INode | null = null;
	lineno = 0;
	column = 0;
	nodes: INode[] = [];
	source: ISNode | null = null;

	constructor(block: ISNode, parent: INode | null) {
		this.lineno = block.lineno;
		this.column = block.column;
		this.source = block;
		this.parent = parent;
	}

	get nodeName(): string {
		return this.constructor.name.toLowerCase();
	}

	append<T extends INode>(node: T, listField: keyof T = 'nodes') {
		const list = (<any>this)[listField];

		if (list && Array.isArray(list) && node instanceof Node) {
			list.push(node);
		}

		node.parent = this;
	}

	value: string | INode | null = '';
	toString() {
		return this.value ? this.value.toString() : '';
	}
}

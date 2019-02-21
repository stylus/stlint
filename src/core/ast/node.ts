import { INode } from "../types/ast/node";

export class Node implements INode {
	parent: INode | null = null;
	lineno = 0;
	column = 0;
	nodes: INode[] = [];

	constructor(lineno: number, column: number) {
		this.lineno = lineno;
		this.column = column;
	}

	get nodeName(): string {
		return this.constructor.name.toLowerCase();
	}

	append<T extends Node>(node: INode, listField: keyof T = 'nodes') {
		const list = (<any>this)[listField];

		if (list && Array.isArray(list)) {
			list.push(node);
		}

		node.parent = this;
	}
}

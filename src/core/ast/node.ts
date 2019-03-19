import { INode } from '../types/ast/node';
import { ISNode } from '../types/ast/snode';

export class Node implements INode {

	get nodeName(): string {
		return this.constructor.name.toLowerCase();
	}

	parent: INode | null = null;
	lineno: number = 0;
	column: number = 0;
	nodes: INode[] = [];
	source: ISNode | null = null;

	value: string | INode | null = '';

	constructor(block: ISNode, parent: INode | null) {
		this.lineno = block.lineno;
		this.column = block.column;
		this.source = block;
		this.parent = parent;
	}

	append<T extends INode>(node: T, listField: keyof T = 'nodes'): void {
		const list = (<any>this)[listField];

		if (list && Array.isArray(list) && node instanceof Node) {
			list.push(node);
		}

		node.parent = this;
	}

	/**
	 * Use stylus source
	 */
	toString(): string {
		if (this.source) {
			return this.source.toString();
		}

		return this.value ? this.value.toString() : ' ';
	}

	getSibling(next: boolean = false): null | INode {
		if (this.parent && this.parent.nodes.length) {
			const index = this.parent.nodes.indexOf(this);

			if (index !== -1 && ((!next && index > 0) || (next && index < this.parent.nodes.length - 2))) {
				return this.parent.nodes[index + (next ? 1 : -1)];
			}
		}

		return null;
	}

	/**
	 * Get previous node in parent.nodes
	 */
	previousSibling(): null | INode {
		return this.getSibling();
	}

	/**
	 * Get next node in parent.nodes
	 */
	nextSibling(): null | INode {
		return this.getSibling(true);
	}

	/**
	 * Get match parent
	 * @param parentClass
	 */
	closest<T extends Node>(parentClass: string): null | T {
		const
			reg = RegExp(`^(${parentClass})$`, 'i');

		let
			node = this.parent;

		while (node) {
			if (reg.test(node.nodeName)) {
				return <T>node;
			}

			node = node.parent;
		}

		return null;
	}
}

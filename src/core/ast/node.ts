import { INode } from '../types/ast/node';
import { ISNode } from '../types/ast/snode';
import { Line } from '../line';
import { IContent } from '../types/content';

export class Node implements INode {

	get nodeName(): string {
		return this.constructor.name.toLowerCase();
	}

	parent: Node | null = null;
	lineno: number = 0;
	column: number = 0;
	nodes: Node[] = [];
	source: ISNode | null = null;

	/**
	 * Content
	 */
	content: IContent | null = null;

	/**
	 * Get line object
	 */
	get line(): Line | null {
		return (this.content && this.lineno && this.content.getLine(this.lineno)) || null;
	}

	value: string | Node | null = '';

	constructor(block: ISNode, parent: Node | null) {
		this.lineno = block.lineno;
		this.column = block.column;
		this.source = block;
		this.parent = parent;
	}

	append<T extends INode>(node: INode, listField: keyof T = 'nodes'): void {
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

	getSibling(next: boolean = false): null | Node {
		if (this.parent && this.parent.nodes.length) {
			const index = this.parent.nodes.indexOf(this);

			if (index !== -1 && ((!next && index > 0) || (next && index < this.parent.nodes.length - 2))) {
				return (<Node | void>this.parent.nodes[index + (next ? 1 : -1)]) || null;
			}
		}

		return null;
	}

	/**
	 * Get previous node in parent.nodes
	 */
	previousSibling(): null | Node {
		return this.getSibling();
	}

	/**
	 * Get next node in parent.nodes
	 */
	nextSibling(): null | Node {
		return this.getSibling(true);
	}

	/**
	 * Get matched parent
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

	getChild(findClass?: string, last: boolean = false): null | Node {
		let
			node: Node | null | void = <Node | null | void>this.nodes[last ? this.nodes.length - 1 : 0];

		if (findClass === undefined) {
			return node || null;
		}

		if (node) {
			const
				reg = RegExp(`^(${findClass})$`, 'i');

			while (node) {
				if (reg.test(node.nodeName)) {
					return node;
				}

				node = (last ? node.previousSibling() : node.nextSibling());
			}
		}

		return null;
	}

	/**
	 * Get first matched child
	 * @param findClass
	 */
	lastChild<T extends Node>(findClass?: string): null | T {
		return <T>this.getChild(findClass, true);
	}

	/**
	 * Get last matched child
	 * @param findClass
	 */
	firstChild<T extends Node>(findClass?: string): null | T {
		return <T>this.getChild(findClass, false);
	}
}

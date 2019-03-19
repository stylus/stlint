import { Visitor } from './visitor';
import { Node } from './ast/index';
import { INode } from './types/ast/node';

export class Runner extends  Visitor<INode, INode> {
	constructor(ast: INode, readonly fn: (node: INode) => void) {
		super(ast);
	}

	visitNode(node: INode, parent: INode): INode {
		this.fn(node);

		node.nodes.forEach((elm) => this.visit(elm, parent));

		if (node.value && node.value instanceof Node) {
			this.visit(node.value, parent);
		}

		return node;
	}
}

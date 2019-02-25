import { Visitor } from "./visitor";
import { Node } from "./ast/";
import { INode } from "./types/ast/node";

export class Runner extends  Visitor<INode, INode> {
	constructor(ast: INode, readonly fn: (node: INode) => void) {
		super(ast);
	}

	visitNode(node: INode): INode {
		this.fn(node);

		node.nodes.forEach(elm => this.visit(elm));

		if (node.value && node.value instanceof Node) {
			this.visit(node.value);
		}

		return node;
	}
}

import { ISNode } from "./types/ast/snode";
import { INode } from "./types/ast/node";

export abstract class Visitor<In = ISNode, Out = INode> {
	root: In;

	constructor(root: In) {
		this.root = root;
	}

	abstract visitNode(node: In): Out;

	methodNotExists(method: string) {}

	visit(node: In): Out {
		const method = 'visit' + node.constructor.name;

		const fn: undefined | ((node: In) => Out) = (<any>this)[method];

		if (fn && typeof fn === 'function') {
			return fn.call(this, node);
		}

		this.methodNotExists(method);

		return this.visitNode(node);
	}
}

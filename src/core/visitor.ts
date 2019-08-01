import { ISNode } from './types/ast/snode';
import { INode } from './types/ast/node';

export abstract class Visitor<In = ISNode, Out = INode> {
	root: In;

	protected constructor(root: In) {
		this.root = root;
	}

	abstract visitNode(node: In, parent: Out | null): Out;

	methodNotExists(method: string, node: In): void {
		// ignore
	}

	visit(node: In, parent: Out | null): Out {
		const method = 'visit' + (<any>node).constructor.name;

		const fn: undefined | ((node: In, parent: Out | null) => Out) = (<any>this)[method];

		if (fn && typeof fn === 'function') {
			return fn.call(this, node, parent);
		}

		this.methodNotExists(method, node);

		return this.visitNode(node, parent);
	}
}

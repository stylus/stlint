export class Visitor<T> {
	root: T;

	constructor(root: T) {
		this.root = root;
	}

	visit(node: T): T {
		const method = 'visit' + node.constructor.name;
		console.log(method);

		const fn: undefined | ((node: T) => T) = (<any>this)[method];

		if (fn && typeof fn === 'function') {
			return fn.call(this, node);
		}

		return node;
	}
}

import { Node } from './node';

export class BinOp extends Node {
	left: Node | null = null;
	right: Node | null = null;

	toString(): string | string {
		let right = this.right ? this.right.toString() : '';

		if (right) {
			right = /^[0-9]$/.test(right) ? `[${right}]` : `.${right}`;
		}

		return (this.left && right) ? this.left.toString() + right : super.toString();
	}
}

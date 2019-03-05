import { Node } from "./node";

export class Literal extends Node {
	val: string = '';

	toString() {
		return this.val;
	}
}

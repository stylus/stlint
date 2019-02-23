import { Node } from "./node";
import { ISNode } from "../types/ast/snode";

export class Literal extends Node {
	val: string = '';

	constructor(block: ISNode, val: string) {
		super(block);
		this.val = val;
	}

	toString() {
		return this.val;
	}
}

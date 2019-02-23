import { Node } from "./node";

export class Value extends Node {
	toString() {
		return this.nodes.join('');
	}
}

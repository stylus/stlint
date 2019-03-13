import { Node } from "./node";

export class Query extends Node {
	predicate: string = '';
	type: Node | null = null;
}

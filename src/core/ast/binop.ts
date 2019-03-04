import { Node } from "./node";

export class BinOp extends Node {
	left: Node | null = null;
	right: Node | null = null;
}

import { Node } from './node';

export class UnaryOp extends Node {
	left: Node | null = null;
	right: Node | null = null;
}

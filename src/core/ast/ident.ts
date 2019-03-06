import { Node } from "./node";
import { Value } from "./value";

export class Ident extends Node {
	key: string = '';
	value: Value | null = null;
}

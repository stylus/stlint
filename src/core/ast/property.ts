import { Node } from "./node";
import { Value } from "./value";

export class Property extends Node {
	key: string = '';
	value: Value | null = null;
}

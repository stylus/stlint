import { Node } from "./node";
import { Value } from "./value";
import { Ident } from "./ident";

export class Property extends Node {
	key: Ident | string = '';
	value: Value | null = null;
}

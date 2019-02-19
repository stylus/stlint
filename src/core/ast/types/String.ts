export interface String extends Node {
	val: string;
	string: string;
	prefixed: boolean;
	quote: '"' | '\'';
}

import { Node } from '../Node';

import { Node } from './node';
import { ISNode } from '../types/ast/snode';

export class Tree extends Node {
	readonly parent: Node | null = null;
	constructor(block: ISNode) {
		super(block, null);
	}
}

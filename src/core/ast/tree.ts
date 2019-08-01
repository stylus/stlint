import { Node } from './node';
import { ISNode } from '../types/ast/snode';
import { INode } from '../types/ast/node';

export class Tree extends Node {
	readonly parent: INode | null = null;
	constructor(block: ISNode) {
		super(block, null);
	}
}

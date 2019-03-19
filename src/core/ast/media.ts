import { Node } from './node';
import { INode } from '../types/ast/node';

export class Media extends Node {
	query: INode | null = null;
}

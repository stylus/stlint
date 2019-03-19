import { Node } from './node';
import { INode } from '../types/ast/node';

export class Func extends Node {
	key: string = '';
	value: string = '';
	params: INode[] = [];
}

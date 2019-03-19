import { Node } from './node';
import { INode } from '../types/ast/node';

export class Member extends Node {
	left: INode | null = null;
	right: INode | null = null;

	toString(): string | string {
		return (this.left && this.right) ? `${this.left.toString()}.${this.right.toString()}` : super.toString();
	}
}

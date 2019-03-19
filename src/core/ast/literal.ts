import { Node } from './node';

export class Literal extends Node {
	val: string = '';

	toString(): string {
		return this.val;
	}
}

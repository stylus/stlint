import { Node } from './node';

export class Call extends Node {
	key: string = '';
	toString(): string {
		return `${this.key}(${this.nodes.map((arg) => arg.toString(), this).join(', ')})`;
	}
}

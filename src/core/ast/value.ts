import { Node } from './node';
import { INode } from '../types/ast/node';

export class Value extends Node implements INode {
	get key(): string {
		if (this.nodes.length && (<any>this.nodes[0]).key) {
			return String((<any>this.nodes[0]).key);
		}

		return '';
	}

	set key(value: string) {
		// do nothing
	}

	toString(): string {
		return this.nodes.join(' ');
	}
}

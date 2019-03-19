import { Node } from './node';

export class Value extends Node {
	get key(): string {
		if (this.nodes.length && (<any>this.nodes[0]).key) {
			return String((<any>this.nodes[0]).key);
		}

		return '';
	}

	toString(): string {
		return this.nodes.join(' ');
	}
}

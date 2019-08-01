import { Ident, Obj, Property } from '../ast/index';
import { INode } from '../types/ast/node';

export const objTohash = (node: INode): Dictionary => {
	const result: Dictionary = {};

	node.nodes.forEach((prop) => {
		if (prop instanceof Property && prop.key instanceof Ident && prop.value) {
			const subkey = prop.key.key;

			if (prop.value.nodes && prop.value.nodes[0] && prop.value.nodes[0] instanceof Obj) {
				result[subkey] = objTohash(prop.value.nodes[0]);

			} else {
				if (prop.value.nodes.length > 1) {
					result[subkey] = prop.value.nodes.map((node) => node.toString());
				} else {
					result[subkey] = prop.value.toString();
				}
			}
		}
	});

	return result;
};

import { Rule } from "../core/rule";
import { Block, Property } from "../core/ast";
import { IState } from "../core/types/state";

interface IOrderState extends IState {
	order: Array<string[] | string>
}

export class sortOrder extends Rule<IOrderState> {
	nodesFilter = ['block'];

	checkNode(node: Block): void {
		if (node.nodes.length < 2) {
			return;
		}

		const names: string[] = [];

		node.nodes.forEach((node) => {
			if (node instanceof Property) {
				names.push(node.key.toString().toLowerCase());
			}
		});

		const
			order = this.state.order.reduce<string[]>((sort, key) => {
				if (typeof key === 'string') {
					sort.push(key)
				} else {
					sort.push.apply(sort, key);
				}
				return sort;
			}, []);

		const sortedNames = names.sort((keyA, keyB) => {
				const
					indexA = order.indexOf(keyA),
					indexB = order.indexOf(keyB);

				return indexA - indexB;
		});

		let index = 0;
		node.nodes.forEach((node) => {
			if (node instanceof Property) {
				if (sortedNames[index] !== node.key) {
					const needIndex = sortedNames.indexOf(node.key);
					this.msg('Property must be ' + (needIndex < index ? 'higher' : 'lower'), node.lineno, node.column, node.column + node.key.length);
				}

				index += 1;
			}
		});
	}
}

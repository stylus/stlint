import { Rule } from "../core/rule";
import { Block, Property } from "../core/ast";
import { IState } from "../core/types/state";

interface IOrderState extends IState {
	order: Array<string[] | string>,
	startGroupChecking: number
}

export class SortOrder extends Rule<IOrderState> {
	nodesFilter = ['block'];

	checkNode(node: Block): void {
		const names: string[] = [];

		node.nodes.forEach((node) => {
			if (node instanceof Property) {
				names.push(node.key.toString().toLowerCase());
			}
		});

		// sort only 2 and more properties
		if (names.length < 2) {
			return;
		}

		if (this.state.conf === 'alphabetical') {
			names.sort();
		} else {
			if (!this.cache.order) {
				this.cache.ketToGroup = {};
				let groupIndex = 0;

				this.cache.order = this.state.order.reduce<string[]>((sort, key) => {
					if (typeof key === 'string') {
						sort.push(key)
					} else {
						sort.push.apply(sort, key);
						key.forEach((subkey) => this.cache.ketToGroup[subkey] = groupIndex);
						groupIndex += 1;
					}
					return sort;
				}, []);
			}


			names.sort((keyA, keyB) => {
				const
					indexA = this.cache.order.indexOf(keyA),
					indexB = this.cache.order.indexOf(keyB);

				if (indexA === - 1 || indexB === -1) {
					return keyA > keyB ? 1 : -1;
				}

				return indexA - indexB;
			});
		}

		let index = 0;
		node.nodes.forEach((node) => {
			if (node instanceof Property) {
				if (names[index] !== node.key) {
					const needIndex = names.indexOf(node.key);
					this.msg('Property must be ' + (needIndex < index ? 'higher' : 'lower'), node.lineno, node.column, node.column + node.key.length);
				}

				index += 1;
			}
		});

		if (
			!this.errors.length &&
			names.length >= this.state.startGroupChecking &&
			this.state.conf === 'grouped'
		) {
			let
				i = 0,
				lastGroup: null | number = null;

			node.nodes.forEach((node) => {
				if (node instanceof Property) {
					const group = this.cache.ketToGroup[node.key];

					if (group !== undefined && group !== lastGroup) {
						if (lastGroup !== null) {
							const prev = node.previousSibling();

							if (prev && prev.lineno === node.lineno - 1) {
								this.msg('Need new line after group', prev.lineno, prev.column, prev.column);
							}
						}

						lastGroup = group;
					}
				}
			});
		}
	}
}

import { Rule } from "../core/rule";
import { Block, Property } from "../core/ast";
import { IState } from "../core/types/state";

interface IOrderState extends IState {
	order?: Array<string[] | string>,
	startGroupChecking?: number
}

export class SortOrder extends Rule<IOrderState> {
	nodesFilter = ['block'];

	checkNode(node: Block): void {
		const
			names: string[] = [],
			order = this.state.order || [],
			startGroupChecking = this.state.startGroupChecking || 6;

		node.nodes.forEach((child) => {
			if (child instanceof Property) {
				names.push(child.key.toString().toLowerCase());
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

				this.cache.order = order.reduce<string[]>((sort, key) => {
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
				let
					values = <Dictionary<string>>{
						keyA,
						keyB
					},
					index = <Dictionary<number>>{
						keyA: this.cache.order.indexOf(keyA),
						keyB: this.cache.order.indexOf(keyB),
					},
					keys = Object.keys(index);

				for (let key of keys) {
					if (index[key] === -1) {
						const parts = values[key].split('-');

						if (parts.length > 1) {
							let l = parts.length - 1;

							while (l > 0 && index[key] === -1) {
								index[key] = this.cache.order.indexOf(parts.slice(0, l).join('-'));

								if (index[key] !== -1) {
									index[key] += 1;
								}
								l -= 1;
							}
						}
					}

					if (index[key] === -1) {
						return values.keyA > values.keyB ? 1 : -1;
					}
				}

				if (index.keyA === index.keyB) {
					return values.keyA > values.keyB ? 1 : -1;
				}

				return index.keyA - index.keyB;
			});
		}

		let index = 0;
		node.nodes.forEach((child) => {
			if (child instanceof Property) {
				const key = child.key.toString();
				if (names[index] !== child.key) {
					const needIndex = names.indexOf(key);

					this.msg(
						'Property must be ' + (needIndex < index ? 'higher' : 'lower') + ' - ' + names.join(', '),
						child.lineno,
						child.column,
						child.column + key.length
					);
				}

				index += 1;
			}
		});

		if (
			!this.errors.length &&
			names.length >= startGroupChecking &&
			this.state.conf === 'grouped'
		) {
			let
				lastGroup: null | number = null;

			node.nodes.forEach((node) => {
				if (node instanceof Property) {
					let
						key = node.key.toString(),
						group = this.cache.ketToGroup[key];

					if (group === undefined) {
						const parts = key.split('-');

						if (parts.length > 1) {
							let l = parts.length - 1;

							while (l > 0 && group === undefined) {
								group = this.cache.ketToGroup[parts.slice(0, l).join('-')];

								l -= 1;
							}
						}
					}

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

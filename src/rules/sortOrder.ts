import { Rule } from '../core/rule';
import { Block, Property, Value } from '../core/ast/index';
import { IState } from '../core/types/state';
import { Line } from '../core/line';

interface IOrderState extends IState {
	order?: Array<string[] | string>,
	startGroupChecking?: number
}

interface TmpOrderItem {
	name: string;
	lineno: number;
}

/**
 * Rule for checking properties order. Can use alphabetical order or order from grouped array
 */
export class SortOrder extends Rule<IOrderState> {
	nodesFilter: string[] = ['block'];

	checkNode(node: Block, lines: Line[]): void {
		const
			names: TmpOrderItem[] = [],
			order = this.state.order || [],
			startGroupChecking = this.state.startGroupChecking || 6;

		node.nodes.forEach((child) => {
			if (child instanceof Property || child instanceof Value) {
				names.push(
					{
						name: child.key.toString().toLowerCase(),
						lineno: child.lineno
					}
				);
			}
		});

		// sort only 2 and more properties
		if (names.length < 2) {
			return;
		}

		if (this.state.conf === 'alphabetical') {
			names.sort((a, b) => {
					if (a.name === b.name) {
						return 0;
					}

					return a.name > b.name ? 1 : -1;
			});
		} else {
			if (!this.cache.order) {
				this.cache.ketToGroup = {};
				let groupIndex = 0;

				this.cache.order = order.reduce<string[]>((sort, key) => {
					if (typeof key === 'string') {
						sort.push(key);
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
					values = <Dictionary<string>>{
						keyA: keyA.name,
						keyB: keyB.name
					},
					index = <Dictionary<number>>{
						keyA: this.cache.order.indexOf(keyA.name),
						keyB: this.cache.order.indexOf(keyB.name)
					},
					keys = Object.keys(index);

				for (const key of keys) {
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

		let
			index = 0,
			indexNoOrdered = 0,
			hasOrderError = false,
			last: Property | Value | void = void(0),
			first: Property | Value | void = void(0),
			child;

		const fix = [], partLines = [];

		for (let i = 0; i < node.nodes.length; i += 1) {
			child = node.nodes[i];

			if (child instanceof Property || child instanceof Value) {
				if (names[index].name !== child.key) {
					if (!first) {
						first = child;
					}

					last = child;

					hasOrderError = true;

					fix[indexNoOrdered] = lines[names[index].lineno].line;
				}

				if (first) {
					partLines[indexNoOrdered] = lines[child.lineno].line;
					indexNoOrdered += 1;
				}

				index += 1;
			}
		}

		if (hasOrderError && last && first) {
			for (let i = 0; i < fix.length; i += 1) {
				if (fix[i] === undefined) {
					fix[i] = partLines[i];
				}
			}

			this.msg(
				`Properties have wrong order -  ${names.map((item) => item.name).join(', ')}`,
				first.lineno,
				1,
				lines[last.lineno].line.length,
				fix.join('\n'),
				last.lineno
			);
		}

		if (
			!hasOrderError &&
			names.length >= startGroupChecking &&
			this.state.conf === 'grouped'
		) {
			let
				lastGroup: null | number = null;

			node.nodes.forEach((node) => {
				if (node instanceof Property || node instanceof Value) {
					const
						key = node.key.toString();

					let
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

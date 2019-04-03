import { Rule } from '../core/rule';
import { Block, Property, Value } from '../core/ast/index';
import { IState } from '../core/types/state';
import { Line } from '../core/line';
import { Content } from '../core/content';

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

	checkNode(node: Block, content: Content): void {
		const
			properties: TmpOrderItem[] = [],
			order = this.state.order || [],
			propertyToLine: Dictionary<Line> = {},
			startGroupChecking = this.state.startGroupChecking || 6;

		node.nodes.forEach((child) => {
			if (child instanceof Property || child instanceof Value) {
				const name = child.key.toString().toLowerCase();

				properties.push(
					{
						name,
						lineno: child.lineno
					}
				);

				propertyToLine[name] = content.getLine(child.lineno);
			}
		});

		// sort only 2 and more properties
		if (properties.length < 2) {
			return;
		}

		if (this.state.conf === 'alphabetical') {
			properties.sort((a, b) => {
				if (a.name === b.name) {
					return 0;
				}

				return a.name > b.name ? 1 : -1;
			});
		} else {
			if (!this.cache.order) {
				this.cache.keyToGroup = {};
				let groupIndex = 0;

				this.cache.order = order.reduce<string[]>((sort, key) => {
					if (typeof key === 'string') {
						sort.push(key.toLowerCase());
					} else {
						sort.push.apply(sort, key.map((subkey) => subkey.toLowerCase()));
						key.forEach((subkey) => this.cache.keyToGroup[subkey.toLowerCase()] = groupIndex);
						groupIndex += 1;
					}
					return sort;
				}, []);
			}

			properties.sort((keyA, keyB) => {
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
			last: Property | Value | void = void (0),
			first: Property | Value | void = void (0),
			child,
			fix: Array<Line | string> = [];

		const
			fixObject = {},
			partLines: Array<Line> = [];

		Object.defineProperty(<any>fixObject, 'toString', {
			value: (): string =>  fix.map((line) => typeof line === 'string' ? line : line.line).join('\n')
		});

		for (let i = 0; i < node.nodes.length; i += 1) {
			child = node.nodes[i];

			if (child instanceof Property || child instanceof Value) {
				const name = child.key.toString().toLowerCase();

				if (properties[index].name !== name) {
					if (!first) {
						first = child;
					}

					last = child;

					hasOrderError = true;

					fix[indexNoOrdered] = content.getLine(properties[index].lineno);
				}

				if (first) {
					partLines[indexNoOrdered] = content.getLine(child.lineno);
					indexNoOrdered += 1;
				}

				index += 1;
			}
		}

		for (let i = 0; i < fix.length; i += 1) {
			if (fix[i] === undefined) {
				fix[i] = partLines[i];
			}
		}

		if (hasOrderError && last && first) {
			this.msg(
				`Properties have wrong order -  ${properties.map((item) => item.name).join(', ')}`,
				first.lineno,
				1,
				content.getLine(last.lineno).line.length,
				<any>fixObject, // We can change 'fix' array below
				last.lineno
			);
		}

		if (
			properties.length >= startGroupChecking &&
			this.state.conf === 'grouped'
		) {
			let
				lastGroup: null | number = null;

			properties.forEach((property) => {
					let
						group = this.cache.keyToGroup[property.name];

					if (group === undefined) {
						const parts = property.name.split('-');

						if (parts.length > 1) {
							let l = parts.length - 1;

							while (l > 0 && group === undefined) {
								group = this.cache.keyToGroup[parts.slice(0, l).join('-')];

								l -= 1;
							}
						}
					}

					if (group !== undefined && group !== lastGroup) {
						if (lastGroup !== null) {
							const line = propertyToLine[property.name];

							if (!hasOrderError && line) {
								const prev = line.prev();

								if (prev &&  prev.line.trim().length !== 0) {
									this.msg('Need new line after group', prev.lineno, 1, prev.line.length, prev.line + '\n');
								}
							}

							if (hasOrderError && line) {
								const
									index = fix.indexOf(line) - 1,
									prev = fix[index];

								if (index > 0 && prev && prev instanceof Line && prev.line  && prev.line.trim().length) {
									fix = [...fix.slice(0, index + 1), '', ...fix.slice(index + 1)];
								}
							}
						}

						lastGroup = group;
					}
			});
		}
	}
}

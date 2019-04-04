import { Rule } from '../core/rule';
import { Block, Property, Value, Node } from '../core/ast/index';
import { IState } from '../core/types/state';
import { Line } from '../core/line';
import { Content } from '../core/content';

interface IOrderState extends IState {
	order?: Array<string[] | string>,
	startGroupChecking?: number
}

interface PropertyNameAndBound {
	name: string;
	startLine: number;
	endLine: number;
}

type Properties = PropertyNameAndBound[];
type PropertiesGroups = Array<Properties>;

interface FixObject {
	first?: Property | Value | void;
	last?: Property | Value | void;
	toString(): string;
	fix: Array<Line | string | Array<Line>>;
}

/**
 * Rule for checking properties order. Can use alphabetical order or order from grouped array
 */
export class SortOrder extends Rule<IOrderState> {
	nodesFilter: string[] = ['block'];

	checkNode(node: Block, content: Content): void {
		const
			propertiesGroups: PropertiesGroups = [],
			propertyToLine: Dictionary<Line> = {};

		this.fillPropertiesNameAndLine(node, propertiesGroups, propertyToLine, content);

		// sort only 2 and more properties
		if (propertiesGroups.reduce((cnt, array) => {
			cnt += array.length;
			return cnt;
		}, 0) < 2) {
			return;
		}

		this.sort(propertiesGroups);

		propertiesGroups.forEach((properties, group) => {
			const
				hasOrderError = this.hasSortError(node, properties, group),
				fixObject: FixObject = this.getFixObject(node, properties, content, group);

			if (hasOrderError && fixObject.last && fixObject.first) {
				const
					lastLine = this.getLastLine(fixObject.last);

				this.msg(
					`Properties have wrong order -  ${properties.map((item) => item.name).join(', ')}`,
					fixObject.first.lineno,
					1,
					content.getLine(lastLine).line.length,
					<any>fixObject, // We can change 'fix' array in checkSeparatorLines
					lastLine
				);
			}

			this.checkSeparatorLines(hasOrderError, properties, propertyToLine, fixObject);
		});
	}

	private forEachProperty(
		node: Node,
		groupId: number,
		callback: (child: Property | Value, indexInGroup: number) => void | boolean
	): void | boolean {
		let child: Node, group = 0, indexInGroup = 0, result: void | boolean;

		for (let i = 0; i < node.nodes.length; i += 1) {
			child = node.nodes[i];

			if (child instanceof Property || child instanceof Value) {
				if (group === groupId) {
					result = callback(child, indexInGroup);

					if (result	!== undefined) {
						return result;
					}

					indexInGroup += 1;
				}
			} else {
				group += 1;
				indexInGroup = 0;
			}
		}
	}

	private getLastLine(child: Node): number {
		return 	(child.value && child.value instanceof Node) ? child.value.lineno : child.lineno;
	}

	private fillPropertiesNameAndLine(
		node: Block,
		properties: PropertiesGroups,
		propertyToLine: Dictionary<Line>,
		content: Content
	): void {
		let group: PropertyNameAndBound[] = [];

		node.nodes.forEach((child) => {
			if (child instanceof Property || child instanceof Value) {
				const
					name = child.key.toString().toLowerCase();

				group.push(
					{
						name,
						startLine: child.lineno,
						endLine: this.getLastLine(child)
					}
				);

				propertyToLine[name] = content.getLine(child.lineno);
			} else {
				if (group.length) {
					properties.push(group);
				}

				group = [];
			}
		});

		if (group.length) {
			properties.push(group);
		}
	}

	private sort(properties: PropertiesGroups): void {
		if (this.state.conf === 'alphabetical') {
			this.sortAlphabetical(properties);
		} else {
			this.fillCacheOrder(this.state.order || []);
			this.sortByGroupedOrder(properties);
		}
	}

	private sortAlphabetical(properties: PropertiesGroups): void {
		properties
			.forEach((group) => group.sort((a, b) => {
				if (a.name === b.name) {
					return 0;
				}

				return a.name > b.name ? 1 : -1;
			}));
	}

	private fillCacheOrder(order: Array<string[] | string>): void {
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
	}

	private sortByGroupedOrder(properties: PropertiesGroups): void {
		properties
			.forEach((group) => group.sort((keyA, keyB) => {
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
			})
		);
	}

	private hasSortError(node: Node, properties: Properties, groupId: number): boolean {
		return this.forEachProperty(node, groupId, (child, index) => {
			const name = child.key.toString().toLowerCase();

			if (properties[index].name !== name) {
				return true;
			}
		}) || false;
	}

	/**
	 * Returns fix object for fix some part of stylus file
	 *
	 * @param node
	 * @param properties
	 * @param content
	 * @param groupId
	 */
	private getFixObject(node: Node, properties: Properties, content: Content, groupId: number): FixObject {
		let
			index = 0,
			indexNoOrdered = 0,
			last: Property | Value | void = void (0),
			first: Property | Value | void = void (0);
		const
			fix: Array<Line | string | Array<Line>> = [];

		const
			partLines: Array<Line | Array<Line>> = [];

		this.forEachProperty(node, groupId, (child) => {
			const name = child.key.toString().toLowerCase();

			if (properties[index].name !== name) {
				if (!first) {
					first = child;
				}

				last = child;

				let
					start = properties[index].startLine;

				if (start !== properties[index].endLine) {
					const st = [];

					for (; start <= properties[index].endLine; start += 1) {
						st.push(content.getLine(start));
					}

					fix[indexNoOrdered] = st;
				} else {
					fix[indexNoOrdered] = content.getLine(start);
				}
			}

			if (first) {
				const end = this.getLastLine(child);

				let
					start = child.lineno;

				if (start !== end) {
					const st = [];

					for (; start <= end; start += 1) {
						st.push(content.getLine(start));
					}

					partLines[indexNoOrdered] = st;
				} else {
					partLines[indexNoOrdered] = content.getLine(start);
				}

				indexNoOrdered += 1;
			}

			index += 1;
		});

		for (let i = 0; i < fix.length; i += 1) {
			if (fix[i] === undefined) {
				fix[i] = partLines[i];
			}
		}

		const result = {
			first,
			last,
			fix,
			toString(): string {
				return result.fix
					.reduce<Array<Line | string>>((array, line) => {
						if (Array.isArray(line)) {
							array.push(...line);
						} else {
							array.push(line);
						}

						return array;
					}, [])
					.map((line) => typeof line === 'string' ? line : line.line)
					.join('\n');

			}
		};

		return result;
	}

	private checkSeparatorLines(
		hasOrderError: boolean,
		properties: Properties,
		propertyToLine: Dictionary<Line>,
		fixObject: FixObject
	): void {
		const
			startGroupChecking = this.state.startGroupChecking || 6;

		if (
			properties.length >= startGroupChecking &&
			this.state.conf === 'grouped'
		) {
			let
				lastGroup: null | number | void = null;

			properties.forEach((property) => {
				const group = this.getGroupByName(property.name);

				if (group !== undefined && group !== lastGroup) {
					if (lastGroup !== null) {
						const line = propertyToLine[property.name];

						if (line) {
							if (!hasOrderError) {
								const prev = line.prev();

								if (prev &&  prev.line.trim().length !== 0) {
									this.msg('Need new line after group', prev.lineno, 1, prev.line.length, prev.line + '\n');
								}
							} else {
								this.addSeparateLineAfterLine(fixObject, line);
							}
						}
					}

					lastGroup = group;
				}
			});
		}
	}

	private getGroupByName(name: string): number | void {
		let
			group = this.cache.keyToGroup[name];

		if (group === undefined) {
			const parts = name.split('-');

			if (parts.length > 1) {
				let l = parts.length - 1;

				while (l > 0 && group === undefined) {
					group = this.cache.keyToGroup[parts.slice(0, l).join('-')];

					l -= 1;
				}
			}
		}

		return group;
	}

	private addSeparateLineAfterLine(fixObject: FixObject, line: Line): void {
		const
			index = fixObject.fix.indexOf(line) - 1,
			prev = fixObject.fix[index];

		if (index > 0 && prev && prev instanceof Line && prev.line  && prev.line.trim().length) {
			fixObject.fix = [...fixObject.fix.slice(0, index + 1), '', ...fixObject.fix.slice(index + 1)];
		}
	}
}

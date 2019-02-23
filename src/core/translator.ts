import { Visitor } from "./visitor";
import { Tree, Group, Selector, Block, Property, Node, Literal, Value, RGB, Ident, Import, Obj, Unit } from "./ast";
import { INode } from "./types/ast/node";
import { ISNode } from "./types/ast/snode";

export class Translator extends  Visitor<ISNode, INode> {
	methodNotExists(method: string) {
		throw new Error(`No method ${method}`);
	}

	transpile(): Tree {
		return this.visit(this.root);
	}

	private eachVisit<T extends ISNode>(list: T[] | unknown, fn: Function) {
		if (Array.isArray(list)) {
			for (let i = 0, len = list.length; i < len; ++i) {
				const node = list[i];

				const ret = this.visit(node);

				if (ret) {
					fn(ret);
				}
			}
		}
	}

	/**
	 * Обходим элементы корневого элемента
	 * @param block
	 */
	visitRoot(block: ISNode) {
		const tree = new Tree(block);

		this.eachVisit(block.nodes, (ret: INode) => {
			tree.append(ret);
		});

		return tree;
	}

	visitNode(block: ISNode): INode {
		return new Node(block);
	}

	visitBlock(block: ISNode) {
		const node = new Block(block);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		});

		return node;
	}

	visitGroup(block: ISNode) {
		const node = new Group(block);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		});

		return node;
	}

	visitSelector(block: ISNode) {
		const node = new Selector(block);

		this.eachVisit(block.segments, (ret: Selector) => {
			node.append<Selector>(ret, 'segments');
		});

		if (block.block) {
			node.append(this.visit(block.block));
		}

		return node;
	}

	visitProperty(block: ISNode) {
		const node = new Property(block);

		node.key = block.name || (Array.isArray(block.segments) ? block.segments.join('') : '');

		if (block.expr) {
			node.value = this.visit(block.expr);
		}

		return node;
	}

	visitLiteral(block: ISNode) {
		return new Literal(block, typeof block.val === 'string' ? block.val : '');
	}

	visitExpression(block: ISNode) {
		const node = new Value(block);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		});

		return node;
	}

	visitRGBA(block: ISNode) {
		const node = new RGB(block);

		node.value = block.name || (typeof block.raw === 'string' ? block.raw : '') || '';

		return node;
	}

	visitIdent(block: ISNode) {
		const node = new Ident(block);

		node.key = block.string || block.name || '';

		if (block.val) {
			node.value = this.visit(block.val);
		}

		return node;
	}

	/**
	 * Если импорт то только такой
	 * @param block
	 */
	visitImport(block: ISNode) {
		const node = new Import(block);

		node.value = (block.path || '').toString().replace(/[()]/g, '');

		return node;
	}

	/**
	 * Обработка $p хеша
	 * @param block
	 */
	visitObject(block: ISNode) {
		const node = new Obj(block);

		const vals = block.vals;
		if (vals && typeof vals === 'object' && vals !== null) {
			Object.keys(vals).forEach((key: string) => {
				const elm: ISNode = (<Dictionary>vals)[key];

				if (elm) {
					const
						property = new Property(vals[key]),
						ret = this.visit(vals[key]);

					property.key = key;

					property.value = ret;
					node.append(property);
				}
			})
		}

		return node;
	}

	/**
	 * Пустые значения
	 * @param block
	 */
	visitNull(block: ISNode) {
		// console.log(block);
	}

	/**
	 * Нода значений типа px или em
	 * @param block
	 */
	visitUnit(block: ISNode) {
		const node = new Unit(block);
		node.value = typeof block.raw === 'string' ? block.raw : '';
		return node;
	}
}

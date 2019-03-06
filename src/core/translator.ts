import { Visitor } from "./visitor";
import {
	Tree,
	Group,
	Selector,
	Block,
	Property,
	Node,
	Literal,
	Value,
	RGB,
	Ident,
	Import,
	Obj,
	Unit,
	Call,
	Member,
	BinOp,
	Func,
	Comment
} from "./ast";
import { INode } from "./types/ast/node";
import { ISNode } from "./types/ast/snode";

export class Translator extends  Visitor<ISNode, INode> {
	methodNotExists(method: string) {
		throw new Error(`No method ${method}`);
	}

	transpile(): Tree {
		return this.visit(this.root, null);
	}

	private eachVisit<T extends ISNode>(list: T[] | unknown, fn: Function, parent: INode) {
		if (Array.isArray(list)) {
			for (let i = 0, len = list.length; i < len; ++i) {
				const node = list[i];

				const ret = this.visit(node, parent);

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
		}, tree);

		return tree;
	}

	visitNode(block: ISNode, parent: INode): INode {
		return new Node(block, parent);
	}

	visitBlock(block: ISNode, parent: INode) {
		const node = new Block(block, parent);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitGroup(block: ISNode, parent: INode) {
		const node = new Group(block, parent);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitSelector(block: ISNode, parent: INode) {
		const node = new Selector(block, parent);

		this.eachVisit(block.segments, (ret: Selector) => {
			node.append<Selector>(ret, 'segments');
		}, node);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		return node;
	}

	visitProperty(block: ISNode, parent: INode) {
		const node = new Property(block, parent);

		node.key = block.name || (Array.isArray(block.segments) ? block.segments.join('') : '');

		if (block.expr) {
			node.value = this.visit(block.expr, node);
		}

		return node;
	}

	visitLiteral(block: ISNode, parent: INode) {
		const node = new Literal(block, parent);

		node.val = typeof block.val === 'string' ? block.val : '';

		return node;
	}

	visitString(block: ISNode, parent: INode) {
		return this.visitLiteral(block, parent);
	}

	visitExpression(block: ISNode, parent: INode) {
		const node = new Value(block, parent);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitRGBA(block: ISNode, parent: INode) {
		const node = new RGB(block, parent);

		node.value = block.name || (typeof block.raw === 'string' ? block.raw : '') || '';

		return node;
	}

	visitIdent(block: ISNode, parent: INode) {
		const node = new Ident(block, parent);

		node.key = block.string || block.name || '';

		if (block.val) {
			node.value = this.visit(block.val, node);
		}

		return node;
	}

	/**
	 * Если импорт то только такой
	 * @param block
	 * @param parent
	 */
	visitImport(block: ISNode, parent: INode) {
		const node = new Import(block, parent);

		node.value = (block.path || '').toString().replace(/[()]/g, '');

		return node;
	}

	/**
	 * Обработка $p хеша
	 * @param block
	 * @param parent
	 */
	visitObject(block: ISNode, parent: INode) {
		const node = new Obj(block, parent);

		const vals = block.vals;

		if (vals && typeof vals === 'object') {
			Object.keys(vals).forEach((key: string) => {
				const elm: ISNode = (<Dictionary>vals)[key];

				if (elm) {
					const
						property = new Property(vals[key], node),
						ret = this.visit(vals[key], property);

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
	 * @param parent
	 */
	visitNull(block: ISNode, parent: INode) {
		// console.log(block);
	}

	/**
	 * Нода значений типа px или em
	 * @param block
	 * @param parent
	 */
	visitUnit(block: ISNode, parent: INode) {
		const node = new Unit(block, parent);

		node.value = typeof block.raw === 'string' ? block.raw : '';

		return node;
	}

	/**
	 * Вызов миксина
	 * @param block
	 * @param parent
	 */
	visitCall(block: ISNode, parent: INode) {
		const node = new Call(block, parent);

		node.key = block.name || '';

		if (block.args) {
			this.eachVisit(block.args.nodes, (ret: INode) => {
				node.append(ret);
			}, node);
		}

		return node;
	}

	/**
	 * Получение элемента хеша
	 * @param block
	 * @param parent
	 */
	visitMember(block: ISNode, parent: INode) {
		const node = new Member(block, parent);

		if (block.left) {
			node.left = new Ident(block.left, node);
		}

		if (block.right) {
			node.right = new Ident(block.right, node);
		}

		return node;
	}

	/**
	 * Binary operation
	 * @param block
	 * @param parent
	 */
	visitBinOp(block: ISNode, parent: INode) {
		const node = new BinOp(block, parent);

		if (block.left) {
			node.left = new Ident(block.left, node);
		}

		if (block.right) {
			node.right = new Ident(block.right, node);
		}

		return node;
	}

	/**
	 * Declared function
	 * @param block
	 * @param parent
	 */
	visitFunction(block: ISNode, parent: INode): INode {
		const node = new Func(block, parent);
		return node
	}

	/**
	 * Comment
	 * @param block
	 * @param parent
	 */
	visitComment(block: ISNode, parent: INode): INode {
		const node = new Comment(block, parent);
		return node
	}
}

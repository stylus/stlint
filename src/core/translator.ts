import { Visitor } from './visitor';
import { Line } from './line';
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
	Comment,
	Params,
	Bool,
	Each,
	Condition,
	UnaryOp,
	Media,
	Querylist,
	Query,
	Feature,
	Keyframes
} from './ast/index';
import { INode } from './types/ast/node';
import { ISNode } from './types/ast/snode';

export class Translator extends  Visitor<ISNode, INode> {
	constructor(root: ISNode, readonly lines: Line[]) {
		super(root);
	}

	methodNotExists(method: string, node: ISNode): void {
		const e = new Error(`No method ${method} line:${node.lineno}`);
		(<any>e).lineno = node.lineno;
		throw e;
	}

	transpile(): Tree {
		return this.visit(this.root, null);
	}

	/**
	 * Root element in AST
	 * @param block
	 */
	visitRoot(block: ISNode): INode {
		const tree = new Tree(block);

		this.eachVisit(block.nodes, (ret: INode) => {
			tree.append(ret);
		}, tree);

		return tree;
	}

	visitNode(block: ISNode, parent: INode): INode {
		return new Node(block, parent);
	}

	visitBlock(block: ISNode, parent: INode): INode {
		const node = new Block(block, parent);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitGroup(block: ISNode, parent: INode): INode {
		const node = new Group(block, parent);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitSelector(block: ISNode, parent: INode): INode {
		const node = new Selector(block, parent);

		this.eachVisit(block.segments, (ret: Selector): void => {
			node.append<Selector>(ret, 'segments');
		}, node);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		return node;
	}

	visitProperty(block: ISNode, parent: INode): INode {
		const node = new Property(block, parent);

		node.key = block.name || (Array.isArray(block.segments) ? block.segments.join('') : '');

		if (block.expr) {
			node.value = <Value>this.visit(block.expr, node);
		}

		return node;
	}

	visitLiteral(block: ISNode, parent: INode): INode {
		const node = new Literal(block, parent);

		node.val = typeof block.val === 'string' ? block.val : '';

		return node;
	}

	visitString(block: ISNode, parent: INode): INode {
		return this.visitLiteral(block, parent);
	}

	visitExpression(block: ISNode, parent: INode): INode {
		const node = new Value(block, parent);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitRGBA(block: ISNode, parent: INode): INode {
		const node = new RGB(block, parent);

		node.value = block.name || (typeof block.raw === 'string' ? block.raw : '') || '';

		return node;
	}

	visitIdent(block: ISNode, parent: INode): INode {
		const node = new Ident(block, parent);

		node.key = block.string || block.name || '';

		if (block.val) {
			node.value = <Value>this.visit(block.val, node);
		}

		return node;
	}

	/**
	 * Если импорт то только такой
	 * @param block
	 * @param parent
	 */
	visitImport(block: ISNode, parent: INode): INode {
		const node = new Import(block, parent);

		node.value = (block.path || '').toString().replace(/[()]/g, '');

		return node;
	}

	/**
	 * Обработка $p хеша
	 * @param block
	 * @param parent
	 */
	visitObject(block: ISNode, parent: INode): INode {
		const node = new Obj(block, parent);

		const
			vals = block.vals,
			keys = block.keys;

		if (vals && typeof vals === 'object' && keys && typeof keys === 'object') {
			Object.keys(vals).forEach((key: string) => {
				const elm: ISNode = (<Dictionary>vals)[key];

				if (elm) {
					if (!keys[key]) {
						debugger;
					}
					const
						property = new Property(vals[key], node),
						ret = this.visit(vals[key], property);

					property.key = <Ident>this.visit(keys[key], property);
					property.value = <Value>ret;

					node.append(property);
				}
			});
		}

		return node;
	}

	/**
	 * Пустые значения
	 * @param block
	 * @param parent
	 */
	visitNull(block: ISNode, parent: INode): void {
		// console.log(block);
	}

	/**
	 * Нода значений типа px или em
	 * @param block
	 * @param parent
	 */
	visitUnit(block: ISNode, parent: INode): INode {
		const node = new Unit(block, parent);

		node.value = typeof block.raw === 'string' ? block.raw : '';

		return node;
	}

	/**
	 * Вызов миксина
	 * @param block
	 * @param parent
	 */
	visitCall(block: ISNode, parent: INode): INode {
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
	visitMember(block: ISNode, parent: INode): INode {
		const node = new Member(block, parent);

		if (block.left) {
			node.left = this.visit(block.left, node);
			node.left.key = block.name || '';
		}

		if (block.right) {
			node.right = this.visit(block.right, node);
			node.right.key = block.name || '';
		}

		return node;
	}

	/**
	 * Binary operation
	 * @param block
	 * @param parent
	 */
	visitBinOp(block: ISNode, parent: INode): INode {
		const node = new BinOp(block, parent);

		if (block.left) {
			node.left = this.visit(block.left, node);
		}

		if (block.right) {
			node.right = this.visit(block.right, node);
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

		node.key = block.name || '';

		this.eachVisit(block.params, (ret: INode) => {
			node.append(ret, 'params');
		}, node);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		if (block.params) {
			node.append(this.visit(block.params, node));
		}

		return node;
	}

	/**
	 * Functions params
	 * @param block
	 * @param parent
	 */
	visitParams(block: ISNode, parent: INode): INode {
		const node = new Params(block, parent);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		}, node);

		return node;
	}

	/**
	 * Comment
	 * @param block
	 * @param parent
	 */
	visitComment(block: ISNode, parent: INode): INode {
		return new Comment(block, parent);
	}

	/**
	 * Visit boolean value
	 * @param block
	 * @param parent
	 */
	visitBoolean(block: ISNode, parent: INode): INode {
		return new Bool(block, parent);
	}

	/**
	 * Cycle value
	 * @param block
	 * @param parent
	 */
	visitEach(block: ISNode, parent: INode): INode {
		return new Each(block, parent);
	}

	/**
	 * Condition nodes
	 * @param block
	 * @param parent
	 */
	visitIf(block: ISNode, parent: INode): INode {
		const node = new Condition(block, parent);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		if (block.cond) {
			node.cond = this.visit(block.cond, node);
		}

		this.eachVisit(block.elses, (ret: INode) => {
			node.append(ret);
		}, node);

		return node;
	}

	/**
	 * Unary operation
	 * @param block
	 * @param parent
	 */
	visitUnaryOp(block: ISNode, parent: INode): INode {
		const node = new UnaryOp(block, parent);

		if (block.left) {
			node.left = this.visit(block.left, node);
		}

		if (block.right) {
			node.right = this.visit(block.right, node);
		}

		return node;
	}

	/**
	 * Media scope
	 * @param block
	 * @param parent
	 */
	visitMedia(block: ISNode, parent: INode): INode {
		const node = new Media(block, parent);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		if (block.val) {
			node.query = this.visit(block.val, node);
		}

		// Hack because stylus set Media.column on end of line
		if (this.lines[node.lineno]) {
			const column = this.lines[node.lineno].line.indexOf('@media');

			if (column !== -1 && column + 1 !== node.column) {
				node.column = column + 1;
			}
		}

		return node;
	}

	/**
	 * Query list in media scope
	 * @param block
	 * @param parent
	 */
	visitQueryList(block: ISNode, parent: INode): INode {
		const node = new Querylist(block, parent);

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		}, node);

		return node;
	}

	/**
	 * Query in query list
	 * @param block
	 * @param parent
	 */
	visitQuery(block: ISNode, parent: INode): INode {
		const node = new Query(block, parent);

		if (block.type) {
			node.type = this.visit(block.type, node);
		}

		if (block.predicate) {
			node.predicate = block.predicate;
		}

		this.eachVisit(block.nodes, (ret: INode) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitFeature(block: ISNode, parent: INode): INode {
		const node = new Feature(block, parent);

		this.eachVisit(block.segments, (ret: INode) => {
			node.append(ret, 'segments');
		}, node);

		if (block.expr) {
			node.append(this.visit(block.expr, node));
		}

		return node;
	}

	/**
	 * Visit keyframes node
	 * @param block
	 * @param parent
	 */
	visitKeyframes(block: ISNode, parent: INode): INode {
		const node = new Keyframes(block, parent);

		this.eachVisit(block.segments, (ret: INode): void => {
			node.append(ret, 'segments');
		}, node);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		return node;
	}

	private eachVisit<T extends ISNode>(list: T[] | unknown, fn: (ret: any) => void, parent: INode): void {
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
}

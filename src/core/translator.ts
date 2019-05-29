import { Visitor } from './visitor';
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
	Supports,
	Keyframes, Atrule, Ternary
} from './ast/index';

import { ISNode } from './types/ast/snode';
import { IContent } from './types/content';

export class Translator extends  Visitor<ISNode, Node> {
	constructor(root: ISNode, readonly content: IContent) {
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

	visit(node: ISNode, parent: Node | null): Node {
		const newNode = super.visit(node, parent);

		if (newNode) {
			newNode.content = this.content;
		}

		if (parent && !parent.content) {
			parent.content = this.content;
		}

		return newNode;
	}

	/**
	 * Root element in AST
	 * @param block
	 */
	visitRoot(block: ISNode): Node {
		const tree: Node = new Tree(block);

		this.eachVisit(block.nodes, (ret: Node) => {
			tree.append(ret);
		}, tree);

		return tree;
	}

	visitNode(block: ISNode, parent: Node): Node {
		return new Node(block, parent);
	}

	visitBlock(block: ISNode, parent: Node): Node {
		const node = new Block(block, parent);

		this.eachVisit(block.nodes, (ret: Node) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitGroup(block: ISNode, parent: Node): Node {
		const node = new Group(block, parent);

		this.eachVisit(block.nodes, (ret: Node) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitSelector(block: ISNode, parent: Node): Node {
		const node = new Selector(block, parent);

		this.eachVisit(block.segments, (ret: Selector): void => {
			node.append<Selector>(ret, 'segments');
		}, node);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		return node;
	}

	visitProperty(block: ISNode, parent: Node): Node {
		const node = new Property(block, parent);

		node.key = block.name || (Array.isArray(block.segments) ? block.segments.join('') : '');

		if (block.expr) {
			node.value = <Value>this.visit(block.expr, node);
		}

		return node;
	}

	visitLiteral(block: ISNode, parent: Node): Node {
		const node = new Literal(block, parent);

		node.val = typeof block.val === 'string' ? block.val : '';

		return node;
	}

	visitString(block: ISNode, parent: Node): Node {
		return this.visitLiteral(block, parent);
	}

	visitExpression(block: ISNode, parent: Node): Node {
		const node = new Value(block, parent);

		this.eachVisit(block.nodes, (ret: Node) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitRGBA(block: ISNode, parent: Node): Node {
		const node = new RGB(block, parent);

		node.value = block.name || (typeof block.raw === 'string' ? block.raw : '') || '';

		return node;
	}

	visitIdent(block: ISNode, parent: Node): Node {
		const node = new Ident(block, parent);

		node.key = block.string || block.name || '';

		if (block.val && typeof block.val !== 'string') {
			node.value = <Value>this.visit(block.val, node);
		}

		return node;
	}

	/**
	 * Если импорт то только такой
	 * @param block
	 * @param parent
	 */
	visitImport(block: ISNode, parent: Node): Node {
		const node = new Import(block, parent);

		node.value = (block.path || '').toString().replace(/[()]/g, '');

		return node;
	}

	/**
	 * Обработка $p хеша
	 * @param block
	 * @param parent
	 */
	visitObject(block: ISNode, parent: Node): Node {
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
	visitNull(block: ISNode, parent: Node): void {
		// console.log(block);
	}

	/**
	 * Нода значений типа px или em
	 * @param block
	 * @param parent
	 */
	visitUnit(block: ISNode, parent: Node): Node {
		const node = new Unit(block, parent);

		node.value = typeof block.raw === 'string' ? block.raw : '';

		if (!node.value.length && typeof  block.type === 'string' && block.val !== '') {
			node.value = block.val + block.type;
		}

		return node;
	}

	/**
	 * Вызов миксина
	 * @param block
	 * @param parent
	 */
	visitCall(block: ISNode, parent: Node): Node {
		const node = new Call(block, parent);

		node.key = block.name || '';

		if (block.args) {
			this.eachVisit(block.args.nodes, (ret: Node) => {
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
	visitMember(block: ISNode, parent: Node): Node {
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
	visitBinOp(block: ISNode, parent: Node): Node {
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
	 * Visit atrule (ex. @font-face)
	 * @param block
	 * @param parent
	 */
	visitAtrule(block: ISNode, parent: Node): Node {
		const node = new Atrule(block, parent);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		return node;
	}

	/**
	 * Declared function
	 * @param block
	 * @param parent
	 */
	visitFunction(block: ISNode, parent: Node): Node {
		const node = new Func(block, parent);

		node.key = block.name || '';

		this.eachVisit(block.params, (ret: Node) => {
			node.append<Func>(ret, 'params');
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
	visitParams(block: ISNode, parent: Node): Node {
		const node = new Params(block, parent);

		this.eachVisit(block.nodes, (ret: Node) => {
			node.append(ret);
		}, node);

		return node;
	}

	/**
	 * Comment
	 * @param block
	 * @param parent
	 */
	visitComment(block: ISNode, parent: Node): Node {
		return new Comment(block, parent);
	}

	/**
	 * Visit boolean value
	 * @param block
	 * @param parent
	 */
	visitBoolean(block: ISNode, parent: Node): Node {
		return new Bool(block, parent);
	}

	/**
	 * Visit supports block
	 * @param block
	 * @param parent
	 */
	visitSupports(block: ISNode, parent: Node): Node {
		const node = new Supports(block, parent);

		if (block.block) {
			node.nodes.push(new Block(block.block, node));
		}

		return node;
	}

	/**
	 * Cycle value
	 * @param block
	 * @param parent
	 */
	visitEach(block: ISNode, parent: Node): Node {
		return new Each(block, parent);
	}

	/**
	 * Condition nodes
	 * @param block
	 * @param parent
	 */
	visitIf(block: ISNode, parent: Node): Node {
		const node = new Condition(block, parent);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		if (block.cond) {
			node.cond = this.visit(block.cond, node);
		}

		this.eachVisit(block.elses, (ret: Node) => {
			node.append(ret);
		}, node);

		return node;
	}

	/**
	 * Unary operation
	 * @param block
	 * @param parent
	 */
	visitUnaryOp(block: ISNode, parent: Node): Node {
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
	visitMedia(block: ISNode, parent: Node): Node {
		const node = new Media(block, parent);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		if (block.val && typeof block.val !== 'string') {
			node.query = this.visit(block.val, node);
		}

		// Hack because stylus set Media.column on end of line

		const line = node.line;
		if (line) {
			const column = line.line.indexOf('@media');

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
	visitQueryList(block: ISNode, parent: Node): Node {
		const node = new Querylist(block, parent);

		this.eachVisit(block.nodes, (ret: Node) => {
			node.append(ret);
		}, node);

		return node;
	}

	/**
	 * Query in query list
	 * @param block
	 * @param parent
	 */
	visitQuery(block: ISNode, parent: Node): Node {
		const node = new Query(block, parent);

		if (block.type) {
			node.type = this.visit(block.type, node);
		}

		if (block.predicate) {
			node.predicate = block.predicate;
		}

		this.eachVisit(block.nodes, (ret: Node) => {
			node.append(ret);
		}, node);

		return node;
	}

	visitFeature(block: ISNode, parent: Node): Node {
		const node = new Feature(block, parent);

		this.eachVisit(block.segments, (ret: Node) => {
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
	visitKeyframes(block: ISNode, parent: Node): Node {
		const node = new Keyframes(block, parent);

		this.eachVisit(block.segments, (ret: Node): void => {
			node.append(ret, 'segments');
		}, node);

		if (block.block) {
			node.append(this.visit(block.block, node));
		}

		return node;
	}

	visitTernary(block: ISNode, parent: Node): Node {
		const node = new Ternary(block, parent);

		this.eachVisit(block.nodes, (ret: Node) => {
			node.append(ret);
		}, node);

		if (block.cond) {
			node.cond = new Ident(block.cond, node);
		}

		if (block.trueExpr) {
			node.trueExpr = <Value>this.visit(block.trueExpr, node);
		}

		if (block.falseExpr) {
			node.falseExpr = <Value>this.visit(block.falseExpr, node);
		}

		return node;
	}

	private eachVisit<T extends ISNode>(list: T[] | unknown, fn: (ret: any) => void, parent: Node): void {
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

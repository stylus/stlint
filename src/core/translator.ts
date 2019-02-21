import { Visitor } from "./visitor";
import {Tree, Group, Selector, Block, Property, Node, Literal} from "./ast";
import { INode } from "./types/ast/node";

export class Translator extends  Visitor<INode> {
	constructor(stylusAST: any) {
		super(stylusAST);
	}

	transpile(): Tree {
		return this.visit(this.root);
	}

	each<T extends Node>(block: T, fn: Function, key: keyof T = 'nodes') {
		const list = block[key];

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
	 * Объодим элементы корневого элемента
	 * @param block
	 */
	visitRoot(block: INode) {
		const tree = new Tree(block.lineno, block.column);

		this.each(block, (ret: INode) => {
			tree.append(ret);
		});

		return tree;
	}

	visitBlock(block: INode) {
		const node = new Block(block.lineno, block.column);

		this.each(block, (ret: INode) => {
			node.append(ret);
		});

		return node;
	}

	visitGroup(block: INode) {
		const node = new Group(block.lineno, block.column);

		this.each(block, (ret: INode) => {
			node.append(ret);
		});

		return node;
	}

	visitSelector(block: INode) {
		const node = new Selector(block.lineno, block.column);

		this.each(block, (ret: INode) => {
			node.append<Selector>(ret, 'segments');
		}, 'segments');

		if (block.block) {
			node.append(this.visit(block.block));
		}

		return node;
	}

	visitProperty(block: INode) {
		const node = new Property(block.lineno, block.column);

		this.each(block, (ret: INode) => {
			node.append(ret);
		});

		return node;
	}

	visitLiteral(block: INode) {
		const node = new Literal(block.lineno, block.column);

		console.log(block);

		return node;
	}
}

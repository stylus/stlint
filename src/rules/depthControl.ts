import { Rule } from "../core/rule";
import { IState } from "../core/types/state";
import { Block, Selector, Property, Obj, Ident, Node, Media, Condition } from "../core/ast/index";

interface IDepthControlState extends IState {
	indentPref?: "tab" | number
}

/**
 * Control depth spaces or tab
 */
export class DepthControl extends Rule<IDepthControlState> {

	nodesFilter = ['block', 'selector', 'obj'];

	checkNode(node: Block | Selector | Obj): void {
		const
			indentPref: number = typeof this.state.indentPref === 'number' ? this.state.indentPref : 1;

		if (node instanceof Block || node instanceof Selector) {
			let
				parentNode: Node | null = node.closest<Node>('selector|media|condition|keyframes'),
				needCheckPreviousSelector: boolean = false,
				prev: Node | null = parentNode;

			if (parentNode && parentNode instanceof Selector) {
				while (prev && parentNode)  {
					prev = prev.previousSibling();

					if (prev && prev instanceof Selector && prev.lineno === parentNode.lineno) {
						parentNode = <Selector>prev;
					} else {
						break;
					}
				}
			}

			if (parentNode) {
				if (node instanceof Block) {
					node.nodes.forEach(child => {
						if (parentNode && (child instanceof Property || child instanceof Media || child instanceof Condition) && child.column - indentPref !== parentNode.column) {
							this.msg('incorrect indent', child.lineno, 0, child.column);
						}
					})
				} else if (node.column - indentPref !== parentNode.column) {
					needCheckPreviousSelector = true;
				}
			} else if (node instanceof Selector && node.column !== 1) {
				needCheckPreviousSelector = true;
			}

			if (needCheckPreviousSelector) {
				prev = node.previousSibling();

				if (!prev || prev.lineno !== node.lineno) {
					this.msg('incorrect indent', node.lineno, 0, node.column);
				}
			}

			return;
		}

		if (node instanceof Obj) {
			const
				key: Ident | Property | null = node.closest<Ident | Property>('ident|property');

			if (key) {
				const parentColumn = (key instanceof Property && key.key instanceof Ident) ? key.key.column : key.column;

				node.nodes.forEach(child => {
					if (child instanceof Property && child.key instanceof Ident && child.key.column - indentPref !== parentColumn) {
						this.msg('incorrect indent', child.key.lineno, 0, child.key.column);
					}
				})
			}

			return;
		}
	}
}

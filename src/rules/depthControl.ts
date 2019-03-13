import { Rule } from "../core/rule";
import { IState } from "../core/types/state";
import { Block, Selector, Property, Obj, Ident, Node } from "../core/ast";

interface IDepthControlState extends IState {
	indentPref: "tab" | number
}

export class DepthControl extends Rule<IDepthControlState> {

	nodesFilter = ['block', 'selector', 'obj'];

	checkNode(node: Block | Selector | Obj): void {
		const
			indentPref: number = typeof this.state.indentPref === 'number' ? this.state.indentPref : 1;

		if (node instanceof Block || node instanceof Selector) {
			let
				selector: Selector | null = node.closest<Selector>(Selector),
				needCheckPreviousSelector: boolean = false,
				prev: Node | null = selector;

			while (prev && selector)  {
				prev = prev.previousSibling();

				if (prev && prev instanceof Selector && prev.lineno === selector.lineno) {
					selector = <Selector>prev;
				} else {
					break;
				}
			}

			if (selector) {
				if (node instanceof Block) {
					node.nodes.forEach(child => {
						if (selector && child instanceof Property && child.column - indentPref !== selector.column) {
							this.msg('incorrect indent', child.lineno, 0, child.column);
						}
					})
				} else if (node.column - indentPref !== selector.column) {
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
				key: Ident | null = node.closest<Ident>(Ident);

			if (key) {
				node.nodes.forEach(child => {
					if (child instanceof Property && child.key instanceof Ident && child.key.column - indentPref !== key.column) {
						this.msg('incorrect indent', child.key.lineno, 0, child.key.column);
					}
				})
			}

			return;
		}
	}
}

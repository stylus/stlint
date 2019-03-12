import { Rule } from "../core/rule";
import { IState } from "../core/types/state";
import { Block, Selector, Property, Obj, Ident } from "../core/ast";

interface IDepthControlState extends IState {
	indentPref: "tab" | number
}

export class DepthControl extends Rule<IDepthControlState> {

	nodesFilter = ['block', 'selector', 'obj'];

	checkNode(node: Block | Selector | Obj): void {
		const
			indentPref: number = typeof this.state.indentPref === 'number' ? this.state.indentPref : 1;

		if (node instanceof Block || node instanceof Selector) {
			const
				selector: Selector | null = node.closest<Selector>(Selector);

			if (selector) {
				if (node instanceof Block) {
					node.nodes.forEach(child => {
						if (child instanceof Property && child.column - indentPref !== selector.column) {
							this.msg('incorrect indent', child.lineno, 0, child.column);
						}
					})
				} else if (node.column - indentPref !== selector.column) {
					this.msg('incorrect indent', node.lineno, 0, node.column);
				}
			} else if (node instanceof Selector && node.column !== 1) {
				this.msg('incorrect indent', node.lineno, 0, node.column);
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

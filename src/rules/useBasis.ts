import { Rule } from "../core/rule";
import { INode } from "../core/types/ast/node";

export class useBasis extends Rule {
	nodesFilter = ['unit', 'call'];

	checkNode(node: INode) {

		if (this.state.conf === 'always') {
			if (node.value && typeof node.value === 'string') {
				const unit = /([\d]+)px/.exec(node.value);

				if (unit) {
					const
						unitSize: number = Number(unit[1]),
						basis = (unitSize / 8);
					this.msg(`Use basis mixin instead "px" (basis(${basis}))`, node.lineno, node.column, node.column + node.value.length - 1);
					return true;
				}
			}
		} else {
			if (node.nodeName === 'call' && typeof node.key === 'string' && node.key === 'basis') {
				this.msg(`Do not use Basis mixin`, node.lineno, node.column, node.column + node.key.length - 1);
			}
		}

		return false;
	}
}

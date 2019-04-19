import { Rule } from '../core/rule';
import { INode } from '../core/types/ast/node';
import { IState } from '../core/types/state';

interface IUseMixinInsteadunitState extends IState {
	mixin: string;
	unitType: string;
	allowOneUnit?: boolean;
}

/**
 * Allo or deny some mixin instead of unit statement
 */
export class useMixinInsteadUnit extends Rule<IUseMixinInsteadunitState> {
	nodesFilter: string[] = ['unit', 'call'];

	checkNode(node: INode): void | boolean {

		if (this.state.conf === 'always') {
			if (node.value && typeof node.value === 'string') {
				const unit = RegExp('([\\d]+)' + this.state.unitType).exec(node.value);

				if (unit) {
					const
						unitSize: number = Number(unit[1]);

					if (this.state.allowOneUnit && unitSize === 1) {
						return false;
					}

					let
						fix = '';

					if (this.state.mixin === 'basis') {
						const
							basis = (unitSize / 8);

						fix = `basis(${basis})`;
					}

					this.msg(
						`Use "${this.state.mixin}" mixin instead "${this.state.unitType}"`,
						node.lineno,
						node.column,
						node.column + node.value.trimRight().length - 1,
						fix || null
					);

					return true;
				}
			}
		} else {
			if (node.nodeName === 'call' && typeof node.key === 'string' && node.key === this.state.mixin) {
				this.msg(`Do not use "${this.state.mixin}" mixin`, node.lineno, node.column, node.column + node.key.length - 1);
			}
		}

		return false;
	}
}

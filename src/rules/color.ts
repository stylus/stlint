import { Rule } from "../core/rule";
import { IState } from "../core/types/state";
import { RGB } from "../core/ast/index";

interface IColorState extends IState {
	allowOnlyInVar?: boolean
}

/**
 * Process all color values. Allow or deny use it not in variable and use uppercase or lowercase statements
 * For example this code has error - because we use only color in `uppercase`
 * ```stylus
 * .test
 * 	color #ccc
 * ```
 * If `allowOnlyInVar` === true code above also has error - no use color without variable
 *
 * Fixed code
 * ```stylus
 * $color = #CCC
 * .test
 * 	color $color
 * ```
 */
export class Color extends Rule<IColorState> {
	nodesFilter = ['rgb'];

	checkNode(node: RGB) {
		const checkReg = this.state.conf !== 'lowercase' ? /[a-z]/ : /[A-Z]/;

		if (this.state.allowOnlyInVar && node.closest('block')) {
			const fix = this.context.valueToVar[node.value] ||
				this.context.valueToVar[node.value.toLowerCase()] ||
				this.context.valueToVar[node.value.toUpperCase()];

			this.msg(`Set color only in variable` + (fix ? `(${fix})` : ''), node.lineno, node.column, node.column + node.value.length - 1, fix || null);
		}

		if (node.value && typeof node.value === 'string' && checkReg.test(node.value)) {
			const fix = node.value.toString();

			this.msg(
				`Only ${ this.state.conf } HEX format`,
				node.lineno,
				node.column,
				node.column + node.value.length - 1,
				this.state.conf === 'uppercase' ? fix.toUpperCase() : fix.toLowerCase()
			);

			return true;
		}

		return false;
	}
}

import { Rule } from "../core/rule";
import { ILine } from "../core/types/line";

/**
 * check for mixed spaces and tabs
 */
export class MixedSpaces extends Rule {
	checkLine(line: ILine): boolean {
		const
			mixed = /( \t|\t )/.exec(line.line),
			isMixed = mixed !== null;

		if (isMixed && mixed) {
			this.msg( 'mixed spaces and tabs', line.lineno, mixed.index);
		}

		return isMixed
	}
}

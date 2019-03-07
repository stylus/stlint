import { Rule } from "../core/rule";
import { ILine } from "../core/types/line";

/**
 * check for mixed spaces and tabs
 */
export class MixedSpaces extends Rule {
	checkLine(line: ILine): boolean {
		const
			mixed = /( \t|\t )[\t\s]*/.exec(line.line),
			isMixed = mixed !== null;

		if (isMixed && mixed && !this.context.inComment) {
			this.msg( 'mixed spaces and tabs', line.lineno, mixed.index, mixed.index + mixed[0].length);
		}

		return isMixed
	}
}

import { Rule } from "../core/rule";
import { ILine } from "../core/types/line";
import { IState } from "../core/types/state";

const
	indentMixedRe = /^[\s]+/,
	indentTabRe = /^[\t]+/,
	indentSpaceRe = /^[ ]+/;

interface IDepthControlState extends IState {
	indentPref: "tab" | number
}

export class DepthControl extends Rule<IDepthControlState> {
	private getIndent(ln: string, indentPref: number): number {
		const
			match = this.state.indentPref === 'tab' ? indentTabRe.exec(ln) : indentSpaceRe.exec(ln);

		return match ? match[0].replace(/\t/g, ' '.repeat(indentPref)).length: 0;
	}

	checkLine(line: ILine): void | boolean {
		if (!line.line.trim().length) {
			return;
		}

		const
			indentPref: number = typeof this.state.indentPref === 'number' ? this.state.indentPref : 4;

		let
			hasError = false,
			currentLength = this.getIndent(line.line, indentPref);

		if (currentLength % indentPref) {
			const match = indentMixedRe.exec(line.line);
			this.msg( 'incorrect indent', line.lineno, 0, match ? match[0].length : 0);
			return false;
		}

		let prev = line.prev();
		while (prev && !prev.line.length) {
			prev = prev.prev();
		}

		if (prev) {
			const
				depthDiff = Math.abs(currentLength - this.getIndent(prev.line, indentPref));

			if (depthDiff !== indentPref && depthDiff !== 0) {
				const match = indentMixedRe.exec(line.line);
				this.msg( 'incorrect indent', line.lineno,0, match ? match[0].length : 0);
				return false;
			}
		}

		return hasError;
	}
}

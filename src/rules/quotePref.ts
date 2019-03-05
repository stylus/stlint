import { Rule } from "../core/rule";
import { ILine } from "../core/types/line";

const stringRe = /(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/g;


/**
 * @description check that quote style is consistent with config
 */
export class QuotePref extends Rule {
	checkLine(line: ILine): void | boolean {
			if (line.line.indexOf('"') === -1 && line.line.indexOf("'") === -1) {
				return;
			}

			stringRe.lastIndex = 0;

			let badQuotes = false;
			let hasInnerQuote = true;
			let match;

			while ((match = stringRe.exec(line.line)) !== null) {
				let content = match[0].slice( 1, -1 );

				if (this.state.conf === 'single' && match[0].indexOf('"') === 0) {
					hasInnerQuote = content.indexOf("'") !== -1;

					if (!hasInnerQuote) {
						badQuotes = true;
						this.msg(
							'preferred quote style is ' + this.state.conf + ' quotes',
							line.lineno,
							match.index,
							match[0].length + match.index
						);
					}
				} else if (this.state.conf === 'double' && match[0].indexOf("'") === 0) {
					hasInnerQuote = content.indexOf('"') !== -1;

					if (!hasInnerQuote) {
						badQuotes = true;
						this.msg(
							'preferred quote style is ' + this.state.conf + ' quotes',
							line.lineno,
							match.index,
							match[0].length + match.index
						);
					}
				}
			}

			return badQuotes;
	}
}

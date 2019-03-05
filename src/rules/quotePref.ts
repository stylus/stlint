'use strict'

import { Rule } from "../core/rule";
import { ILine } from "../core/types/line";

const stringRe = /(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/g;


/**
 * @description check that quote style is consistent with config
 * @param  {string} [line] curr line being linted
 * @param {string} [origLine] curr line before being stripped
 * @return {boolean} true if in order, false if not
 */
export class QuotePref extends Rule {
	checkLine(line: ILine): void | boolean {
			if (line.line.indexOf( '"' ) === -1 && line.line.indexOf( "'" ) === -1) {
				return;
			}

			stringRe.lastIndex = 0;

			let badQuotes = false;
			let hasInnerQuote = true;
			let match;

			// for each quote match, check err
			while ((match = stringRe.exec(line.line)) !== null) {
				// just checks the first inner quote, most common case
				// almost certainly not the best way to do this
				let content = match[0].slice( 1, -1 );

				// if '' quotes preferred and match starts with double "" quote
				if (this.state.conf === 'single' && match[0].indexOf( '"' ) === 0) {
					// "" is allowed when it's cases like "Someone's string here"
					hasInnerQuote = content.indexOf( "'" ) !== -1;

					if (!hasInnerQuote) {
						badQuotes = true;
						this.msg('preferred quote style is ' + this.state.conf + ' quotes', line.lineno, match[0].indexOf( '"' ))
					}
				}
				// if "" quotes preferred and match start with single '' quote
				else if ( this.state.conf === 'double' && match[0].indexOf( "'" ) === 0 ) {
					// "" is allowed when it's cases like "Someone's string here"
					hasInnerQuote = content.indexOf( '"' ) !== -1;

					if ( !hasInnerQuote ) {
						badQuotes = true;
						this.msg('preferred quote style is ' + this.state.conf + ' quotes',line.lineno, match[0].indexOf( "'" ))
					}
				}
			}

			return badQuotes;
	}
}

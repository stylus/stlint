import Escaper = require('escaper');

/**
 * Replace all comments to safe (without error) value
 * @param content
 */
export function safeComments(content: string): string {
	const
		replacedText: string[] = [],
		str = Escaper.replace(content, {
			strings: [
				'comments'
			]
		}, replacedText);

	if (replacedText.length && str !== content && typeof str === 'string') {
		return Escaper.paste(str, replacedText.map((comment) => {
			if (comment.indexOf('/*') === 0) {
				return comment.replace(/(\/\*)(.*)(\*\/)/s, (res, ...match) =>
					match[0] +
					match[1].split(/\n/).fill('empty').join('\n') +
					match[2]
				);
			}

			return /@stlint/.test(comment) ? comment : '// empty';
		}));
	}

	return content;
}

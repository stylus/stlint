import { splitLines } from './splitLines';

/**
 * Calc position in text by line and column
 *
 * @param line
 * @param column
 * @param content
 */

export const calcPosition = (line: number, column: number, content: string): number => {
	if (line === 1) {
		return column - 1;
	}

	let
		position = 0;

	splitLines(content)
		.forEach((ln, lineno) => {
			if (lineno >= line) {
				return false;
			}

			position += ln.line.length + 1;
		});

	return position + column - 1;
};

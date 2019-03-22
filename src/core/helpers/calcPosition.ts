import { SPLIT_REG } from './splitLines';

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

	const
		lines = content.split(SPLIT_REG);

	let
		position = 0;

	for (let i = 0; i < line - 1 && i < lines.length; i += 1) {
		position += lines[i].length + 1;
	}

	return position + column - 1;
};

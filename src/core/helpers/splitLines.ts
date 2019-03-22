import { Line } from '../line';

export const SPLIT_REG = /\n/;

/**
 * Split line on lines
 * @param content
 */
export function splitLines(content: string): Line[] {
	const
		lines: Line[] = [];

	content.split(SPLIT_REG)
		.forEach((ln, index) => {
			lines[index + 1] = new Line(ln, index + 1, lines);
		});

	return lines;
}

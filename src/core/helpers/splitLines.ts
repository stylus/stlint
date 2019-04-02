/**
 * Split line on lines
 * @param content
 */
import { Line } from '../line';

const SPLIT_REG = /\n/;

export const splitLines = (content: string): Line[] => {
	const
		lines: Line[] = [];

	content.split(SPLIT_REG)
		.forEach((ln, index) => {
			lines[index + 1] = new Line(ln, index + 1, lines);
		});

	return lines;
};

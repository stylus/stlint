import { Line } from "../line";

export function splitLines(content: string): Line[] {
	const
		lines: Line[] = [];

	content.split(/\n/)
		.forEach((ln, index) => {
			lines[index] = new Line(ln, index + 1, lines);
		});

	return lines;
}

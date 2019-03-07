import { ILine } from "./types/line";

export class Line implements ILine {
	readonly line: string;
	readonly lineno: number = 1;
	readonly lines: Line[] = [];

	constructor(line: string, lineno: number = 1, lines: Line[] = []) {
		this.line = line;
		this.lineno = lineno;
		this.lines = lines;
	}

	/**
	 * Get next line
	 */
	next(): ILine | null {
		const index = this.lines.indexOf(this);

		if (index !== -1 && this.lines[index + 1]) {
			return this.lines[index + 1];
		}

		return null;
	}
}

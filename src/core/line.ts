import { ILine } from './types/line';

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

		if (index !== -1) {
			return this.lines[index + 1] || null;
		}

		return null;
	}

	/**
	 * Get previous line
	 */
	prev(): ILine | null {
		const index = this.lines.indexOf(this);

		if (index !== -1) {
			return this.lines[index - 1] || null;
		}

		return null;
	}

	/**
	 * Check the line is empty
	 */
	isEmpty(): boolean {
		return this.line.trim().length === 0;
	}
}

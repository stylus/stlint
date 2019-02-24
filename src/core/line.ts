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
}

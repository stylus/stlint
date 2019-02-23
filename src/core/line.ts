import { ILine } from "./types/line";

export class Line implements ILine {
	constructor(readonly line: string, readonly lineno: number, readonly lines: Line[]) {}
}

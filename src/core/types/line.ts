export interface ILine {
	line: string;
	lineno: number;
	lines: ILine[];
	next(): null | ILine;
	prev(): null | ILine;
	isEmpty(): boolean;
}

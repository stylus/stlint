export interface IReporter {
	add(message: string, line: number, start: number, end?: number): void;
	display(): void;
}

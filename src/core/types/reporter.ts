import { IResponse } from "./response";

export interface IReporter {
	reset(): void;
	add(message: string, line: number, start: number, end?: number): void;
	display(): void;
	response: IResponse;
}

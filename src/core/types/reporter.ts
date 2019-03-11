import { IResponse } from "./response";
import { IMessagePack } from "./message";

export type ReporterType = 'json' | 'silent' | 'raw';

export interface IReporter {
	errors: IMessagePack[];
	reset(): void;
	add(rule: string, message: string, line: number, start: number, end?: number): void;
	display(exit: boolean): void;
	log(): void;
	setPath(path: string): void;
	fillResponse(): void;
	response: IResponse;
}

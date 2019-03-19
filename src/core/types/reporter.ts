import { IResponse } from './response';
import { IMessagePack } from './message';

export type ReporterType = 'json' | 'silent' | 'raw';

export interface IReporter {
	errors: IMessagePack[];

	response: IResponse;
	reset(): void;

	add(rule: string, message: string, line: number, start: number, end?: number, fix?: string | null): void;

	display(exit: boolean): void;
	log(): void;
	setPath(path: string): void;
	fillResponse(): void;

	filterErrors(grep: string): void;
}

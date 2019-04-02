import { ILine } from './line';
import { IMessage } from './message';

export type eachLineCallback = (line: ILine, lineno: number) => void | false;

export interface IContent {
	toString(): string;

	firstLine(): ILine;

	/**
	 * Apply callback on every lines. if callback returns false - break cycle
	 * @param callback
	 */
	forEach(callback: eachLineCallback): void;
	getLine(lineno: number): ILine | null;

	applyFixes(messages: IMessage[]): IContent;
}

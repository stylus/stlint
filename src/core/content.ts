import { eachLineCallback, IContent } from './types/content';
import { Line } from './line';
import { IMessage } from './types/message';
import { calcPosition, splitLines } from './helpers/index';

export class Content implements IContent {
	protected lines: Line[];

	constructor(readonly content: string) {
		this.lines = splitLines(content);
	}

	toString(): string {
		return this.content;
	}

	/**
	 * Get first line
	 */
	firstLine(): Line {
		return this.lines[1];
	}

	/**
	 * Apply callback on every line
	 *
	 * @param callback
	 */
	forEach(callback: eachLineCallback): void {
		for (let lineno = 1; lineno < this.lines.length; lineno += 1) {
			if (callback(this.lines[lineno], lineno) === false) {
				break;
			}
		}
	}

	/**
	 * Return line
	 * @param lineno
	 */
	getLine(lineno: number): Line {
		if (!this.lines[lineno]) {
			throw new Error('Line not exists');
		}

		return this.lines[lineno];
	}

	/**
	 * Apply some fix to text
	 *
	 * @param messages
	 */
	applyFixes(messages: IMessage[]): Content {
		let content = this.content;

		messages.forEach((message, index) => {
			if (message.fix) {
				const
					start = calcPosition(message.line, message.start, content),
					end = calcPosition(message.endline, message.end, content),
					oldPart = content.substring(start, end + 1),
					fix = message.fix.replace.toString(),
					diffLines = splitLines(fix).length - splitLines(oldPart).length;

				content = content.substr(0, start) + fix + content.substr(end + 1);

				if (diffLines) {
					for (let i = index + 1; i < messages.length; i += 1) {
						messages[i].line += diffLines;
						messages[i].endline += diffLines;
					}
				}
			}
		});

		return new Content(content);
	}
}

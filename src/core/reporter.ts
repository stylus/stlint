import { IReporter } from "./types/reporter";
import { IMessage } from "./types/message";
import { IResponse } from "./types/response";
import { writeFileSync } from "fs";
import { inspect } from 'util'

export class Reporter implements IReporter {
	errors: IMessage[] = [];
	constructor(readonly path: string) {}

	/**
	 *
	 * @param message
	 * @param line
	 * @param start
	 * @param end
	 */
	add(message: string, line: number = 0, start: number = 0, end: number = 0) {
		this.errors.push({
			descr: message,
			path: this.path,
			line,
			endline: line,
			start,
			end: end >= start ? end : start + 1
		});
	}

	display() {
		const response: IResponse = {
			passed: true
		};

		if (this.errors.length) {
			response.passed = false;
			response.errors = [{
				message: this.errors
			}];
		}

		console.log(JSON.stringify(response));
		writeFileSync( './response.txt', JSON.stringify(response), 'utf-8');
	}
}

export const log = (val: any) => console.log(inspect(val, {
	depth: 10
}));

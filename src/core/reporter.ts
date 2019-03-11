import { IReporter } from "./types/reporter";
import { IMessagePack} from "./types/message";
import { IResponse } from "./types/response";
import { inspect } from 'util'

export class Reporter implements IReporter {
	errors: IMessagePack[] = [];
	private path: string = '';
	setPath(path: string) {
		this.path = path;
	}

	protected constructor() {}

	private static __instance: IReporter | null = null;

	static getInstance(type: string): IReporter {
		if (!Reporter.__instance) {
			switch (type) {
				case 'json':
					Reporter.__instance = new Reporter();
					break;

				case 'emptyout':
					Reporter.__instance = new EmptyOut();
					break;

				default:
					Reporter.__instance = new RawReporter();
			}
		}

		return Reporter.__instance;
	}

	/**
	 *
	 * @param rule
	 * @param message
	 * @param line
	 * @param start
	 * @param end
	 */
	add(rule: string, message: string, line: number = 0, start: number = 0, end: number = 0) {
		this.errors.push({
			message: [{
				rule,
				descr: message,
				path: this.path,
				line,
				endline: line,
				start,
				end: end > start ? end : start
			}]
		});
	}

	log(exit: boolean) {
		console.log(JSON.stringify(this.response, null, 2));
	}

	response: IResponse = {
		passed: true
	};

	display(exit: boolean) {
		if (this.errors.length) {
			this.response.passed = false;
			this.response.errors = this.errors;
		}

		this.log(exit);
	}

	reset() {
		this.errors.length = 0;
		this.response = {
			passed: true
		};
	}
}

export const log = (val: any) => console.log(inspect(val, {
	depth: 10
}));

import { EmptyOut } from "./reporters/emptyOut";
import { RawReporter } from "./reporters/RawReporter";

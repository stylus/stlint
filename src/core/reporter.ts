import { IReporter } from "./types/reporter";
import { IMessage } from "./types/message";

export class Reporter implements IReporter {
	messages: IMessage[] = [];
	constructor(readonly path: string) {}
	/**
	 *
	 * @param message
	 * @param line
	 * @param start
	 * @param end
	 */
	add(message: string, line: number = 0, start: number = 0, end: number = 0) {
		this.messages.push({
			descr: message,
			path: this.path,
			line,
			endline: line,
			start,
			end
		});
	}

	display() {
		console.log(JSON.stringify({
			errors: [{
				message: this.messages
			}]
		}));
	}
}

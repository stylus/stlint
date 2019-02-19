interface Message {
	descr: string;
	path: string;
	line: number;
	endline: number;
	start: number;
	end: number;
}


export default class Reporter {
	messages: Message[] = [];

	/**
	 *
	 * @param message
	 * @param path
	 * @param line
	 * @param start
	 * @param end
	 */
	add(message: string, path: string, line: number = 0, start: number = 0, end: number = 0) {
		this.messages.push({
			descr: message,
			path,
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

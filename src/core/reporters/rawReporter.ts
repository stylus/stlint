import { IMessagePack } from "../types/message";
import columnify = require("columnify");
import chalk from "chalk";
import { Reporter } from "../reporter";

type RawMessage = {
	file: string
	line: number
	description: string
	rule: string
}

export class RawReporter extends Reporter {
	/**
	 * @override
	 */
	log() {
		const
			cwd = process.cwd(),
			warningsOrErrors = [...this.errors], // TODO add warning mode
			messagesToFile: Dictionary<RawMessage[]> = {},
			msg = [];

		warningsOrErrors.forEach((pack: IMessagePack) => {
			pack.message.forEach((message) => {
				const path = message.path.replace(cwd, '');

				if (!messagesToFile[path]) {
					messagesToFile[path] = [];
				}

				messagesToFile[path].push({
					file: chalk.magenta(path.padEnd(30, ' ')),
					line: chalk.yellow(message.line),
					description: chalk.red(message.descr.padEnd(this.options.maxWidth || 100, ' ')),
					rule: chalk.cyan(message.rule)
				});
			});
		});

		const msgGrouped = Object.keys(messagesToFile).map(file =>
			chalk.blue(file) + '\n' + columnify(messagesToFile[file], this.options) + '\n'
		);

		msg.push(msgGrouped.join('\n'));

		const cnt = this.errors.length;

		msg.push('Stlint: ' + (cnt ? chalk.red(cnt) : chalk.green(0)) + ' Errors.');

		console.log(msg.join(''));
	}
}

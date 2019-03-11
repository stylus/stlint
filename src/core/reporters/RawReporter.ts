import { Reporter } from "../reporter";
import { IMessagePack } from "../types/message";
import columnify = require("columnify");
import chalk = require("chalk");

type RawMessage = {
	file: string
	line: number
	description: string
	rule: string
}

export class RawReporter extends Reporter {
	log() {
		const
			cwd = process.cwd(),
			opts = {
				columnSplitter: ' | ',
				headingTransform: (heading: string) => {
					return chalk.yellow(heading.toUpperCase())
				},
				maxWidth: 200,
			},
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
					file: chalk.magenta(path),
					line: chalk.yellow(message.line),
					description: chalk.red(message.descr.padEnd(100, ' ')),
					rule: chalk.cyan(message.rule)
				});
			});
		});

		const msgGrouped = Object.keys(messagesToFile).map(file => {
			messagesToFile[file].sort((a, b) => a.line - b.line);

			return 	chalk.blue(file) + '\n' + columnify(messagesToFile[file], opts) + '\n';
		});

		msg.push(msgGrouped.join('\n'));

		const cnt = this.errors.length;

		msg.push('Stlint: ' + (cnt ? chalk.red(cnt) : chalk.yellow(0)) + ' Errors.');

		console.log(msg.join(''));

		this.reset();

		process.exit(this.response.passed ? 0 : 1);
	}
}

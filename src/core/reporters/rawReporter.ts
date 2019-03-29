import { IMessagePack } from '../types/message';
import columnify = require('columnify');
import chalk from 'chalk';
import { Reporter } from '../reporter';

interface RawMessage {
	file: string
	line: number
	description: string
	rule: string
}

export class RawReporter extends Reporter {
	/**
	 * @override
	 */
	log(): void {
		const
			cwd = process.cwd(),
			warningsOrErrors = [...this.errors], // TODO add warning mode
			messagesToFile: Dictionary<RawMessage[]> = {},
			msg = [],
			columns = process.stdout.columns || this.options.maxWidth || 400,
			calcWidth = (percent: number): number => Math.ceil((columns / 100) * percent) - 4,
			pl = (str: string, percent: number): string => str.padEnd(calcWidth(percent), ' ');

		warningsOrErrors.forEach((pack: IMessagePack) => {
			pack.message.forEach((message) => {
				const path = message.path.replace(cwd, '');

				if (!messagesToFile[path]) {
					messagesToFile[path] = [];
				}

				messagesToFile[path].push({
					file: chalk.magenta(pl(path, 30)),
					line: chalk.yellow(pl(message.line.toString(), 3)),
					description: chalk.red(pl(message.descr, 45)),
					rule: chalk.cyan(message.rule)
				});

				console.log('-'.padEnd(columns, '-'));
			});
		});

		const msgGrouped = Object.keys(messagesToFile).map((file) =>
			[
				chalk.blue(file),
				columnify(messagesToFile[file], this.options),
				''
			].join('\n')
		);

		msg.push(msgGrouped.join('\n'));

		const cnt = this.errors.length;

		msg.push(`Stlint: ${(cnt ? chalk.red(cnt) : chalk.green(0))} Errors.`);

		console.log(msg.join(''));
	}
}

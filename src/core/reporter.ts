import { IReporter } from './types/reporter';
import { IMessagePack } from './types/message';
import { IResponse } from './types/response';
import { inspect } from 'util';

export abstract class Reporter implements IReporter {

	static getInstance(type: string, config: Dictionary): IReporter {
			switch (type) {
				case 'json':
					return new (require('./reporters/jsonReporter').JsonReporter)(config);

				case 'silent':
					return new (require('./reporters/silentReporter').SilentReporter)(config);

				default:
					return new (require('./reporters/rawReporter').RawReporter)(config);
			}
	}
	errors: IMessagePack[] = [];

	response: IResponse = {
		passed: true
	};

	private path: string = '';

	protected constructor(readonly options: Dictionary) {}

	/**
	 * Set current working file
	 * @param path
	 */
	setPath(path: string): void {
		this.path = path;
	}

	/**
	 * Add new error in message pull
	 * @param rule
	 * @param message
	 * @param line
	 * @param start
	 * @param end
	 * @param fix
	 * @param endLine
	 */
	add(
		rule: string,
		message: string,
		line: number = 0,
		start: number = 0,
		end: number = 0,
		fix: string | null = null,
		endLine: number = line
	): void {
		this.errors.push({
			message: [{
				rule,
				descr: message,
				path: this.path,
				line,
				endline: endLine,
				start,
				end: end > start ? end : start,
				fix: (fix !== undefined && fix !== null) ? {
					replace: fix.toString()
				} : null
			}]
		});
	}

	/**
	 * Output data some methods
	 */
	abstract log(): void;

	/**
	 * Fill response object
	 */
	fillResponse(): void {
		this.response.passed = !this.errors.length;
		this.response.errors = this.errors.length ? this.errors : undefined;
	}

	/**
	 * Prepare data and output result
	 * @param exit
	 */
	display(exit: boolean): void {
		this.fillResponse();
		this.log();
		this.reset();

		if (exit) {
			process.exit(this.response.passed ? 0 : 1);
		}
	}

	/**
	 * Reset all error stores
	 */
	reset(): void {
		this.errors.length = 0;
		this.response = {
			passed: true
		};
	}

	/**
	 * Filter messages
	 * @param grep
	 */
	filterErrors(grep: string): void {
		this.errors = this.errors.filter(
			(error) => {
				error.message = error.message.filter((msg) => !!msg.descr.match(grep) || !!msg.rule.match(grep));

				return error.message.length;
			}
		);
	}
}

export const log = (val: any) => console.log(inspect(val, {
	depth: 10
}));

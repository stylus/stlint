import { ucfirst } from './core/helpers/lcfirst';
import yargs = require('yargs');
import { Autocomplete } from './core/autocomplete';
import { Linter } from './linter';

export class Commander {
	private linter: Linter;

	constructor(options: Dictionary = {}) {
		this.linter = new Linter(options);
	}

	exec(command: string): void {
		const ucommand = ucfirst(command);

		if ((this as any)[`command${ucommand}`]) {
			(this as any)[`command${ucommand}`]();
		}

		process.exit();
	}

	protected commandAutocomplete(): void {
		const { content, offset, offsetline } = yargs.options({
			content: { type: 'string' },
			offset: { type: 'number' },
			offsetline: { type: 'number' }
		}).argv;

		const config = this.linter.config;

		const autocomplete = new Autocomplete(config.autocompletes);

		console.clear();
		console.log(
			JSON.stringify({
				suggests: autocomplete.getItems(
					content || '',
					offset || 0,
					offsetline || 0
				)
			})
		);
	}
}

import { Linter } from './src/linter';
import { Reader } from './src/core/reader';
import * as astList from './src/core/ast/index';

export * from './src/core/rule';
export const ast = astList;
export * from './src/doc';

/**
 * Main stylus checker
 *
 * @param path
 * @param content
 * @param options
 * @constructor
 */
export async function StylusLinter(path: string | string[], content?: string, options: Dictionary = {}): Promise<void> {
	const
		linter = new Linter(options),
		first = () => Array.isArray(path) ? path[0] : path;

	if (content) {
		linter.lint(first(), content);
		return linter.display();
	}

	if (!path) {
		path = linter.config.path || process.cwd();
	}

	const
		reader = new Reader(linter.config),
		readAndDisplay = async () => {
			await reader.read(path, linter.lint);

			linter.display(!linter.config.watch);
		};

	if (linter.config.watch) {
		linter.watch(Array.isArray(path) ? path[0] : path, readAndDisplay);
	}

	await readAndDisplay();
}

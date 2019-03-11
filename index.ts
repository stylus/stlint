import { Linter } from "./src/linter";
import { Watcher } from "./src/watcher";
import { Reader } from "./src/core/reader";



const StylusLinter = async (path: string | string[], content?: string, options: Dictionary = {}) => {
	if (!path) {
		path = process.cwd();
	}

	const
		linter = new Linter(options),
		reader = new Reader(linter.config),
		readAndDisplay = async () => {
			await reader.read(path, linter.lint);

			linter.display(!linter.config.watch);
		};


	if (linter.config.watch) {
		const
			watcher = new Watcher();

		watcher.start(Array.isArray(path) ? path[0] : path, readAndDisplay);
	}

	await readAndDisplay();
};

module.exports = StylusLinter;

// StylusLinter('./test.styl');

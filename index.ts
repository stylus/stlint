import { Linter } from "./src/linter";
import { Watcher } from "./src/watcher";
import { Reader } from "./src/core/reader";

export * from "./src/core/rule";
export * from "./src/core/ast";

export async function StylusLinter(path: string): Promise<void>;
export async function StylusLinter(path: string, content: string): Promise<void>;
export async function StylusLinter(path: string, content: string, options: Dictionary): Promise<void>;
export async function StylusLinter(path: string | string[], content?: string, options: Dictionary = {}) {
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
		const
			watcher = new Watcher();

		watcher.start(Array.isArray(path) ? path[0] : path, readAndDisplay);
	}

	await readAndDisplay();
}

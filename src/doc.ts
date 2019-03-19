import { Glob } from "glob"
import { resolve } from "path"
import _require = require('native-require')

export const doc = () => {
	console.log('Documentation generator');
	new Glob('./src/rules/*.ts', {}, async (err: Error | null, files: string[]) => {
		if (err) {
			throw err
		}

		files.forEach(async (file) => {
			const match = /\/(\w+)\.ts/.exec(file);

			if (match) {
				const rule = match[1];
				if (rule !== 'index') {
					console.log(__dirname)
					console.log(_require(file))
				}
			}

		})
	});
};

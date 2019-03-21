import { readFile, writeFileSync } from 'fs';
import { RuleDocs } from './documentator';

/**
 * Patch readme file
 * @param result
 */
export function readmePatcher(result: RuleDocs[]): void {
	const readmeFile = process.cwd() + '/readme.md';

	readFile(readmeFile, 'utf-8', (err, readme: string) => {
		if (err) {
			throw err;
		}

		const
			text = result.map((item: RuleDocs) =>
				[
					'\n',
					`### ${item.name}`,
					`${item.description}\n`,
					'**Default value**',
					'```json',
					`${JSON.stringify(item.default, null, 2)}`,
					'```',
					'----'
				].join('\n')
			).join('');

		const readmeNew = readme.replace(
			/<!-- RULES START -->(.*)<!-- RULES END -->/msg,
			`<!-- RULES START -->${text}<!-- RULES END -->`
		);

		if (readmeNew !== readme) {
			writeFileSync(readmeFile, readmeNew);
			console.log('Readme file patched');
		} else {
			console.log('Readme file not patched');
		}
	});
}

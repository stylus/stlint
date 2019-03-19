import { Glob } from "glob"
import { readFileSync, readFile, writeFileSync } from "fs";
// @ts-ignore
import * as ts from "typescript";
import { Config } from "./config";
import { lcfirst } from "./core/helpers/lcfirst";
import { State } from "./core/types/state";

type RuleDocs = {
	name: string;
	description: string;
	default: State;
}

export const doc = () => {
	console.log('Documentation generator start');

	const
		config = new Config({}),
		result: RuleDocs[] = [];

	function delint(sourceFile: ts.SourceFile) {
		delintNode(sourceFile);

		function delintNode(node: ts.Node) {
			switch (node.kind) {
				case ts.SyntaxKind.ClassDeclaration: {
					let
						name = lcfirst(node.name.escapedText),
						description = (node.jsDoc && node.jsDoc[0]) ? node.jsDoc[0].comment : '';

					description = description
						.replace(/\t/g, '  ')
						.replace(/(```stylus)(.*)(```)/s, (...match: string[]) => {
							match[2] = match[2]
								.split('\n')
								.map(line =>
									line
										.replace(/^[ \t]+\*/g, '')
										.replace(/^ /g, '')
								)
								.join('\n');
							return `${match[1]}${match[2]}${match[3]}`
						});

					result.push({
						name,
						description,
						default: config.defaultRules[name]
					});

					break;
				}
			}

			ts.forEachChild(node, delintNode);
		}
	}

	new Glob('./src/rules/*.ts', {}, async (err: Error | null, files: string[]) => {
		if (err) {
			throw err
		}

		files.forEach(async (file) => {
			const match = /\/(\w+)\.ts/.exec(file);

			if (match) {
				const rule = match[1];
				if (rule !== 'index') {


					let sourceFile = ts.createSourceFile(
						file,
						readFileSync(file).toString(),
						ts.ScriptTarget.ES2018,
						/*setParentNodes */ true
					);


					delint(sourceFile);
				}
			}
		});

		const readmeFile = process.cwd() + '/readme.md';
		readFile(readmeFile, 'utf-8', (err, readme: string) => {
			if (err) {
				throw err
			}

			const text = result.map((item: RuleDocs) => {
				return `\n` +
					`### ${item.name}\n` +
					`${item.description}\n\n` +
					'**Default value**\n' +
					'```json\n' +
					`${JSON.stringify(item.default, null, 2)}\n` +
					'```\n' +
					'----\n'
					;
			}).join('');

			readme = readme.replace(/<!-- RULES START -->(.*)<!-- RULES END -->/msg, `<!-- RULES START -->${text}<!-- RULES END -->`);

			writeFileSync(readmeFile, readme);
			console.log('Documentation generator finish');

		});
	});
};

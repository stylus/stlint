import { Config } from '../../config';
import { Glob } from 'glob';
import { readFileSync } from 'fs';
import { readmePatcher } from './readmePatcher';
// @ts-ignore
import * as ts from 'typescript';
import { lcfirst } from '../helpers/lcfirst';
import { State } from '../types/state';

/**
 * Visit all ts nodes
 *
 * @param callback
 * @param node
 */
function visit(callback: (node: ts.Node) => void, node: ts.Node): void {
	callback(node);

	ts.forEachChild(node, visit.bind(null, callback));
}

export interface RuleDocs {
	name: string;
	description: string;
	default: State;
}

export class Documentator {
	private config: Config;

	constructor(options: Dictionary) {
		this.config = new Config(options);
	}

	/**
	 * Generate documentation
	 */
	generate(): void {
		switch (this.config.doc) {
			default:
				this.generateRules();
		}
	}

	/**
	 * Generate rules docs
	 */
	private generateRules(): void {
		const
			result: RuleDocs[] = [];

		new Glob('./src/rules/*.ts', {}, async (err: Error | null, files: string[]) => {
			if (err) {
				throw err;
			}

			files.forEach(async (file) => {
				const match = /\/(\w+)\.ts/.exec(file);

				if (match) {
					const rule = match[1];
					if (rule !== 'index') {

						const sourceFile = ts.createSourceFile(
							file,
							readFileSync(file).toString(),
							ts.ScriptTarget.ES2018,
							/*setParentNodes */ true
						);

						visit((node) => {
							switch (node.kind) {
								case ts.SyntaxKind.ClassDeclaration: {
									const
										name = lcfirst(node.name.escapedText);

									let
										description = (node.jsDoc && node.jsDoc[0]) ? node.jsDoc[0].comment : '';

									description = description
										.replace(/\t/g, '  ')
										.replace(/(```stylus)(.*)(```)/s, (...match: string[]) => {
											match[2] = match[2]
												.split('\n')
												.map((line) =>
													line
														.replace(/^[ \t]+\*/g, '')
														.replace(/^ /g, '')
												)
												.join('\n');
											return `${match[1]}${match[2]}${match[3]}`;
										});

									result.push({
										name,
										description,
										default: this.config.defaultRules[name]
									});
								}
							}
						}, sourceFile);
					}
				}
			});

			if (!this.config.fix) {
				return this.log(result);
			}

			readmePatcher(result);
		});
	}

	/**
	 *
	 * @param data
	 */
	private log(data: object): void {
		console.log(JSON.stringify(data));
		process.exit();
	}
}

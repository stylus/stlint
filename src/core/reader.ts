import { Glob } from 'glob';
import { relative } from 'path';
import { map } from 'async';
import { readFile, stat } from 'fs';
import { IConfig } from './types/config';

type ReaderCallback = (file: string, content: string) => void;

export class Reader {
	constructor(readonly config: IConfig) {}

	/**
	 * Check `dir` parameter for folder or file call `readFolder` or `readFiles`
	 *
	 * @param dir
	 * @param callback
	 * @return Promise
	 */
	read(dir: string | string[], callback: ReaderCallback): Promise<void> {
		return new Promise(async (resolve) => {
			if (typeof dir !== 'string' && !(dir instanceof Array)) {
				throw new TypeError('getFiles err. Expected string or array, but received: ' + typeof dir);
			}

			if (typeof dir === 'string') {
				if (dir === process.cwd()) {
					dir = dir + '/**/*.styl';
					await this.readFolder(dir, callback);
					resolve();
					return;
				}

				return stat(dir, async (err, stats) => {
					if (!stats || err) {
						throw Error('Stlint Error: No such file or dir exists!');
					}

					if (stats.isFile()) {
						await this.readFiles([dir.toString()], callback);
					} else if (stats.isDirectory()) {
						await this.readFolder(dir.toString() + '/**/*.styl', callback);
					}

					resolve();
				});
			}

			return Promise.all(dir.map((path) => this.read(path, callback)));
		});
	}

	/**
	 * Find all 'styl' files in the directory and call `readFiles`
	 *
	 * @param dir
	 * @param callback
	 * @return Promise
	 */
	readFolder(dir: string, callback: ReaderCallback): Promise<void> {
		return new Promise((resolve) =>
			new Glob(dir, {}, async (err: Error | null, files: string[]) => {
				if (err) {
					throw err;
				}

				if (this.config.excludes && this.config.excludes.length) {
					files = files.filter((file) => {
						const
							relPath = relative(dir.replace('/**/*.styl', ''), file);

						return !this.config.excludes.some((exclude) => {
							const reg = new RegExp(exclude);

							return reg.test(relPath);
						});
					});
				}

				await this.readFiles(files, callback);

				resolve();
			}));
	}

	/**
	 * Read all files from array and call ReaderCallback
	 *
	 * @param files
	 * @param callback
	 * @return Promise
	 */
	readFiles(files: string[], callback: ReaderCallback): Promise<void> {
		return new Promise((resolve) => {
			map(files, readFile, (error: Error | null | void, buffer: (Buffer | void)[] | void) => {
				if (error) {
					throw error;
				}

				if (buffer) {
					buffer.forEach(async (bf, index) => {
						bf && await callback(files[index], bf.toString());

						if (index === files.length - 1) {
							resolve();
						}
					});
				}
			});
		});
	}
}

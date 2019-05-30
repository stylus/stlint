import { Config } from '../src/config';
import { expect } from 'chai';
import { IState } from '../src/core/types/state';

describe('Test extends option', () => {
	const tmp: Dictionary = {};

	beforeEach(() => {
		tmp.readJSONFile = Config.prototype.readJSONFile;
		tmp.statSync = Config.prototype.statSync;
	});
	afterEach(() => {
		Config.prototype.readJSONFile = tmp.readJSONFile;
		Config.prototype.statSync = tmp.statSync;
	});

	describe('Define `extends` options', () => {
		describe('like filepath', () => {
			it('Should load config from `extends` and redefine some values from it config', () => {
				Config.prototype.readJSONFile = (path) =>
					path.match('testrc') ? {
						rules: {
							color: false,
							colons: false
						}
					} : {};

				Config.prototype.statSync = () => ({
					isDirectory(): boolean {
						return false;
					},
					isFile(): boolean {
						return true;
					}
				});

				const config = new Config({
					rules: {
						color: true
					},
					extends: './tests/.testrc'
				});

				expect((<IState>config.rules.color)).to.be.true; // redefine
				expect((<IState>config.rules.colons)).to.be.false; // from extends config
				expect((<IState>config.rules.prefixVarsWithDollar)).to.be.deep.equal({
					allowConst: true,
					conf: 'always',
					prefix: '$'
				}); // default option

			});
		});
		describe('like array of filepath', () => {
			it('Should load all configs from `extends`', () => {
				Config.prototype.readJSONFile = (path) => {
					switch (true) {
						case !!path.match('testrA'):
							return {
								rules: {
									color: {
										conf: 'lowercase'
									}
								}
							};
						case !!path.match('testrB'):
							return {
								rules: {
									color: {
										conf: 'test'
									}
								}
							};
					}

					return {};
				};

				Config.prototype.statSync = () => ({
					isDirectory(): boolean {
						return false;
					},
					isFile(): boolean {
						return true;
					}
				});

				const config = new Config({
					extends: [
						'./tests/.testrA',
						'./tests/.testrB'
					]
				});

				expect((<IState>config.rules.color).conf).to.be.equal('test'); // redefine
				expect((<IState>config.rules.prefixVarsWithDollar)).to.be.deep.equal({
					allowConst: true,
					conf: 'always',
					prefix: '$'
				}); // default option

			});
		});
		describe('like array of packages', () => {
			it('Should load all configs from packages root from node_modules folder', () => {
				Config.prototype.readJSONFile = (path) => {
					path = path.replace(process.cwd(), '');

					switch (path) {
						case '/node_modules/stlint-a':
							return {
								rules: {
									color: {
										conf: 'lowercase'
									}
								}
							};
						case '/node_modules/stlint-b':
							return {
								rules: {
									color: {
										conf: 'test'
									}
								}
							};
					}

					return {};
				};

				Config.prototype.statSync = () => ({
					isDirectory(): boolean {
						return false;
					},
					isFile(): boolean {
						return true;
					}
				});

				const config = new Config({
					extends: [
						'stlint-a',
						'stlint-b'
					]
				});

				expect((<IState>config.rules.color).conf).to.be.equal('test'); // redefine
				expect((<IState>config.rules.prefixVarsWithDollar)).to.be.deep.equal({
					conf: 'always',
					allowConst: true,
					prefix: '$'
				}); // default option

			});
		});
	});
});

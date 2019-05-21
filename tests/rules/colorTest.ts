import { Color } from '../../src/rules/index';
import { expect } from 'chai';
import { parseAndRun } from '../staff/bootstrap';

describe('Color test', () => {
	describe('Boolean enable state', () => {
		it('Should work like default options', () => {
			const rule = new Color({
				conf: 'always'
			});

			parseAndRun('.tab\n\tcolor: #ccc\n\tbackground-color #fff', rule);

			expect(rule.errors.length).to.be.equal(2);
		});
	});
	describe('Need uppercase notation', () => {
		it('Should check the AST has RGB node with wrong color notation', () => {
			const rule = new Color({
				conf: 'uppercase'
			});

			parseAndRun('.tab\n\tcolor: #ccc\n\tbackground-color #fff', rule);

			expect(rule.errors.length).to.be.equal(2);
		});
		it('Should check the AST has RGB node with right color notation', () => {
			const rule = new Color({
				conf: 'uppercase'
			});

			parseAndRun('.tab\n\tcolor: #CCC', rule);

			expect(rule.errors.length).to.be.equal(0);
		});
	});
	describe('Need lowercase notation', () => {
		it('Should check the AST has RGB node with right color notation', () => {
			const rule = new Color({
				conf: 'lowercase'
			});

			parseAndRun('.tab\n\tcolor: #ccc\n\tbackground-color #fff', rule);

			expect(rule.errors.length).to.be.equal(0);
		});
		it('Should check the AST has RGB node with wrong color notation', () => {
			const rule = new Color({
				conf: 'lowercase'
			});

			parseAndRun('.tab\n\tcolor: #CCC', rule);

			expect(rule.errors.length).to.be.equal(1);
		});
	});
	describe('RGB notation', () => {
		describe('Deny rgb notation', () => {
			it('Should find error in RGB node with rgb or rgba color notation', () => {
				const rule = new Color({
					conf: 'uppercase',
					denyRGB: true
				});

				parseAndRun(
					'.tab\n\tcolor: rgba(127, 127, 127, 0.6)\n\tbackground-color rgb(0, 0, 0)\n\tborder-color rgba(#CCC, 1)',
					rule
				);

				expect(rule.errors.length).to.be.equal(2);
			});
		});
		describe('Allow rgb notation', () => {
			it('Should not find error in RGB node with rgb or rgba color notation', () => {
				const rule = new Color({
					conf: 'uppercase',
					denyRGB: false
				});

				parseAndRun('.tab\n\tcolor: rgba(127, 127, 127, 0.6)\n\tbackground-color rgb(0, 0, 0)', rule);

				expect(rule.errors.length).to.be.equal(0);
			});
		});
	});
	describe('Only in variable', () => {
		it('Should check RGB node only in variable', () => {
			const rule = new Color({
				conf: 'uppercase',
				allowOnlyInVar: true
			});

			parseAndRun('$stop = #FFF\n' +
				'$p = {\n' +
				'\tcolor: #FFF\n' +
				'}\n' +
				'.tab\n' +
				'\tcolor: #CCC\n' +
				'\tcolor: $p.color\n', rule);

			expect(rule.errors.length).to.be.equal(1);
		});
		describe('Without error', () => {
			it('Should check RGB node only in variable', () => {
				const rule = new Color({
					conf: 'uppercase',
					allowOnlyInVar: true
				});

				parseAndRun('$stop = #FFF\n' +
					'$p = {\n' +
					'\tcolor: #FFF\n' +
					'}\n' +
					'.tab\n' +
					'\tcolor $p.color\n' +
					'\tbackground-color $stop', rule);

				expect(rule.errors.length).to.be.equal(0);
			});
		});
		describe('Disable option rule', () => {
			it('Should not check RGB node only in variable', () => {
				const rule = new Color({
					conf: 'uppercase',
					allowOnlyInVar: false
				});

				parseAndRun('$stop = #FFF\n' +
					'$p = {\n' +
					'\tcolor: #FFF\n' +
					'}\n' +
					'.tab\n' +
					'\tcolor: #CCC\n' +
					'\tcolor: $p.color\n', rule);

				expect(rule.errors.length).to.be.equal(0);
			});
		});
	});
	describe('Shortcut', () => {
		describe('Allow shortcut', () => {
			describe('Wrong value', () => {
				it('Should throw the error if content can have shortcut color notation', () => {
					const rule = new Color({
						conf: 'lowercase',
						allowShortcut: true
					});

					parseAndRun('.tab\n\tcolor: #cccccc\n\tbackground-color #ffffff', rule);

					expect(rule.errors.length).to.be.equal(2);
				});
			});
			describe('Right value', () => {
				it('Should not throw the error if content has shortcut color notation', () => {
					const rule = new Color({
						conf: 'lowercase',
						allowShortcut: true
					});

					parseAndRun('.tab\n\tcolor: #ccc\n\tbackground-color #fffffd', rule);

					expect(rule.errors.length).to.be.equal(0);
				});
			});
		});
		describe('Deny shortcut', () => {
			describe('Wrong value', () => {
				it('Should throw the error if content have shortcut color notation', () => {
					const rule = new Color({
						conf: 'lowercase',
						allowShortcut: false
					});

					parseAndRun('.tab\n\tcolor: #ccc\n\tbackground-color #fff', rule);

					expect(rule.errors.length).to.be.equal(2);
				});
			});
			describe('Right value', () => {
				it('Should not throw the error if content have not shortcut color notation', () => {
					const rule = new Color({
						conf: 'lowercase',
						allowShortcut: false
					});

					parseAndRun('.tab\n\tcolor: #cccccc\n\tbackground-color #fffffd', rule);

					expect(rule.errors.length).to.be.equal(0);
				});
			});
		});
	});
});

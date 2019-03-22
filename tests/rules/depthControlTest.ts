import { DepthControl } from '../../src/rules/index';
import { expect } from 'chai';
import { parseAndRun } from '../staff/bootstrap';

describe('Depth control test', () => {
	describe('Right content', () => {
		it('Should check all line has normal indent by previous', () => {
			const rule = new DepthControl({
				conf: 'always',
				indentPref: 'tab'
			});

			parseAndRun(
				'$p = {\n' +
				'\ta: #ccc,\n' +
				'\tb: #ddd\n' +
				'}\n' +
				'.test\n' +
				'\tmax-height red;\n' +
				'\n' +
				'\tborder black',
				rule
			);

			expect(rule.errors.length).to.be.equal(0);
		});
		describe('Selector after nested selector', () => {
			it('Should not throw error', () => {
				const rule = new DepthControl({
					conf: 'always',
					indentPref: 'tab'
				});

				parseAndRun(
					'.test\n' +
					'\t&__offer\n' +
					'\t\tdisplay block\n' +
					'\n' +
					'\t\t&:last-child\n' +
					'\t\t\tbackground-position top center\n' +
					'\n' +
					'\t&__rtb-offers\n' +
					'\t\tdisplay block\n',
					rule
				);

				expect(rule.errors.length).to.be.equal(0);
			});
		});
		describe('Property after @media', () => {
			describe('Property has indent equal @media\'s indent + 1', () => {
				it('Should not show error', () => {
					const rule = new DepthControl({
						conf: 'always'
					});

					parseAndRun(
						'.test\n' +
						'\tmax-height red;\n' +
						'\t@media screen and (max-width 600px) \n' +
						'\t\tmax-height red;\n' +
						'\t\tborder black',
						rule
					);

					expect(rule.errors.length).to.be.equal(0);
				});
			});
			describe('Property has indent not equal @media\'s indent + 1', () => {
				it('Should show error', () => {
					const rule = new DepthControl({
						conf: 'always'
					});

					parseAndRun(
						'.test\n' +
						'\tmax-height red;\n' +
						'\t@media screen and (max-width 600px) \n' +
						'\t\t\tborder black',
						rule
					);

					expect(rule.errors.length).to.be.equal(1);
				});
			});
		});
	});
	describe('Wrong content', () => {
		it('Should check all line has normal indent by previous', () => {
			const rule = new DepthControl({
				conf: 'always',
				indentPref: 'tab'
			});

			parseAndRun(
				'$p = {\n' +
				'\ta: #ccc,\n' +
				'\t\tb: #ddd\n' +
				'}\n' +
				'.test\n' +
				'\tmax-height red\n' +
				'\n' +
				'\t\t\tmax-height red;\n' +
				'\tborder black',
				rule
			);

			expect(rule.errors.length).to.be.equal(2);
		});

		describe('Selector after selector', () => {
			describe('In one line', () => {
				it('Should not show error', () => {
					const rule = new DepthControl({
						conf: 'always'
					});

					parseAndRun(
						'.test, .test2\n' +
						'\tmax-height red;\n'
						, rule
					);

					expect(rule.errors.length).to.be.equal(0);
				});
			});
			describe('On different lines', () => {
				it('Should show error', () => {
					const rule = new DepthControl({
						conf: 'always'
					});

					parseAndRun(
						'.test,\n' +
						'\t\t.test2\n' +
						'\tmax-height red;\n'
						, rule
					);

					// Property indent wrong too because it's parents .test2 and .test
					expect(rule.errors.length).to.be.equal(2);
				});
			});
		});

		describe('Use spaces', () => {
			it('Should check all line has normal indent by previous', () => {
				const rule = new DepthControl({
					conf: 'always',
					indentPref: 4 // TODO does not work fo 2 - because of lexer.js remove some spaces
				});

				parseAndRun(
					'$p = {\n' +
					'    a: #ccc\n' +
					'    b: #ddd\n' +
					'}\n' +
					'.test\n' +
					'    max-height red;\n' +
					'\n' +
					'    max-height red;\n' +
					'    border black',
					rule
				);

				expect(rule.errors.length).to.be.equal(0);
			});
		});
	});
	describe('Depth control in the hash', () => {
		it('Should check depth in hash', () => {
			const rule = new DepthControl({
				conf: 'always'
			});

			parseAndRun(
				'$p = {\n' +
				'\ta: #ccc\n' +
				'\t\tb: #ddd\n' +
				'}\n' +
				'.test\n' +
				'\tcolor red\n'
				,
				rule
			);

			expect(rule.errors.length).to.be.equal(1);
		});

		describe('hash in hash', () => {
			it('Should check depth', () => {
				const rule = new DepthControl({
					conf: 'always'
				});

				parseAndRun(
					'$p = {\n' +
					'\ta: #ccc\n' +
					'\tb: {\n' +
					'\t\tc: #ddd\n' +
					'\t\td: #fff\n' +
					'\t}\n' +
					'}\n' +
					'.test\n' +
					'\tcolor red\n'
					,
					rule
				);

				expect(rule.errors.length).to.be.equal(0);
			});
			describe('Wrong depth', () => {
				it('Should check depth', () => {
					const rule = new DepthControl({
						conf: 'always'
					});

					parseAndRun(
						'$p = {\n' +
						'\ta: #ccc\n' +
						'\tb: {\n' +
						'\t\tc: #ddd\n' +
						'\td: #fff\n' +
						'\t}\n' +
						'}\n' +
						'.test\n' +
						'\tcolor red\n'
						,
						rule
					);

					expect(rule.errors.length).to.be.equal(1);
				});
			});
		});
	});
	describe('IF ELSE statement', () => {
		describe('Right depth', () => {
			it('Should not show error', () => {
				const rule = new DepthControl({
					conf: 'always'
				});

				parseAndRun(
					'$p = {\n' +
					'\tshow: true\n' +
					'}\n' +
					'.test\n' +
					'\tdisplay none\n' +
					'\tif $p.show\n' +
					'\t\tdisplay block\n' +
					''
					,
					rule
				);

				expect(rule.errors.length).to.be.equal(0);
			});
		});
		describe('Wrong depth', () => {
			it('Should show error', () => {
				const rule = new DepthControl({
					conf: 'always'
				});

				parseAndRun(
					'$p = {\n' +
					'\tshow: true\n' +
					'}\n' +
					'.test\n' +
					'\tdisplay none\n' +
					'\tif $p.show\n' +
					'\t\t\tdisplay block\n' +
					''
					,
					rule
				);

				expect(rule.errors.length).to.be.equal(1);
			});
		});
	});

	describe('Keyframes', () => {
		describe('Right depth', () => {
			it('Should not show error', () => {
				const rule = new DepthControl({
					conf: 'always'
				});

				parseAndRun(
					'@keyframes spinner\n' +
					'\t0%\n' +
					'\t\ttransform rotate(0)\n' +
					'\t100%\n' +
					'\t\ttransform rotate(360deg)\n' +
					''
					,
					rule
				);

				expect(rule.errors.length).to.be.equal(0);
			});
		});
		describe('Wrong depth', () => {
			it('Should show error', () => {
				const rule = new DepthControl({
					conf: 'always'
				});

				parseAndRun(
					'@keyframes spinner\n' +
					'\t\t0%\n' +
					'\t\t\ttransform rotate(0)\n' +
					'\t100%\n' +
					'\t\ttransform rotate(360deg)\n' +
					''
					,
					rule
				);

				expect(rule.errors.length).to.be.equal(2);
			});
		});
	});
});

import { Colons } from '../../src/rules/index';
import { expect } from 'chai';
import { checkLine, splitAndRun } from '../staff/bootstrap';
import { Linter } from '../../src/linter';

describe('Colons test', () => {
	it('Should check the line has colons and they are needed', () => {
		const rule = new Colons({
			conf: 'always'
		});

		expect(checkLine('color:#ccc', rule)).to.be.true;

		expect(rule.errors.length).to.be.equal(0);
	});

	describe('In hash object', () => {
		it('Should not find errors', () => {
			const rule = new Colons({
				conf: 'never'
			});

			splitAndRun('$p = {\n\tcolor: #ccc;\n}', rule);

			expect(rule.errors.length).to.be.equal(0);
		});
	});

	describe('For variable', () => {
		it('Should work some way like for usual value', () => {
			const rule = new Colons({
				conf: 'never'
			});

			splitAndRun(
				'$p = {\n' +
				'\tb: 1px solid #ccc\n' +
				'}\n' +
				'.test\n' +
				'\tmax-height: $headerHeight\n' +
				'\tborder: $p.border',
				rule
			);

			expect(rule.errors.length).to.be.equal(2);
		});
		describe('For nested variable', () => {
			it('Should not count errors', () => {
				const rule = new Colons({
					conf: 'never'
				});

				splitAndRun(
					'$p = {\n' +
					'\tc: {test: 15px}\n' +
					'\tb: 1px solid #ccc\n' +
					'}\n' +
					'.test\n' +
					'\tmax-height: $headerHeight\n' +
					'\tborder: $p.border',
					rule
				);

				expect(rule.errors.length).to.be.equal(2);
			});
		});
	});

	it('Should check the line does not have colons but they are needed', () => {
		const rule = new Colons({
			conf: 'always'
		});

		expect(checkLine('color #ccc', rule)).to.be.false;

		expect(rule.errors.length).to.be.equal(1);
	});

	it('Should check the line has colons but they are not needed', () => {
		const rule = new Colons({
			conf: 'never'
		});

		expect(checkLine('color:#ccc', rule)).to.be.true;

		expect(rule.errors.length).to.be.equal(1);
	});

	it('Should check the line does not have colons and they are not needed', () => {
		const rule = new Colons({
			conf: 'never'
		});

		expect(checkLine('color #ccc', rule)).to.be.false;

		expect(rule.errors.length).to.be.equal(0);
	});

	describe('Detect pseudo elements', () => {
		it('Should detect different between pseudo element and property: value expression', () => {
			const rule = new Colons({
				conf: 'never'
			});

			expect(checkLine('.tab:first-child', rule)).to.be.not.true;
		});
	});

	describe('Colons in url', () => {
		it('Should not find error url', () => {
			const rule = new Colons({
				conf: 'never'
			});

			splitAndRun(
				'.test\n' +
				'\tmax-height $headerHeight\n' +
				'\tborder basis(10)\n' +
				'\tbackground url(https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fChc4AMP6lbBP.woff2)',
				rule
			);

			expect(rule.errors.length).to.be.equal(0);
		});
	});

	describe('Colons in comment', () => {
		it('Should not find error', () => {
			const linter = new Linter({
				grep: 'colons',
				reporter: 'silent',
				fix: true
			});

			linter.lint('./test.styl',
				'/*!\n' +
				' * V4Fire Client Core\n' +
				' * https://github.com/V4Fire/Client\n' +
				' *\n' +
				' * Released under the MIT license\n' +
				' * https://github.com/V4Fire/Client/blob/master/LICENSE\n' +
				' */\n' +
				'.test\n' +
				'\tmax-height $headerHeight\n' +
				'\tborder basis(10)\n' +
				''
			);

			expect(linter.reporter.response.passed).to.be.true;
		});

		describe('All lines', () => {
			it('Should not be changed', () => {
				const linter = new Linter({
					reporter: 'silent',
					fix: true
				});

				console.log(linter.lint('./test.styl',
					'/*!\n' +
					' * V4Fire Client Core\n' +
					' * https://github.com/V4Fire/Client\n' +
					' *\n' +
					' * Released under the MIT license\n' +
					' * https://github.com/V4Fire/Client/blob/master/LICENSE\n' +
					' */\n' +
					'.test\n' +
					'\tmax-height $headerHeight\n' +
					'\tborder 10px\n' +
					''
				).content);

				expect(linter.reporter.response.passed).to.be.false;
				const errors = linter.reporter.response.errors;
				expect(errors && errors.length).to.be.eq(1);
				expect(errors && errors[0].message[0].line).to.be.eq(10);
			});
		});
	});
});

import { MixedSpaces } from '../../src/rules/index';
import { expect } from 'chai';
import { checkLine, splitAndRun } from '../staff/bootstrap';

describe('Mixed spaces check test', () => {
	it('Should check the line has mixed tabs and spaces', () => {
		const rule = new MixedSpaces({
			conf: 'always'
		});

		expect(checkLine('\tcolor red', rule)).to.be.false;

		expect(checkLine('\t  color red', rule)).to.be.true;

		expect(checkLine(' \tcolor red', rule)).to.be.true;

		expect(checkLine('\t\tfont-size .1111px', rule)).to.be.false;

		expect(checkLine('  font-size .1111px', rule)).to.be.false;

		expect(rule.errors.length).to.be.equal(2);
	});
	describe('In cssdoc', () => {
		it('Should not find the error', () => {
			const rule = new MixedSpaces({
				conf: 'always'
			});

			splitAndRun('/**\n' +
				'\t * Base rule\n' +
				'\t */\n' +
				'\t&__offer-info\n' +
				'\t\tmargin-top basis(2.375)',
				rule);

			expect(rule.errors.length).to.be.equal(0);
		});
	});
});

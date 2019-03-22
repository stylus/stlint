import { CommaInObject } from '../../src/rules/index';
import { expect } from 'chai';
import { splitAndRun } from '../staff/bootstrap';

describe('Comma In Object test', () => {
	describe('Need use', () => {
		describe('Right content', () => {
			it('Should check object fields have trailing comma', () => {
				const rule = new CommaInObject({
					conf: 'always'
				});

				splitAndRun(
					'$p = {\n' +
					'\ta: #ccc,\n' +
					'\tb: #ddd\n' +
					'}.test\n' +
					'\tmax-height red;\n' +
					'\tborder black',
					rule
				);

				expect(rule.errors.length).to.be.equal(0);
			});
		});
		describe('Wrong content', () => {
			it('Should check object fields have trailing comma', () => {
				const rule = new CommaInObject({
					conf: 'always'
				});

				splitAndRun(
					'$p = {\n' +
					'\ta: #ccc\n' +
					'\tb: #ddd\n' +
					'\tc: #ddd\n' +
					'}.test\n' +
					'\tmax-height red;\n' +
					'\tborder black',
					rule
				);

				expect(rule.errors.length).to.be.equal(2);
			});
		});
	});

	describe('Do not need use', () => {
		describe('Right content', () => {
			it('Should check object fields have not trailing comma', () => {
				const rule = new CommaInObject({
					conf: 'never'
				});

				splitAndRun(
					'$p = {\n' +
					'\ta: #ccc\n' +
					'\tb: #ddd\n' +
					'}.test\n' +
					'\tmax-height red;\n' +
					'\tborder black',
					rule
				);

				expect(rule.errors.length).to.be.equal(0);
			});
		});
		describe('Wrong content', () => {
			it('Should check object fields have not trailing comma', () => {
				const rule = new CommaInObject({
					conf: 'never'
				});

				splitAndRun(
					'$p = {\n' +
					'\ta: #ccc,\n' +
					'\tc: #ccc,\n' +
					'\tb: #ddd\n' +
					'}.test\n' +
					'\tmax-height red;\n' +
					'\tborder black',
					rule
				);

				expect(rule.errors.length).to.be.equal(2);
			});
		});
	});
});

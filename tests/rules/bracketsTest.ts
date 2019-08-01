import { parseAndRun } from '../staff/bootstrap';
import { expect } from 'chai';
import { Brackets } from '../../src/rules/index';

describe('Brackets Test', () => {
	it('Should show error on using brackets', () => {
		const rule = new Brackets({
			conf: 'never'
		});

		parseAndRun(
			'$p = {\n' +
			'\tcolor: red\n' +
			'}\n' +
			'.test {\n' +
			'\tborder 1px solid #ccc\n' +
			'\tcolor red\n' +
			'}'
			,
			rule
		);

		expect(rule.errors.length).to.equal(2);
	});
});

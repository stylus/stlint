import { QuotePref } from "../../src/rules/index";
import { expect } from "chai";
import { splitAndRun } from "../staff/bootstrap";

describe('Test quote pref rule', () => {
	describe('You use single quotes', () => {
		it('Should throw error if line has double quote', () => {
			const rule = new QuotePref({
				conf: "single"
			});

			splitAndRun(
				'.test\n' +
				'\tbackground-image: url("./logo.png")\n',
				rule
			);

			expect(rule.errors.length).to.be.equal(1)
		});
		it('Should not throw error if line has single quote', () => {
			const rule = new QuotePref({
				conf: "single"
			});

			splitAndRun(
				'.test\n' +
				'\tbackground-image: url(\'./logo.png\')\n',
				rule
			);

			expect(rule.errors.length).to.be.equal(0)
		});
	});
	describe('You use double quotes', () => {
		it('Should throw error if in line single quote', () => {
			const rule = new QuotePref({
				conf: "double"
			});

			splitAndRun(
				'.test\n' +
				'\tbackground-image: url(\'./logo.png\')\n',
				rule
			);

			expect(rule.errors.length).to.be.equal(1)
		});
		it('Should not throw error if line has double quote', () => {
			const rule = new QuotePref({
				conf: "double"
			});

			splitAndRun(
				'.test\n' +
				'\tbackground-image: url("./logo.png")\n',
				rule
			);

			expect(rule.errors.length).to.be.equal(0)
		});
	});
});

import { DepthControl } from "../../src/rules";
import { expect } from "chai";
import { splitAndRun } from "../staff/bootstrap";

describe('Depth control test', () => {
	describe('Right content', () => {
		it('Should check all line has normal indent by previous', () => {
			const rule = new DepthControl({
				conf: "always",
				indentPref: "tab"
			});

			splitAndRun(
				'$p = {\n' +
				'\ta: #ccc,\n' +
				'\tb: #ddd\n' +
				'}.test\n' +
				'\tmax-height red;\n' +
				'\n' +
				'\tborder black',
				rule
			);

			expect(rule.errors.length).to.be.equal(0)
		});
	});
	describe('Wrong content', () => {
		it('Should check all line has normal indent by previous', () => {
			const rule = new DepthControl({
				conf: "always",
				indentPref: "tab"
			});

			splitAndRun(
				'$p = {\n' +
				'\ta: #ccc,\n' +
				'\t\tb: #ddd\n' +
				'}\n' +
				'.test\n' +
				'\tmax-height red;\n' +
				'\n' +
				'\t\t\tmax-height red;\n' +
				'\tborder black',
				rule
			);

			expect(rule.errors.length).to.be.equal(3)
		});
		describe('Use spaces', () => {
			it('Should check all line has normal indent by previous', () => {
				const rule = new DepthControl({
					conf: "always",
					indentPref: 2
				});

				splitAndRun(
					'$p = {\n' +
					'  a: #ccc,\n' +
					'  b: #ddd\n' +
					'}\n' +
					'.test\n' +
					'  max-height red;\n' +
					'\n' +
					'  max-height red;\n' +
					'      border black',
					rule
				);

				expect(rule.errors.length).to.be.equal(1)
			});
		});
	});
});

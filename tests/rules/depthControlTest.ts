import { DepthControl } from "../../src/rules";
import { expect } from "chai";
import { parseAndRun } from "../staff/bootstrap";

describe('Depth control test', () => {
	describe('Right content', () => {
		it('Should check all line has normal indent by previous', () => {
			const rule = new DepthControl({
				conf: "always",
				indentPref: "tab"
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

			expect(rule.errors.length).to.be.equal(0)
		});
		describe('Selector after nested selector', () => {
			it('Should not throw error', () => {
				const rule = new DepthControl({
					conf: "always",
					indentPref: "tab"
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

				expect(rule.errors.length).to.be.equal(0)
			});
		});
	});
	describe('Wrong content', () => {
		it('Should check all line has normal indent by previous', () => {
			const rule = new DepthControl({
				conf: "always",
				indentPref: "tab"
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

			expect(rule.errors.length).to.be.equal(3)
		});
		describe('Use spaces', () => {
			it('Should check all line has normal indent by previous', () => {
				const rule = new DepthControl({
					conf: "always",
					indentPref: 2
				});

				parseAndRun(
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

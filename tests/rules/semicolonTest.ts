import { Semicolons } from "../../src/rules/index";
import { expect } from "chai";
import { splitAndRun } from "../staff/bootstrap";

describe('Semicolons test', () => {
	it('Should check the line has semicolons and they are needed', () => {
		const rule = new Semicolons({
			conf: "always"
		});

		splitAndRun(
			'.test\n' +
			'\tmax-height red;\n' +
			'\tborder black',
			rule
		);

		expect(rule.errors.length).to.be.equal(1)
	});
	it('Should check the line has semicolons and they are not needed', () => {
		const rule = new Semicolons({
			conf: "never"
		});

		splitAndRun(
			'.test\n' +
			'\tmax-height red\n' +
			'\tborder black',
			rule
		);

		expect(rule.errors.length).to.be.equal(0)
	});
});

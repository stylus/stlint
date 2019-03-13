import { EmptyLines } from "../../src/rules";
import { parseAndRun } from "../staff/bootstrap";
import { expect } from "chai";

describe('Empty lines Test', () => {
	it('Should show error on several empty lines', () => {
		const rule = new EmptyLines({
			conf: "always"
		});

		parseAndRun(
			'.test\n' +
			'\tborder 1px solid #ccc\n' +
			'\n' +
			'\n' +
			'\tcolor red\n' +
			''
			,
			rule
		);

		expect(rule.errors.length).to.be.equal(1)
	});
});

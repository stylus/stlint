import { PrefixVarsWithDollar } from "../../src/rules";
import { parseAndRun } from "../staff/bootstrap";
import { expect } from "chai";

const withDollar = '$test = #ccc\n' +
	'$p = {}\n' +
	'.tab\n' +
	'\tposition absolte\n' +
	'\tmargin 10px\n' +
	'\tbackground-color $p.color\n' +
	'';

const withoutDollar = 'test = #ccc\n' +
	'p = {}\n' +
	'.tab\n' +
	'\tposition absolte\n' +
	'\tmargin 10px\n' +
	'\tbackground-color $p.color\n' +
	'';

describe('Test prefixVarsWithDollar rule', () => {
	describe('Always', () => {
		it('should check variable name and set error if name is not starting with dollar', () => {
			const rule = new PrefixVarsWithDollar({
				conf: "always",
				prefix: "$"
			});

			parseAndRun(withoutDollar, rule);

			expect(rule.errors.length).to.be.equal(2)
		});
		it('should check variable name and not set error if name is starting with dollar', () => {
			const rule = new PrefixVarsWithDollar({
				conf: "always",
				prefix: "$"
			});

			parseAndRun(withDollar, rule);

			expect(rule.errors.length).to.be.equal(0)
		});
	});
	describe('Never', () => {
		it('should check variable name and set error if name is starting with dollar', () => {
			const rule = new PrefixVarsWithDollar({
				conf: "never",
				prefix: "$"
			});

			parseAndRun(withDollar, rule);

			expect(rule.errors.length).to.be.equal(2)
		});
		it('should check variable name and not set error if name is not starting with dollar', () => {
			const rule = new PrefixVarsWithDollar({
				conf: "never",
				prefix: "$"
			});

			parseAndRun(withoutDollar, rule);

			expect(rule.errors.length).to.be.equal(0)
		});
	});
	describe('Check another prefix', () => {
		it('should check variable name and set error if name is not starting with this prefix', () => {
			const rule = new PrefixVarsWithDollar({
				conf: "always",
				prefix: "_"
			});

			parseAndRun('$p = #ccc', rule);

			expect(rule.errors.length).to.be.equal(1)
		});
		describe('Without error', () => {
			it('should check variable name and set error if name is not starting with this prefix', () => {
				const rule = new PrefixVarsWithDollar({
					conf: "always",
					prefix: "_"
				});

				parseAndRun('_p = #ccc', rule);

				expect(rule.errors.length).to.be.equal(0)
			});
		});
	});
});

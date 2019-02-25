import { expect } from "chai";
import { useBasis } from "../../src/rules";
import { parseAndRun } from "../staff/bootstrap";

describe('Use basis mixin test', () => {
	describe('Need replace px unit to basis(*)', () => {
		it('Should check the AST has Unit node with wrong unit notation', () => {

			const rule = new useBasis({
				conf: "always"
			});

			parseAndRun('.tab\n\tfontsize 12px', rule);

			expect(rule.errors.length).to.be.equal(1);
			expect(rule.errors[0][0]).to.be.equal('useBasis: Use basis mixin instead "px" (basis(1.5))')
		});
		it('Should check the AST has Unit node with wrong unit notation but no need replace', () => {

			const rule = new useBasis({
				conf: "never"
			});

			parseAndRun('.tab\n\tfontsize 12px', rule);

			expect(rule.errors.length).to.be.equal(0);
		});
		it('Should check the AST has ? node with wrong basis notation', () => {

			const rule = new useBasis({
				conf: "never"
			});

			parseAndRun('.tab\n\tfontsize basis(1.5)', rule);

			expect(rule.errors.length).to.be.equal(1);
			expect(rule.errors[0][0]).to.be.equal('useBasis: Do not use Basis mixin')
		});
	});
});

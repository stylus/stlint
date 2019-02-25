import { Color } from "../../src/rules";
import { expect } from "chai";
import { StylusParser } from "../../src/core/parser";
import { Runner } from "../../src/core/runner";
import { Tree } from "../../src/core/ast";
import { IRule } from "../../src/core/types/rule";

describe('Color test', () => {
	const
		parser = new StylusParser(),
		run = (ast: Tree, rule: IRule) => {
			const runner = new Runner(ast, (node) => {
				if (rule.checkNode && rule.isMatchType(node.nodeName)) {
					rule.checkNode(node);
				}
			});
			runner.visit(ast);
		};

	describe('Need uppercase notation', () => {
		it('Should check the AST has RGB node with wrong color notation', () => {
			const ast = parser.parse('.tab\n\tcolor: #ccc\n\tbackground-color #fff');

			const rule = new Color({
				conf: "uppercase"
			});

			run(ast, rule);

			expect(rule.errors.length).to.be.equal(2)
		});
		it('Should check the AST has RGB node with right color notation', () => {
			const ast = parser.parse('.tab\n\tcolor: #CCC');

			const rule = new Color({
				conf: "uppercase"
			});

			run(ast, rule);

			expect(rule.errors.length).to.be.equal(0)
		});
	});
	describe('Need lowercase notation', () => {
		it('Should check the AST has RGB node with right color notation', () => {
			const ast = parser.parse('.tab\n\tcolor: #ccc\n\tbackground-color #fff');

			const rule = new Color({
				conf: "lowercase"
			});

			run(ast, rule);

			expect(rule.errors.length).to.be.equal(0)
		});
		it('Should check the AST has RGB node with wrong color notation', () => {
			const ast = parser.parse('.tab\n\tcolor: #CCC');

			const rule = new Color({
				conf: "lowercase"
			});

			run(ast, rule);

			expect(rule.errors.length).to.be.equal(1)
		});
	});
});

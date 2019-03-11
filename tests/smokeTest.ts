import { Linter } from '../src/linter';
import { expect } from 'chai';

const
	wrongContent = `.tab\n\tcolor: #ccc`;

describe('Smoke test', () => {
	it('should work fine', () => {
		const linter = new Linter();
		linter.lint('./test.styl', wrongContent);

		const response = linter.reporter.response;

		expect(response.passed).to.be.false;
		expect(response.errors && response.errors.length).to.be.equal(3)
	});

	describe('Empty file test', () => {
		it('should work fine', () => {
			const linter = new Linter();
			linter.lint('./test.styl', '');

			const response = linter.reporter.response;

			expect(response.passed).to.be.true;
			expect(response.errors).to.be.equal(void(0))
		});
	});

	describe('Broken content file test', () => {
		it('should work fine', () => {
			const linter = new Linter();
			linter.lint('./test.styl', '.');

			const response = linter.reporter.response;

			expect(response.passed).to.be.false;
			expect(response.errors && response.errors.length).to.be.equal(1)
		});
		describe('Broken content 2', () => {
			it('should work fine', () => {
				const linter = new Linter();
				linter.lint('./test.styl', '.t');

				const response = linter.reporter.response;

				expect(response.passed).to.be.false;
				expect(response.errors && response.errors.length).to.be.equal(1)
			});
		});
	});
	describe('Try Syntax error', () => {
		describe('Get hash field', () => {
			it('should not return error', () => {
				const
					linter = new Linter();

				linter.lint('./test.styl','$p = {\n' +
					'\toptionColor: #CCC\n' +
					'}\n' +
					'.test\n' +
					'\tmargin-top $p.optionColor'
				);

				const response = linter.reporter.response;

				expect(response.passed).to.be.true;
			});
		});
		describe('Hash field with index', () => {
			it('should not return error', () => {
				const
					linter = new Linter();

				linter.lint('./test.styl','$colors = {\n' +
					'\twhite: #CCC #FFF #F00\n' +
					'}\n' +
					'$p = {\n' +
					'\toptionColor: $colors.white[0]\n' +
					'}\n' +
					'.b-checkbox-list\n' +
					'\tcolor $colors.white[1]'
				);

				const response = linter.reporter.response;

				expect(response.passed).to.be.true;
			});
		});
		describe('sss', () => {
			it('sss', () => {
				const
					linter = new Linter();
				linter.lint('./test.styl');
			});
		});
	});
});

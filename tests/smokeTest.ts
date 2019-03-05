import { Linter } from '../src/linter';
import { expect } from 'chai';

const
	wrongContent = `.tab\n\tcolor: #ccc`;

describe('Smoke test', () => {
	it('should work fine', () => {
		const linter = new Linter('./test.styl', wrongContent);
		linter.lint();

		const response = linter.reporter.response;

		expect(response.passed).to.be.false;
		expect(response.errors && response.errors.length).to.be.equal(3)
	});

	describe('Empty file test', () => {
		it('should work fine', () => {
			const linter = new Linter('./test.styl', '');
			linter.lint();

			const response = linter.reporter.response;

			expect(response.passed).to.be.true;
			expect(response.errors).to.be.equal(void(0))
		});
	});

	describe('Break content file test', () => {
		it('should work fine', () => {
			const linter = new Linter('./test.styl', '.');
			linter.lint();

			const response = linter.reporter.response;

			expect(response.passed).to.be.false;
			expect(response.errors && response.errors.length).to.be.equal(1)
		});
	});
	describe('Try Syntax error', () => {
		describe('Get hash field', () => {
			it('should not return error', () => {
				const
					linter = new Linter('./test.styl','$p = {\n' +
						'\toptionColor: #CCC\n' +
						'}\n' +
						'.test\n' +
						'\tmargin-top $p.optionColor'
					);
				linter.lint();

				const response = linter.reporter.response;

				expect(response.passed).to.be.true;
			});
		});
		describe('Hash field with index', () => {
			it('should not return error', () => {
				const
					linter = new Linter('./test.styl','$colors = {\n' +
						'\twhite: #CCC #FFF #F00\n' +
						'}\n' +
						'$p = {\n' +
						'\toptionColor: $colors.white[0]\n' +
						'}\n' +
						'.b-checkbox-list\n' +
						'\tcolor $colors.white[1]'
					);

				linter.lint();

				const response = linter.reporter.response;

				expect(response.passed).to.be.true;
			});
		});
		describe('sss', () => {
			it('sss', () => {
				const
					linter = new Linter('./test.styl');
				linter.lint();
			});
		});
	});
});

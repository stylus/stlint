import { Linter } from '../src/linter';
import { expect } from 'chai';
import { IMessage, IMessagePack } from '../src/core/types/message';

describe('Test ignore directives', () => {
	describe('Multiline', () => {
		it('should ignore error in disable block', () => {
			const linter = new Linter();

			linter.lint('./test.styl',
				'$p = {\n' +
				'\ta: #CCC\n' +
				'\tb: #ccc\n' +
				'\tc: 10px\n' +
				'}\n' +
				'.test\n' +
				'\tmargin-top 20px' +
				'\tcolor #ccc\n'
			);

			let response = linter.reporter.response;

			expect(response.passed).to.be.false;
			expect(response.errors && response.errors.length).to.be.equal(5);

			linter.reporter.reset();

			linter.lint('./test.styl',
				'$p = {\n' +
				'\ta: #CCC\n' +
				'\t// @stlint-disable\n' +
				'\tb: #ccc\n' +
				'\tc: 10px\n' +
				'\t// @stlint-enable\n' +
				'}\n' +
				'.test\n' +
				'\tmargin-top 20px' +
				'\t// @stlint-disable\n' +
				'\tcolor #ccc\n' +
				'\t// @stlint-enable\n'
			);

			response = linter.reporter.response;

			expect(response.passed).to.be.false;

			expect(response.errors && response.errors.length).to.be.equal(1);

		});
	});
	describe('One line', () => {
		it('should ignore error in line after @stlint-ignore directive', () => {
			const
				linter = new Linter();

			linter.lint('./test.styl',
				'$p = {\n' +
				'\ta: #CCC\n' +
				'\tb: #ccc\n' +
				'\tc: 10px\n' +
				'}\n' +
				'.test\n' +
				'\tmargin-top 20px\n' +
				'\tcolor #ccc\n' +
				'\tbackground-color #ddd\n'
			);

			let response = linter.reporter.response;

			expect(response.passed).to.be.false;
			expect(response.errors && response.errors.length).to.be.equal(7);

			linter.reporter.reset();

			linter.lint('./test.styl',
				'$p = {\n' +
				'\ta: #CCC\n' +
				'\t// @stlint-ignore\n' +
				'\tb: #ccc\n' + // 2 errors ignored
				'\tc: 10px\n' + // error
				'}\n' +
				'.test\n' +
				'\tmargin-top 20px\n' + // error
				'\t// @stlint-ignore\n' +
				'\tcolor #ccc\n' + // ignored
				'\tbackground-color #ddd\n' // 2 errors
			);

			response = linter.reporter.response;

			expect(response.passed).to.be.false;
			expect(response.errors && response.errors.length).to.be.equal(4);
		});
		describe('Ignore line in order rule', () => {
			it('should ignore error in line after @stlint-ignore directive', () => {
				const
					linter = new Linter(),
					getOrderError = (errors?: IMessagePack[]): IMessage => {
						if (!errors) {
							throw new Error('We do not have any errors');
						}

						const [error] = errors.filter((value) => value.message[0].rule === 'sortOrder');

						if (!error || !error.message || !error.message[0]) {
							throw new Error('We do not have sortOrder error');
						}

						return error && error.message && error.message[0];
					};

				linter.lint('./test.styl',
					'.test\n' +
					'\tborder 10px\n' +
					'\tmax-height $headerHeight\n' +
					'\tcolor red\n' +
					'\tmargin-bottom 10px\n'
				);

				let response = linter.reporter.response;

				expect(response.passed).to.be.false;
				expect(response.errors && response.errors.length).to.be.equal(3);

				let orderError = getOrderError(response.errors);

				expect(orderError.line).to.be.equal(2);

				linter.reporter.reset();

				linter.lint('./test.styl',
					'.test\n' +
					'\t// @stlint-ignore\n' +
					'\tborder 10px\n' +
					'\tmax-height $headerHeight\n' +
					'\tcolor red\n' +
					'\tmargin-bottom 10px\n'
				);

				response = linter.reporter.response;

				expect(response.passed).to.be.false;

				expect(response.errors && response.errors.length).to.be.equal(2);

				orderError = getOrderError(response.errors);

				expect(orderError.line).to.be.equal(5);
			});
		});
	});
});

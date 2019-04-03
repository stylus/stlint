import { Linter } from '../src/linter';
import { expect } from 'chai';

describe('Test extends options', () => {
	describe('Replace order array in sortOrder rule', () => {
		it('Should replace order array', () => {
			const linter = new Linter({
				rules: {
					sortOrder: {
						conf: 'grouped',
						order: [
							'padding',
							'background',
							'absolute',
							'left',
							'color',
							'outline'
						]
					}
				},
				grep: 'sortOrder',
				reporter: 'silent',
				fix: true
			});

			expect((<any>linter.config.rules.sortOrder).order).to.be.deep.equal([
				'padding',
				'background',
				'absolute',
				'left',
				'color',
				'outline'
			]);

			expect(linter.config.grep).to.be.equal('sortOrder');
			expect(linter.config.reporter).to.be.equal('silent');
			expect(linter.config.fix).to.be.true;
		});
	});
});

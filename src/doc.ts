import { Documentator } from './core/documentator/documentator';

export const doc = (options = {}) => {
	const documentator = new Documentator(options);
	documentator.generate();
};

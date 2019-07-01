export const doc = (options = {}) => {
	const {Documentator} = require('./core/documentator/documentator');
	const documentator = new Documentator(options);
	documentator.generate();
};

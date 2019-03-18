/**
 * Check if element is simple plaint object
 *
 * @param obj
 */
export const isPlainObject = (obj: unknown): obj is object => {
	if (typeof obj !== 'object') {
		return false;
	}

	return !(
		obj &&
		obj.constructor &&
		!{}.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')
	);
};

import { isPlainObject } from './isPlainObject';

export const unwrapObject = (obj: Dictionary, prefix: string[] = []) => {
	let result: Dictionary<string> = {};

	Object.keys(obj).forEach((_key) => {
		const
			key = prefix.concat([_key]).join('.'),
			item = obj[_key];

		if (Array.isArray(item)) {
			item.forEach((value: string, index: number) => {
				result[value] = `${key}[${index}]`;
			});

		} else if (isPlainObject(item)) {
			result = {...result, ...unwrapObject(item, prefix.concat([_key]))};

		} else {
			result[item] = key;
		}
	});

	return result;
};

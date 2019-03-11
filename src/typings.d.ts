declare module 'stylus-pro/lib/parser';
declare module 'stylus-pro/lib/utils';
declare module 'stylus-pro/lib/visitor/evaluator';
declare module 'stylus-pro/lib/visitor/normalizer';
declare module 'strip-json-comments';
declare module 'columnify';
declare module 'chalk';

declare module "*.json" {
	const value: any;
	export default value;
}


type Dictionary<T = any> = {[key: string]: T};

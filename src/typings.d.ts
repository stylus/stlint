declare module 'stylus/lib/parser';
declare module 'strip-json-comments';
declare module 'columnify';
declare module 'chalk';
declare module 'node-watch';

declare module "*.json" {
	const value: any;
	export default value;
}


type Dictionary<T = any> = {[key: string]: T};

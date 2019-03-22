import { ErrorArray, IRule } from './types/rule';
import { IState } from './types/state';
import { lcfirst } from './helpers/lcfirst';
import { ILine } from './types/line';
import { IContext } from './types/context';
import { INode } from './types/ast/node';
import { Ident, Obj, Value } from './ast/index';
import { objTohash } from './helpers/objToHash';
import { unwrapObject } from './helpers/unwrapObject';

const initContext: () => IContext  = () => ({
	hashDeep: 0,
	inHash: false,
	inComment: false,
	vars: {},
	valueToVar: {}
});

const
	hashStartRe = /\$?[\w]+\s*[=:]\s*{/,
	hashEndRe = /}/,
	startMultiComment = /\/\*/,
	endMultiComment = /\*\//;

export class Rule<T extends IState = IState> implements IRule<T> {

	get context(): IContext {
		return Rule.context;
	}

	/**
	 * Rule name
	 */
	get name(): string {
		return lcfirst(this.constructor.name);
	}

	static clearContext(): void {
		Rule.context = initContext();
	}

	static getContext(): IContext {
		return Rule.context;
	}

	/**
	 *
	 * @param node
	 */
	static beforeCheckNode(node: INode): void {
		if (node instanceof Ident && node.value instanceof Value) {
			const isHash = node.value.nodes && node.value.nodes.length && node.value.nodes[0] instanceof Obj;

			this.context.vars[node.key] = isHash ? objTohash(node.value.nodes[0]) : node.value.nodes[0].toString();

			this.context.valueToVar = {...this.context.valueToVar, ...unwrapObject(this.context.vars)};
		}
	}

	/**
	 * Check hash object etc
	 * @param line
	 */
	static beforeCheckLine(line: ILine): void {
		if (hashStartRe.test(line.line)) {
			Rule.context.hashDeep += 1;
		}

		Rule.context.inHash = Rule.context.hashDeep > 0;

		if (Rule.context.hashDeep && hashEndRe.test(line.line)) {
			Rule.context.hashDeep -= 1;
		}

		if (startMultiComment.test(line.line)) {
			Rule.context.inComment = true;
		}

		if (Rule.context.inComment) {
			const prev = line.prev();

			if (prev && endMultiComment.test(prev.line)) {
				Rule.context.inComment = false;
			}
		}
	}

	private static context: IContext = initContext();

	nodesFilter: string[] | null = null;

	state: T = <T>{
		conf: 'always',
		enabled: true
	};

	cache: Dictionary = {};

	hashErrors: Dictionary<boolean> = {};
	errors: ErrorArray[] = [];

	constructor(readonly conf: T) {
		if (typeof conf !== 'boolean') {
			if (Array.isArray(conf)) {
				this.state.conf = conf[0];
				this.state.enabled = conf[1] === undefined || Boolean(conf[1]);
			} else {
				this.state = {...this.state, ...conf};

				if (conf.enabled === undefined) {
					this.state.enabled = true;
				}
			}
		} else {
			this.state.enabled = conf;
		}
	}

	clearErrors(): void {
		this.errors.length = 0;
		this.hashErrors = {};
	}

	clearContext(): void {
		Rule.clearContext();
	}

	/**
	 * Add error message in list
	 *
	 * @param message
	 * @param line
	 * @param start
	 * @param end
	 * @param fix
	 * @param endLine
	 */
	msg(
		message: string,
		line: number = 1,
		start: number = 1,
		end: number = 1,
		fix: null | string = null,
		endLine: number = line
	): void {
		const
			error: ErrorArray = [this.name, message, line, start, end, fix, endLine],
			hash = error.join('&');

		if (!this.hashErrors[hash]) {
			this.hashErrors[hash] = true;
			this.errors.push(error);
		}
	}

	/**
	 * Check type included in filter
	 * @param type
	 */
	isMatchType(type: string): boolean {
		return !this.nodesFilter || this.nodesFilter.includes(type);
	}
}

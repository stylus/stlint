import { ErrorArray, IRule } from "./types/rule";
import { IState } from "./types/state";
import { lcfirst } from "./helpers/lcfirst";
import { ILine } from "./types/line";
import { IContext } from "./types/context";
import { INode } from "./types/ast/node";
import { Ident, Obj, Value } from "./ast";
import { objTohash } from "./helpers/objToHash";

const initContext: IContext  = {
	hashDeep: 0,
	inHash: false,
	inComment: false,
	vars: {}
};

const
	hashStartRe = /\$?[\w]+\s*[=:]\s*{/,
	hashEndRe = /}/,
	startMultiComment = /\/\*/,
	endMultiComment = /\*\//;

export class Rule<T extends IState = IState> implements IRule<T> {
	state: T = <T>{
		conf: 'always',
		enabled: true
	};

	cache: Dictionary = {};

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

	private static context: IContext = {...initContext};

	get context(): IContext {
		return Rule.context;
	}

	static clearContext() {
		Rule.context = {...initContext};
	}

	static getContext() {
		return Rule.context;
	}

	/**
	 *
	 * @param node
	 */
	static beforeCheckNode(node: INode) {
		if (node instanceof Ident && node.value instanceof Value) {
			if (node.value.nodes && node.value.nodes.length && node.value.nodes[0] instanceof Obj) {
				const key = node.key;
				Rule.context.vars[key] = objTohash(node.value.nodes[0]);
			} else {
				Rule.context.vars[node.key] = node.value.nodes[0].toString();
			}
		}
	}

	/**
	 * Check hash object etc
	 * @param line
	 */
	static beforeCheckLine(line: ILine) {
		if (hashStartRe.test(line.line)) {
			Rule.context.hashDeep +=1;
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

	/**
	 * Rule name
	 */
	get name(): string {
		return lcfirst(this.constructor.name);
	}

	nodesFilter: string[] | null = null;

	hashErrors: Dictionary<boolean> = {};
	errors: ErrorArray[] = [];

	clearErrors() {
		this.errors.length = 0;
		this.hashErrors = {};
	}

	clearContext() {
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
	 */
	msg(message: string, line: number = 1, start: number = 1, end: number = 1, fix: null | string = null) {
		const
			error: ErrorArray = [this.name, message, line, start, end, fix],
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

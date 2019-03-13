import { IRule } from "./types/rule";
import { IState, State } from "./types/state";
import { lcfirst } from "./helpers/lcfirst";
import { ILine } from "./types/line";
import { IContext } from "./types/context";

const initContext: IContext  = {
	hashDeep: 0,
	inHash: false,
	inComment: false,
};


type ErrorArray = [string, string, number, number, number];

const
	hashStartRe = /\$?[\w]+\s*[=:]\s*{/,
	hashEndRe = /}/,
	startMultyComment = /\/\*/,
	endMultyComment = /\*\//;

export abstract class Rule<T extends IState = IState> implements IRule<T> {
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
			}
		} else {
			this.state.enabled = conf;
		}
	}

	private static context: IContext = {...initContext};
	get context(): IContext {
		return Rule.context;
	}
	clearContext() {
		Rule.clearContext();
	}
	static clearContext() {
		Rule.context = {...initContext};
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

		if (startMultyComment.test(line.line)) {
			Rule.context.inComment = true;
		}

		if (Rule.context.inComment) {
			const prev = line.prev();

			if (prev && endMultyComment.test(prev.line)) {
				Rule.context.inComment = false;
			}
		}
	}

	get name(): string {
		return lcfirst(this.constructor.name);
	}

	nodesFilter: string[] | null = null;

	hashErrors: Dictionary<boolean> = {};
	errors: ErrorArray[] = [];
	clearErrors(){
		this.errors.length = 0;
		this.hashErrors = {};
	}

	msg(message: string, line: number = 1, start: number = 0, end: number = 0) {
		const
			error: ErrorArray = [this.name, message, line, start, end],
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

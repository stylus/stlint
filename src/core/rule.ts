import { IRule } from "./types/rule";
import { IState, modes } from "./types/state";
import { lcfirst } from "./helpers/lcfirst";
import {ILine} from "./types/line";

const initContext = {
	hashDeep: 0,
	inHash: false,
};

const hashStartRe = /\$?[\w]+\s*[=:]\s*\{/;
const hashEndRe = /}/;

export abstract class Rule implements IRule {
	state: IState = {
		conf: 'always',
		enabled: true
	};

	private static context: Dictionary = {...initContext};
	get context(): Dictionary {
		return Rule.context;
	}
	clearContext() {
		Rule.context = {...initContext};
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
	}

	get name(): string {
		return lcfirst(this.constructor.name);
	}

	nodesFilter: string[] | null = null;

	constructor(readonly conf: IState | [ modes, boolean | void ]) {
		if (conf) {
			if (Array.isArray(conf)) {
				this.state.conf = conf[0];
				this.state.enabled = conf[1] === undefined || Boolean(conf[1]);
			} else {
				this.state = {...this.state, ...conf};
			}
		} else {
			this.state.enabled = false;
		}
	}

	errors: [string, number, number, number][] = [];

	msg(message: string, line: number = 1, start: number = 0, end: number = 0) {
		this.errors.push([this.name + ': ' + message, line, start, end]);
	}

	isMatchType(type: string): boolean {
		return !this.nodesFilter || this.nodesFilter.includes(type);
	}
}

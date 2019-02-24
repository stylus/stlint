import { IRule } from "./types/rule";
import { IState, modes } from "./types/state";
import { lcfirst } from "./helpers/lcfirst";

export abstract class Rule implements IRule {
	state: IState = {
		conf: 'always',
		enabled: true
	};

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
	msg(message: string, line: number, start: number = 0, end: number = 0) {
		this.errors.push([message, line, start, end]);
	}

	isMatchType(type: string): boolean {
		return !this.nodesFilter || this.nodesFilter.includes(type);
	}
}

import { ICheck } from "./types/check";
import { IReporter } from "./types/reporter";
import * as checks from "../checks";
import { INode } from "./types/ast/node";
import { Visitor } from "./visitor";

export class Checker {
	readonly rulesList: ICheck[];

	constructor(readonly reporter: IReporter) {
		this.rulesList = Object.keys(<any>checks)
			.filter((key) => typeof (<any>checks)[key] === 'function')
			.map((key: string) => {
				return new (<any>checks)[key](reporter);
			});
	}

	private check = (root: INode) => {
		const type = root.nodeName;

		this.rulesList.forEach((rule: ICheck) => {
			if (rule.isMatchType(type)) {
				rule.process(<INode>root);
			}
		})
	};

	checkRules(ast: INode) {
		// visitor.run(ast, ast, this.check);
	}
}

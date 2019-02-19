import { Expression } from "./Expression";
import {Import} from "./types/Import";

export interface Node {
	nodes: Array<Import | String>;
	lineno: number;
	column: number;
	filename: number;
	path: Expression;
}

import { Node } from "./node";
import { INode } from "../types/ast/node";

export class Feature extends Node {
	segments: INode[] = [];
	toString(): string {
		return this.segments.join('');
	}
}

import { Node } from "./node";
import { INode } from "../types/ast/node";

export class Member extends Node {
	left: INode | null = null;
	right: INode | null = null;
}

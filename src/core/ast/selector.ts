import { Node } from "./node";
import { INode } from "../types/ast/node";

export class Selector extends Node {
	segments: INode[] = [];
}

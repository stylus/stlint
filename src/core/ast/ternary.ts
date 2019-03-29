import { Node } from './node';
import { Ident } from './ident';
import { Value } from './value';

export class Ternary extends Node {
	cond!: Ident;
	trueExpr!: Value;
	falseExpr!: Value;
}

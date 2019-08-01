export interface IContext {
	hashDeep: number
	inHash: boolean
	inComment: boolean
	openBracket: boolean
	vars: Dictionary
	valueToVar: Dictionary
}

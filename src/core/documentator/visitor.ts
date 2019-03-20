// @ts-ignore
import * as ts from 'typescript';

/**
 * Visit all ts nodes
 *
 * @param callback
 * @param node
 */
export function visit(callback: (node: ts.Node) => void, node: ts.Node): void {
	callback(node);

	ts.forEachChild(node, visit.bind(null, callback));
}

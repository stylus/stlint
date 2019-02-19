export class Visitor {
	run(root, parent = root, callback: (node) => void): void {
		if (root.__visited) {
			return;
		}

		root.parent = parent;
		root.__visited = true;

		['nodes', 'segments'].forEach(key => {
			if (root[key]) {
				root[key].forEach((node) => this.run(node, root, callback));
			}
		});

		['path', 'val', 'expr', 'block'].forEach(key => {
			if (root[key] && typeof root[key] === 'object') {
				this.run(root[key], root, callback);
			}
		});

		if (root.vals) {
			Object.keys(root.vals).forEach((key) => {
				this.run(root.vals[key], root, callback);
			});
		}

		callback(root);
	}
}

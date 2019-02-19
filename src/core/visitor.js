"use strict";
exports.__esModule = true;
var Visitor = /** @class */ (function () {
    function Visitor() {
    }
    Visitor.prototype.run = function (root, parent, callback) {
        var _this = this;
        if (parent === void 0) { parent = root; }
        if (root.__visited) {
            return;
        }
        root.parent = parent;
        root.__visited = true;
        ['nodes', 'segments'].forEach(function (key) {
            if (root[key]) {
                root[key].forEach(function (node) { return _this.run(node, root, callback); });
            }
        });
        ['path', 'val', 'expr', 'block'].forEach(function (key) {
            if (root[key] && typeof root[key] === 'object') {
                _this.run(root[key], root, callback);
            }
        });
        if (root.vals) {
            Object.keys(root.vals).forEach(function (key) {
                _this.run(root.vals[key], root, callback);
            });
        }
        callback(root);
    };
    return Visitor;
}());
exports.Visitor = Visitor;

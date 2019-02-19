"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var rule_1 = require("../core/rule");
var Color = /** @class */ (function (_super) {
    __extends(Color, _super);
    function Color() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodesFilter = ['rgba'];
        return _this;
    }
    Color.prototype.isHasLowerCase = function (value) {
        return /[a-z]/.test(value);
    };
    Color.prototype.process = function (node) {
        console.log(node);
        if (node.raw && this.isHasLowerCase(node.raw)) {
            this.msg('Only lowercase HEX format', node.lineno);
        }
    };
    return Color;
}(rule_1.Rule));
exports.Color = Color;

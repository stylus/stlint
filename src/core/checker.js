"use strict";
exports.__esModule = true;
var rules = require("../rules");
var visitor_1 = require("./visitor");
var Checker = /** @class */ (function () {
    function Checker(reporter) {
        var _this = this;
        this.reporter = reporter;
        this.check = function (root) {
            var nodeName = root.nodeName;
            _this.rulesList.forEach(function (rule) {
                if (rule.isMatchType(nodeName)) {
                    rule.process(root);
                }
            });
        };
        this.rulesList = Object.keys(rules)
            .filter(function (key) { return typeof rules[key] === 'function'; })
            .map(function (key) {
            return new rules[key](reporter);
        });
    }
    Checker.prototype.checkRules = function (ast) {
        var visitor = new visitor_1.Visitor();
        visitor.run(ast, ast, this.check);
    };
    return Checker;
}());
exports.Checker = Checker;

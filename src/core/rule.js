"use strict";
exports.__esModule = true;
var Rule = /** @class */ (function () {
    function Rule(reporter) {
        this.nodesFilter = null;
        this.reporter = reporter;
    }
    Rule.prototype.msg = function (message, line, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = 0; }
        this.reporter.add(message, line, start, end);
    };
    Rule.prototype.isMatchType = function (type) {
        return !this.nodesFilter || this.nodesFilter.indexOf(type) !== -1;
    };
    return Rule;
}());
exports.Rule = Rule;

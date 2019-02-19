"use strict";
exports.__esModule = true;
var Reporter = /** @class */ (function () {
    function Reporter(path) {
        this.path = path;
        this.messages = [];
    }
    /**
     *
     * @param message
     * @param line
     * @param start
     * @param end
     */
    Reporter.prototype.add = function (message, line, start, end) {
        if (line === void 0) { line = 0; }
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = 0; }
        this.messages.push({
            descr: message,
            path: this.path,
            line: line,
            endline: line,
            start: start,
            end: end
        });
    };
    Reporter.prototype.display = function () {
        console.log(JSON.stringify({
            errors: [{
                    message: this.messages
                }]
        }));
    };
    return Reporter;
}());
exports.Reporter = Reporter;

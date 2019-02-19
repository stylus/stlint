"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var Parser = require("stylus/lib/parser");
var utils = require("stylus/lib/utils");
var StylusParser = /** @class */ (function () {
    function StylusParser() {
        this.options = {};
    }
    /**
     *
     * @param {string} filename
     * @returns {*|Node}
     */
    StylusParser.prototype.parse = function (filename) {
        var content = fs_1.readFileSync(filename, 'utf8');
        var parser = new Parser(content, this.options);
        try {
            return parser.parse();
        }
        catch (err) {
            var options = {
                input: '',
                filename: '',
                lineno: '',
                column: ''
            };
            options.input = err.input;
            options.filename = filename;
            err.lineno = options.lineno = err.lineno || parser.lexer.lineno;
            options.column = err.column || parser.lexer.column;
            throw utils.formatException(err, options);
        }
    };
    return StylusParser;
}());
exports.StylusParser = StylusParser;

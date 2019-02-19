"use strict";
exports.__esModule = true;
var reporter_1 = require("./src/core/reporter");
var parser_1 = require("./src/core/parser");
var path_1 = require("path");
var fs_1 = require("fs");
var checker_1 = require("./src/core/checker");
var StylusLinter = function (path) {
    path = path_1.resolve(path);
    var reporter = new reporter_1.Reporter(path);
    var parser = new parser_1.StylusParser();
    var checker = new checker_1.Checker(reporter);
    try {
        if (!fs_1.existsSync(path)) {
            throw new Error('File not exists');
        }
        var ast = parser.parse(path);
        checker.checkRules(ast);
        fs_1.writeFileSync('test.json', JSON.stringify(ast, null, 2), 'utf-8');
    }
    catch (e) {
        reporter.add(e.message, e.lineno);
    }
    reporter.display();
};
module.exports = StylusLinter;

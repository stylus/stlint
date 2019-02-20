(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var reporter_1 = __webpack_require__(/*! ./src/core/reporter */ "./src/core/reporter.ts");
var parser_1 = __webpack_require__(/*! ./src/core/parser */ "./src/core/parser.ts");
var path_1 = __webpack_require__(/*! path */ "path");
var fs_1 = __webpack_require__(/*! fs */ "fs");
var checker_1 = __webpack_require__(/*! ./src/core/checker */ "./src/core/checker.ts");
var StylusLinter = function (path, content) {
    path = path_1.resolve(path);
    var reporter = new reporter_1.Reporter(path);
    var parser = new parser_1.StylusParser();
    var checker = new checker_1.Checker(reporter);
    // writeFileSync('test.json', JSON.stringify(ast, null, 2), 'utf-8')
    try {
        fs_1.writeFileSync(path_1.resolve('./test.txt'), content, 'utf-8');
        if (!fs_1.existsSync(path)) {
            throw new Error('File not exists');
        }
        var ast = parser.parse(path, content);
        checker.checkRules(ast);
    }
    catch (e) {
        reporter.add(e.message, e.lineno);
    }
    reporter.display();
};
module.exports = StylusLinter;


/***/ }),

/***/ "./src/core/checker.ts":
/*!*****************************!*\
  !*** ./src/core/checker.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var rules = __webpack_require__(/*! ../rules */ "./src/rules/index.ts");
var visitor_1 = __webpack_require__(/*! ./visitor */ "./src/core/visitor.ts");
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


/***/ }),

/***/ "./src/core/parser.ts":
/*!****************************!*\
  !*** ./src/core/parser.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __webpack_require__(/*! fs */ "fs");
var Parser = __webpack_require__(/*! stylus/lib/parser */ "stylus/lib/parser");
var utils = __webpack_require__(/*! stylus/lib/utils */ "stylus/lib/utils");
var StylusParser = /** @class */ (function () {
    function StylusParser() {
        this.options = {};
    }
    /**
     * @param {string} filename
     * @param {string} [content]
     * @returns {*|Node}
     */
    StylusParser.prototype.parse = function (filename, content) {
        if (!content || !content.length) {
            content = fs_1.readFileSync(filename, 'utf8');
        }
        var parser = new Parser(content, this.options);
        try {
            return parser.parse();
        }
        catch (err) {
            var options = {
                input: '',
                filename: '',
                lineno: '',
                column: '',
            };
            options.input = err.input;
            options.filename = filename;
            err.lineno = options.lineno = err.lineno || parser.lexer.lineno || 0;
            options.column = err.column || parser.lexer.column;
            throw utils.formatException(err, options);
        }
    };
    return StylusParser;
}());
exports.StylusParser = StylusParser;


/***/ }),

/***/ "./src/core/reporter.ts":
/*!******************************!*\
  !*** ./src/core/reporter.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __webpack_require__(/*! fs */ "fs");
var Reporter = /** @class */ (function () {
    function Reporter(path) {
        this.path = path;
        this.errors = [];
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
        this.errors.push({
            descr: message,
            path: this.path,
            line: line,
            endline: line,
            start: start,
            end: end
        });
    };
    Reporter.prototype.display = function () {
        var response = {
            passed: true
        };
        if (this.errors.length) {
            response.passed = false;
            response.errors = [{
                    message: this.errors
                }];
        }
        console.log(JSON.stringify(response));
        fs_1.writeFileSync('./response.txt', JSON.stringify(response), 'utf-8');
    };
    return Reporter;
}());
exports.Reporter = Reporter;


/***/ }),

/***/ "./src/core/rule.ts":
/*!**************************!*\
  !*** ./src/core/rule.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ }),

/***/ "./src/core/visitor.ts":
/*!*****************************!*\
  !*** ./src/core/visitor.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ }),

/***/ "./src/rules/color.ts":
/*!****************************!*\
  !*** ./src/rules/color.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
var rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
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
        if (node.raw && this.isHasLowerCase(node.raw)) {
            this.msg('Only lowercase HEX format', node.lineno);
        }
    };
    return Color;
}(rule_1.Rule));
exports.Color = Color;


/***/ }),

/***/ "./src/rules/index.ts":
/*!****************************!*\
  !*** ./src/rules/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./color */ "./src/rules/color.ts"));


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "stylus/lib/parser":
/*!************************************!*\
  !*** external "stylus/lib/parser" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stylus/lib/parser");

/***/ }),

/***/ "stylus/lib/utils":
/*!***********************************!*\
  !*** external "stylus/lib/utils" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stylus/lib/utils");

/***/ })

/******/ });
});
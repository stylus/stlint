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
StylusLinter('./test.styl');


/***/ }),

/***/ "./src/checks/color.ts":
/*!*****************************!*\
  !*** ./src/checks/color.ts ***!
  \*****************************/
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
var check_1 = __webpack_require__(/*! ../core/check */ "./src/core/check.ts");
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
        if (node.raw && this.isHasLowerCase(node.nodeName)) {
            this.msg('Only lowercase HEX format', node.lineno);
        }
    };
    return Color;
}(check_1.Check));
exports.Color = Color;


/***/ }),

/***/ "./src/checks/index.ts":
/*!*****************************!*\
  !*** ./src/checks/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./color */ "./src/checks/color.ts"));


/***/ }),

/***/ "./src/core/ast/block.ts":
/*!*******************************!*\
  !*** ./src/core/ast/block.ts ***!
  \*******************************/
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
var node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Block;
}(node_1.Node));
exports.Block = Block;


/***/ }),

/***/ "./src/core/ast/group.ts":
/*!*******************************!*\
  !*** ./src/core/ast/group.ts ***!
  \*******************************/
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
var node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Group;
}(node_1.Node));
exports.Group = Group;


/***/ }),

/***/ "./src/core/ast/index.ts":
/*!*******************************!*\
  !*** ./src/core/ast/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./node */ "./src/core/ast/node.ts"));
__export(__webpack_require__(/*! ./selector */ "./src/core/ast/selector.ts"));
__export(__webpack_require__(/*! ./tree */ "./src/core/ast/tree.ts"));
__export(__webpack_require__(/*! ./group */ "./src/core/ast/group.ts"));
__export(__webpack_require__(/*! ./block */ "./src/core/ast/block.ts"));
__export(__webpack_require__(/*! ./property */ "./src/core/ast/property.ts"));
__export(__webpack_require__(/*! ./literal */ "./src/core/ast/literal.ts"));


/***/ }),

/***/ "./src/core/ast/literal.ts":
/*!*********************************!*\
  !*** ./src/core/ast/literal.ts ***!
  \*********************************/
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
var node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    function Literal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Literal;
}(node_1.Node));
exports.Literal = Literal;


/***/ }),

/***/ "./src/core/ast/node.ts":
/*!******************************!*\
  !*** ./src/core/ast/node.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(lineno, column) {
        this.parent = null;
        this.lineno = 0;
        this.column = 0;
        this.nodes = [];
        this.lineno = lineno;
        this.column = column;
    }
    Object.defineProperty(Node.prototype, "nodeName", {
        get: function () {
            return this.constructor.name.toLowerCase();
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.append = function (node, listField) {
        if (listField === void 0) { listField = 'nodes'; }
        var list = this[listField];
        if (list && Array.isArray(list)) {
            list.push(node);
        }
        node.parent = this;
    };
    return Node;
}());
exports.Node = Node;


/***/ }),

/***/ "./src/core/ast/property.ts":
/*!**********************************!*\
  !*** ./src/core/ast/property.ts ***!
  \**********************************/
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
var node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
var Property = /** @class */ (function (_super) {
    __extends(Property, _super);
    function Property() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Property;
}(node_1.Node));
exports.Property = Property;


/***/ }),

/***/ "./src/core/ast/selector.ts":
/*!**********************************!*\
  !*** ./src/core/ast/selector.ts ***!
  \**********************************/
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
var node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
var Selector = /** @class */ (function (_super) {
    __extends(Selector, _super);
    function Selector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.segments = [];
        return _this;
    }
    return Selector;
}(node_1.Node));
exports.Selector = Selector;


/***/ }),

/***/ "./src/core/ast/tree.ts":
/*!******************************!*\
  !*** ./src/core/ast/tree.ts ***!
  \******************************/
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
var node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
var Tree = /** @class */ (function (_super) {
    __extends(Tree, _super);
    function Tree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.parent = null;
        return _this;
    }
    return Tree;
}(node_1.Node));
exports.Tree = Tree;


/***/ }),

/***/ "./src/core/check.ts":
/*!***************************!*\
  !*** ./src/core/check.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Check = /** @class */ (function () {
    function Check(reporter) {
        this.nodesFilter = null;
        this.reporter = reporter;
    }
    Check.prototype.msg = function (message, line, start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = 0; }
        this.reporter.add(message, line, start, end);
    };
    Check.prototype.isMatchType = function (type) {
        return !this.nodesFilter || this.nodesFilter.includes(type);
    };
    return Check;
}());
exports.Check = Check;


/***/ }),

/***/ "./src/core/checker.ts":
/*!*****************************!*\
  !*** ./src/core/checker.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var checks = __webpack_require__(/*! ../checks */ "./src/checks/index.ts");
var Checker = /** @class */ (function () {
    function Checker(reporter) {
        var _this = this;
        this.reporter = reporter;
        this.check = function (root) {
            var type = root.nodeName;
            _this.rulesList.forEach(function (rule) {
                if (rule.isMatchType(type)) {
                    rule.process(root);
                }
            });
        };
        this.rulesList = Object.keys(checks)
            .filter(function (key) { return typeof checks[key] === 'function'; })
            .map(function (key) {
            return new checks[key](reporter);
        });
    }
    Checker.prototype.checkRules = function (ast) {
        // visitor.run(ast, ast, this.check);
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
var Evaluator = __webpack_require__(/*! stylus/lib/visitor/evaluator */ "stylus/lib/visitor/evaluator");
var Normalizer = __webpack_require__(/*! stylus/lib/visitor/normalizer */ "stylus/lib/visitor/normalizer");
var utils = __webpack_require__(/*! stylus/lib/utils */ "stylus/lib/utils");
var translator_1 = __webpack_require__(/*! ./translator */ "./src/core/translator.ts");
var StylusParser = /** @class */ (function () {
    function StylusParser() {
        this.options = {};
    }
    /**
     * @param {string} filename
     * @param {string} [content]
     * @returns {Tree}
     */
    StylusParser.prototype.parse = function (filename, content) {
        if (!content || !content.length) {
            content = fs_1.readFileSync(filename, 'utf8');
        }
        var parser = new Parser(content, this.options);
        try {
            var stylusAST = parser.parse();
            // evaluate
            var evaluator = new Evaluator(stylusAST, this.options);
            stylusAST = evaluator.evaluate();
            // normalize
            var normalizer = new Normalizer(stylusAST, this.options);
            stylusAST = normalizer.normalize();
            var translitor = new translator_1.Translator(stylusAST);
            return translitor.transpile();
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

/***/ "./src/core/translator.ts":
/*!********************************!*\
  !*** ./src/core/translator.ts ***!
  \********************************/
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
var visitor_1 = __webpack_require__(/*! ./visitor */ "./src/core/visitor.ts");
var ast_1 = __webpack_require__(/*! ./ast */ "./src/core/ast/index.ts");
var Translator = /** @class */ (function (_super) {
    __extends(Translator, _super);
    function Translator(stylusAST) {
        return _super.call(this, stylusAST) || this;
    }
    Translator.prototype.transpile = function () {
        return this.visit(this.root);
    };
    Translator.prototype.each = function (block, fn, key) {
        if (key === void 0) { key = 'nodes'; }
        var list = block[key];
        if (Array.isArray(list)) {
            for (var i = 0, len = list.length; i < len; ++i) {
                var node = list[i];
                var ret = this.visit(node);
                if (ret) {
                    fn(ret);
                }
            }
        }
    };
    /**
     * Объодим элементы корневого элемента
     * @param block
     */
    Translator.prototype.visitRoot = function (block) {
        var tree = new ast_1.Tree(block.lineno, block.column);
        this.each(block, function (ret) {
            tree.append(ret);
        });
        return tree;
    };
    Translator.prototype.visitBlock = function (block) {
        var node = new ast_1.Block(block.lineno, block.column);
        this.each(block, function (ret) {
            node.append(ret);
        });
        return node;
    };
    Translator.prototype.visitGroup = function (block) {
        var node = new ast_1.Group(block.lineno, block.column);
        this.each(block, function (ret) {
            node.append(ret);
        });
        return node;
    };
    Translator.prototype.visitSelector = function (block) {
        var node = new ast_1.Selector(block.lineno, block.column);
        this.each(block, function (ret) {
            node.append(ret, 'segments');
        }, 'segments');
        if (block.block) {
            node.append(this.visit(block.block));
        }
        return node;
    };
    Translator.prototype.visitProperty = function (block) {
        var node = new ast_1.Property(block.lineno, block.column);
        this.each(block, function (ret) {
            node.append(ret);
        });
        return node;
    };
    Translator.prototype.visitLiteral = function (block) {
        var node = new ast_1.Literal(block.lineno, block.column);
        console.log(block);
        return node;
    };
    return Translator;
}(visitor_1.Visitor));
exports.Translator = Translator;


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
    function Visitor(root) {
        this.root = root;
    }
    Visitor.prototype.visit = function (node) {
        var method = 'visit' + node.constructor.name;
        console.log(method);
        var fn = this[method];
        if (fn && typeof fn === 'function') {
            return fn.call(this, node);
        }
        return node;
    };
    return Visitor;
}());
exports.Visitor = Visitor;


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

/***/ }),

/***/ "stylus/lib/visitor/evaluator":
/*!***********************************************!*\
  !*** external "stylus/lib/visitor/evaluator" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stylus/lib/visitor/evaluator");

/***/ }),

/***/ "stylus/lib/visitor/normalizer":
/*!************************************************!*\
  !*** external "stylus/lib/visitor/normalizer" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stylus/lib/visitor/normalizer");

/***/ })

/******/ });
});
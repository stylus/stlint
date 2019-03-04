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
var linter_1 = __webpack_require__(/*! ./src/linter */ "./src/linter.ts");
var StylusLinter = function (path, content, options) {
    if (options === void 0) { options = {}; }
    var linter = new linter_1.Linter(path, content, options);
    linter.lint();
};
module.exports = StylusLinter;
// StylusLinter('./test.styl');


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isPlainObject_1 = __webpack_require__(/*! ./core/helpers/isPlainObject */ "./src/core/helpers/isPlainObject.ts");
var fs_1 = __webpack_require__(/*! fs */ "fs");
var stripJsonComments = __webpack_require__(/*! strip-json-comments */ "strip-json-comments");
var Config = /** @class */ (function () {
    function Config(options) {
        this.debug = false;
        this.reporter = 'default';
        this.defaultConfig = {
            semicolons: ['never'],
            colons: ['never'],
            color: ['uppercase'],
            leadingZero: ['always'],
            useBasis: ['always'],
        };
        this.config = '';
        this.extendsOption(options, this);
        if (!this.config) {
            this.config = process.cwd() + '/' + Config.FILE_CONFIG_NAME;
        }
        if (fs_1.existsSync(this.config)) {
            try {
                var customConfig = JSON.parse(stripJsonComments(fs_1.readFileSync(this.config, 'utf8')));
                if (customConfig) {
                    this.extendsOption(customConfig, this.defaultConfig);
                }
            }
            catch (_a) { }
        }
    }
    Config.getInstance = function (options) {
        if (!Config.__instance) {
            Config.__instance = new Config(options);
        }
        return Config.__instance;
    };
    Config.prototype.extendsOption = function (from, to) {
        var _this = this;
        Object.keys(from).forEach(function (key) {
            if (isPlainObject_1.isPlainObject(from[key]) && isPlainObject_1.isPlainObject(to[key])) {
                _this.extendsOption(from[key], to[key]);
            }
            else if (Array.isArray(from[key]) && Array.isArray(to[key])) {
                to[key] = to[key].map(function (val, index) {
                    return (from[key][index] !== undefined) ? from[key][index] : to[key][index];
                });
            }
            else {
                to[key] = from[key];
            }
        });
    };
    Config.FILE_CONFIG_NAME = '.stylusrc';
    Config.__instance = null;
    return Config;
}());
exports.Config = Config;


/***/ }),

/***/ "./src/core/ast/binop.ts":
/*!*******************************!*\
  !*** ./src/core/ast/binop.ts ***!
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
var BinOp = /** @class */ (function (_super) {
    __extends(BinOp, _super);
    function BinOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.left = null;
        _this.right = null;
        return _this;
    }
    return BinOp;
}(node_1.Node));
exports.BinOp = BinOp;


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

/***/ "./src/core/ast/call.ts":
/*!******************************!*\
  !*** ./src/core/ast/call.ts ***!
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
var Call = /** @class */ (function (_super) {
    __extends(Call, _super);
    function Call() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = '';
        return _this;
    }
    return Call;
}(node_1.Node));
exports.Call = Call;


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

/***/ "./src/core/ast/ident.ts":
/*!*******************************!*\
  !*** ./src/core/ast/ident.ts ***!
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
var property_1 = __webpack_require__(/*! ./property */ "./src/core/ast/property.ts");
var Ident = /** @class */ (function (_super) {
    __extends(Ident, _super);
    function Ident() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Ident;
}(property_1.Property));
exports.Ident = Ident;


/***/ }),

/***/ "./src/core/ast/import.ts":
/*!********************************!*\
  !*** ./src/core/ast/import.ts ***!
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
var node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
var Import = /** @class */ (function (_super) {
    __extends(Import, _super);
    function Import() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = '';
        return _this;
    }
    return Import;
}(node_1.Node));
exports.Import = Import;


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
__export(__webpack_require__(/*! ./value */ "./src/core/ast/value.ts"));
__export(__webpack_require__(/*! ./rgb */ "./src/core/ast/rgb.ts"));
__export(__webpack_require__(/*! ./ident */ "./src/core/ast/ident.ts"));
__export(__webpack_require__(/*! ./import */ "./src/core/ast/import.ts"));
__export(__webpack_require__(/*! ./obj */ "./src/core/ast/obj.ts"));
__export(__webpack_require__(/*! ./unit */ "./src/core/ast/unit.ts"));
__export(__webpack_require__(/*! ./call */ "./src/core/ast/call.ts"));
__export(__webpack_require__(/*! ./member */ "./src/core/ast/member.ts"));
__export(__webpack_require__(/*! ./binop */ "./src/core/ast/binop.ts"));


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
    function Literal(block, val) {
        var _this = _super.call(this, block) || this;
        _this.val = '';
        _this.val = val;
        return _this;
    }
    Literal.prototype.toString = function () {
        return this.val;
    };
    return Literal;
}(node_1.Node));
exports.Literal = Literal;


/***/ }),

/***/ "./src/core/ast/member.ts":
/*!********************************!*\
  !*** ./src/core/ast/member.ts ***!
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
var node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.left = null;
        _this.right = null;
        return _this;
    }
    return Member;
}(node_1.Node));
exports.Member = Member;


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
    function Node(block) {
        this.parent = null;
        this.lineno = 0;
        this.column = 0;
        this.nodes = [];
        this.source = null;
        this.value = '';
        this.lineno = block.lineno;
        this.column = block.column;
        this.source = block;
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
        if (list && Array.isArray(list) && node instanceof Node) {
            list.push(node);
        }
        node.parent = this;
    };
    Node.prototype.toString = function () {
        return this.value ? this.value.toString() : '';
    };
    return Node;
}());
exports.Node = Node;


/***/ }),

/***/ "./src/core/ast/obj.ts":
/*!*****************************!*\
  !*** ./src/core/ast/obj.ts ***!
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
var node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
var Obj = /** @class */ (function (_super) {
    __extends(Obj, _super);
    function Obj() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Obj;
}(node_1.Node));
exports.Obj = Obj;


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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = '';
        _this.value = null;
        return _this;
    }
    return Property;
}(node_1.Node));
exports.Property = Property;


/***/ }),

/***/ "./src/core/ast/rgb.ts":
/*!*****************************!*\
  !*** ./src/core/ast/rgb.ts ***!
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
var unit_1 = __webpack_require__(/*! ./unit */ "./src/core/ast/unit.ts");
var RGB = /** @class */ (function (_super) {
    __extends(RGB, _super);
    function RGB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RGB;
}(unit_1.Unit));
exports.RGB = RGB;


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

/***/ "./src/core/ast/unit.ts":
/*!******************************!*\
  !*** ./src/core/ast/unit.ts ***!
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
var Unit = /** @class */ (function (_super) {
    __extends(Unit, _super);
    function Unit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = '';
        return _this;
    }
    return Unit;
}(node_1.Node));
exports.Unit = Unit;


/***/ }),

/***/ "./src/core/ast/value.ts":
/*!*******************************!*\
  !*** ./src/core/ast/value.ts ***!
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
var Value = /** @class */ (function (_super) {
    __extends(Value, _super);
    function Value() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Value.prototype.toString = function () {
        return this.nodes.join('');
    };
    return Value;
}(node_1.Node));
exports.Value = Value;


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
var runner_1 = __webpack_require__(/*! ./runner */ "./src/core/runner.ts");
var line_1 = __webpack_require__(/*! ./line */ "./src/core/line.ts");
var rule_1 = __webpack_require__(/*! ./rule */ "./src/core/rule.ts");
var lcfirst_1 = __webpack_require__(/*! ./helpers/lcfirst */ "./src/core/helpers/lcfirst.ts");
var Checker = /** @class */ (function () {
    function Checker(linter) {
        var _this = this;
        this.linter = linter;
        this.check = function (root) {
            var type = root.nodeName;
            _this.rulesListForNodes.forEach(function (rule) {
                if (rule.checkNode && rule.isMatchType(type)) {
                    rule.checkNode(root);
                }
            });
        };
        var rulesConstructors = rules, rulesNames = Object.keys(rulesConstructors);
        this.rulesList = rulesNames
            .filter(function (key) { return rulesConstructors[key].prototype instanceof rule_1.Rule; })
            .map(function (key) { return new rulesConstructors[key](linter.config.defaultConfig[lcfirst_1.lcfirst(key)]); })
            .filter(function (rule) { return rule.state.enabled; });
        this.rulesListForLines = this.rulesList.filter(function (rule) { return rule.checkLine; });
        this.rulesListForNodes = this.rulesList.filter(function (rule) { return rule.checkNode; });
    }
    /**
     * Check whole AST
     *
     * @param ast
     * @param content
     */
    Checker.prototype.checkASTRules = function (ast, content) {
        try {
            var runner = new runner_1.Runner(ast, this.check);
            runner.visit(ast);
        }
        catch (e) {
            this.linter.reporter.add(e.message, e.lineno || 1, 0);
        }
        finally {
            this.afterCheck();
        }
    };
    /**
     * Check line by line
     * @param content
     */
    Checker.prototype.checkLineRules = function (content) {
        var _this = this;
        try {
            var lines_1 = [];
            content.split(/\n/)
                .forEach(function (ln, index) {
                lines_1[index] = new line_1.Line(ln, index + 1, lines_1);
            });
            lines_1
                .forEach(function (line) {
                rule_1.Rule.beforeCheckLine(line);
                _this.rulesListForLines.forEach(function (rule) { return rule.checkLine && rule.checkLine(line); });
            });
        }
        catch (e) {
            this.linter.reporter.add(e.message, e.lineno || 1, 0);
        }
        finally {
            this.afterCheck();
        }
    };
    /**
     * After checking put errors in reporter
     */
    Checker.prototype.afterCheck = function () {
        var rep = this.linter.reporter;
        this.rulesList.forEach(function (rule) {
            rule.errors.forEach(function (msg) { return rep.add.apply(rep, msg); });
            rule.errors.length = 0;
        });
    };
    return Checker;
}());
exports.Checker = Checker;


/***/ }),

/***/ "./src/core/helpers/isPlainObject.ts":
/*!*******************************************!*\
  !*** ./src/core/helpers/isPlainObject.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check if element is simple plaint object
 *
 * @param obj
 */
exports.isPlainObject = function (obj) {
    if (typeof obj !== 'object') {
        return false;
    }
    return !(obj &&
        obj.constructor &&
        !{}.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf'));
};


/***/ }),

/***/ "./src/core/helpers/lcfirst.ts":
/*!*************************************!*\
  !*** ./src/core/helpers/lcfirst.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.lcfirst = function (str) {
    return str[0].toLowerCase() + str.substr(1);
};


/***/ }),

/***/ "./src/core/line.ts":
/*!**************************!*\
  !*** ./src/core/line.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Line = /** @class */ (function () {
    function Line(line, lineno, lines) {
        if (lineno === void 0) { lineno = 1; }
        if (lines === void 0) { lines = []; }
        this.lineno = 1;
        this.lines = [];
        this.line = line;
        this.lineno = lineno;
        this.lines = lines;
    }
    return Line;
}());
exports.Line = Line;


/***/ }),

/***/ "./src/core/parser.ts":
/*!****************************!*\
  !*** ./src/core/parser.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Parser = __webpack_require__(/*! stylus-pro/lib/parser */ "stylus-pro/lib/parser");
var translator_1 = __webpack_require__(/*! ./translator */ "./src/core/translator.ts");
var StylusParser = /** @class */ (function () {
    function StylusParser() {
        this.options = {};
    }
    /**
     * @param {string} [content]
     * @returns {Tree}
     */
    StylusParser.prototype.parse = function (content) {
        var parser = new Parser(content, this.options);
        try {
            var stylusAST = parser.parse();
            var translitor = new translator_1.Translator(stylusAST);
            return translitor.transpile();
        }
        catch (err) {
            err.lineno = err.lineno || parser.lexer.lineno || 0;
            err.message = 'Syntax error: ' + err.message;
            err.column = parser.lexer.column;
            throw err;
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
var util_1 = __webpack_require__(/*! util */ "util");
var Reporter = /** @class */ (function () {
    function Reporter(path) {
        this.path = path;
        this.errors = [];
        this.response = {
            passed: true
        };
    }
    Reporter.getInstance = function (path, type) {
        if (!Reporter.__instance) {
            switch (type) {
                case 'emptyout':
                    Reporter.__instance = new emptyOut_1.EmptyOut(path);
                    break;
                default:
                    Reporter.__instance = new Reporter(path);
            }
        }
        return Reporter.__instance;
    };
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
            message: [{
                    descr: message,
                    path: this.path,
                    line: line,
                    endline: line,
                    start: start,
                    end: end > start ? end : start + 1
                }]
        });
    };
    Reporter.prototype.log = function (response) {
        console.log(JSON.stringify(response));
    };
    Reporter.prototype.display = function () {
        if (this.errors.length) {
            this.response.passed = false;
            this.response.errors = this.errors;
        }
        this.log(this.response);
    };
    Reporter.prototype.reset = function () {
        this.errors.length = 0;
        this.response = {
            passed: true
        };
    };
    Reporter.__instance = null;
    return Reporter;
}());
exports.Reporter = Reporter;
exports.log = function (val) { return console.log(util_1.inspect(val, {
    depth: 10
})); };
var emptyOut_1 = __webpack_require__(/*! ./reporters/emptyOut */ "./src/core/reporters/emptyOut.ts");


/***/ }),

/***/ "./src/core/reporters/emptyOut.ts":
/*!****************************************!*\
  !*** ./src/core/reporters/emptyOut.ts ***!
  \****************************************/
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
var reporter_1 = __webpack_require__(/*! ../reporter */ "./src/core/reporter.ts");
var EmptyOut = /** @class */ (function (_super) {
    __extends(EmptyOut, _super);
    function EmptyOut() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyOut.prototype.log = function () { };
    return EmptyOut;
}(reporter_1.Reporter));
exports.EmptyOut = EmptyOut;


/***/ }),

/***/ "./src/core/rule.ts":
/*!**************************!*\
  !*** ./src/core/rule.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var lcfirst_1 = __webpack_require__(/*! ./helpers/lcfirst */ "./src/core/helpers/lcfirst.ts");
var initContext = {
    hashDeep: 0,
    inHash: false,
};
var hashStartRe = /\$?[\w]+\s*[=:]\s*\{/;
var hashEndRe = /}/;
var Rule = /** @class */ (function () {
    function Rule(conf) {
        this.conf = conf;
        this.state = {
            conf: 'always',
            enabled: true
        };
        this.nodesFilter = null;
        this.errors = [];
        if (conf) {
            if (Array.isArray(conf)) {
                this.state.conf = conf[0];
                this.state.enabled = conf[1] === undefined || Boolean(conf[1]);
            }
            else {
                this.state = __assign({}, this.state, conf);
            }
        }
        else {
            this.state.enabled = false;
        }
    }
    Object.defineProperty(Rule.prototype, "context", {
        get: function () {
            return Rule.context;
        },
        enumerable: true,
        configurable: true
    });
    Rule.prototype.clearContext = function () {
        Rule.context = __assign({}, initContext);
    };
    Rule.clearContext = function () {
        Rule.context = __assign({}, initContext);
    };
    /**
     * Check hash object etc
     * @param line
     */
    Rule.beforeCheckLine = function (line) {
        if (hashStartRe.test(line.line)) {
            Rule.context.hashDeep += 1;
        }
        Rule.context.inHash = Rule.context.hashDeep > 0;
        if (Rule.context.hashDeep && hashEndRe.test(line.line)) {
            Rule.context.hashDeep -= 1;
        }
    };
    Object.defineProperty(Rule.prototype, "name", {
        get: function () {
            return lcfirst_1.lcfirst(this.constructor.name);
        },
        enumerable: true,
        configurable: true
    });
    Rule.prototype.msg = function (message, line, start, end) {
        if (line === void 0) { line = 1; }
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = 0; }
        this.errors.push([this.name + ': ' + message, line, start, end]);
    };
    Rule.prototype.isMatchType = function (type) {
        return !this.nodesFilter || this.nodesFilter.includes(type);
    };
    Rule.context = __assign({}, initContext);
    return Rule;
}());
exports.Rule = Rule;


/***/ }),

/***/ "./src/core/runner.ts":
/*!****************************!*\
  !*** ./src/core/runner.ts ***!
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
var visitor_1 = __webpack_require__(/*! ./visitor */ "./src/core/visitor.ts");
var ast_1 = __webpack_require__(/*! ./ast/ */ "./src/core/ast/index.ts");
var Runner = /** @class */ (function (_super) {
    __extends(Runner, _super);
    function Runner(ast, fn) {
        var _this = _super.call(this, ast) || this;
        _this.fn = fn;
        return _this;
    }
    Runner.prototype.visitNode = function (node) {
        var _this = this;
        this.fn(node);
        node.nodes.forEach(function (elm) { return _this.visit(elm); });
        if (node.value && node.value instanceof ast_1.Node) {
            this.visit(node.value);
        }
        return node;
    };
    return Runner;
}(visitor_1.Visitor));
exports.Runner = Runner;


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
    function Translator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Translator.prototype.methodNotExists = function (method) {
        throw new Error("No method " + method);
    };
    Translator.prototype.transpile = function () {
        return this.visit(this.root);
    };
    Translator.prototype.eachVisit = function (list, fn) {
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
     * Обходим элементы корневого элемента
     * @param block
     */
    Translator.prototype.visitRoot = function (block) {
        var tree = new ast_1.Tree(block);
        this.eachVisit(block.nodes, function (ret) {
            tree.append(ret);
        });
        return tree;
    };
    Translator.prototype.visitNode = function (block) {
        return new ast_1.Node(block);
    };
    Translator.prototype.visitBlock = function (block) {
        var node = new ast_1.Block(block);
        this.eachVisit(block.nodes, function (ret) {
            node.append(ret);
        });
        return node;
    };
    Translator.prototype.visitGroup = function (block) {
        var node = new ast_1.Group(block);
        this.eachVisit(block.nodes, function (ret) {
            node.append(ret);
        });
        return node;
    };
    Translator.prototype.visitSelector = function (block) {
        var node = new ast_1.Selector(block);
        this.eachVisit(block.segments, function (ret) {
            node.append(ret, 'segments');
        });
        if (block.block) {
            node.append(this.visit(block.block));
        }
        return node;
    };
    Translator.prototype.visitProperty = function (block) {
        var node = new ast_1.Property(block);
        node.key = block.name || (Array.isArray(block.segments) ? block.segments.join('') : '');
        if (block.expr) {
            node.value = this.visit(block.expr);
        }
        return node;
    };
    Translator.prototype.visitLiteral = function (block) {
        return new ast_1.Literal(block, typeof block.val === 'string' ? block.val : '');
    };
    Translator.prototype.visitExpression = function (block) {
        var node = new ast_1.Value(block);
        this.eachVisit(block.nodes, function (ret) {
            node.append(ret);
        });
        return node;
    };
    Translator.prototype.visitRGBA = function (block) {
        var node = new ast_1.RGB(block);
        node.value = block.name || (typeof block.raw === 'string' ? block.raw : '') || '';
        return node;
    };
    Translator.prototype.visitIdent = function (block) {
        var node = new ast_1.Ident(block);
        node.key = block.string || block.name || '';
        if (block.val) {
            node.value = this.visit(block.val);
        }
        return node;
    };
    /**
     * Если импорт то только такой
     * @param block
     */
    Translator.prototype.visitImport = function (block) {
        var node = new ast_1.Import(block);
        node.value = (block.path || '').toString().replace(/[()]/g, '');
        return node;
    };
    /**
     * Обработка $p хеша
     * @param block
     */
    Translator.prototype.visitObject = function (block) {
        var _this = this;
        var node = new ast_1.Obj(block);
        var vals = block.vals;
        if (vals && typeof vals === 'object' && vals !== null) {
            Object.keys(vals).forEach(function (key) {
                var elm = vals[key];
                if (elm) {
                    var property = new ast_1.Property(vals[key]), ret = _this.visit(vals[key]);
                    property.key = key;
                    property.value = ret;
                    node.append(property);
                }
            });
        }
        return node;
    };
    /**
     * Пустые значения
     * @param block
     */
    Translator.prototype.visitNull = function (block) {
        // console.log(block);
    };
    /**
     * Нода значений типа px или em
     * @param block
     */
    Translator.prototype.visitUnit = function (block) {
        var node = new ast_1.Unit(block);
        node.value = typeof block.raw === 'string' ? block.raw : '';
        return node;
    };
    /**
     * Вызов миксина
     * @param block
     */
    Translator.prototype.visitCall = function (block) {
        var node = new ast_1.Call(block);
        node.key = block.name || '';
        if (block.args) {
            this.eachVisit(block.args.nodes, function (ret) {
                node.append(ret);
            });
        }
        return node;
    };
    /**
     * Получение элемента хеша
     * @param block
     */
    Translator.prototype.visitMember = function (block) {
        var node = new ast_1.Member(block);
        if (block.left) {
            node.left = new ast_1.Ident(block.left);
        }
        if (block.right) {
            node.right = new ast_1.Ident(block.right);
        }
        return node;
    };
    Translator.prototype.visitBinOp = function (block) {
        var node = new ast_1.BinOp(block);
        if (block.left) {
            node.left = new ast_1.Ident(block.left);
        }
        if (block.right) {
            node.right = new ast_1.Ident(block.right);
        }
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
    Visitor.prototype.methodNotExists = function (method) { };
    Visitor.prototype.visit = function (node) {
        var method = 'visit' + node.constructor.name;
        var fn = this[method];
        if (fn && typeof fn === 'function') {
            return fn.call(this, node);
        }
        this.methodNotExists(method);
        return this.visitNode(node);
    };
    return Visitor;
}());
exports.Visitor = Visitor;


/***/ }),

/***/ "./src/data/valid.json":
/*!*****************************!*\
  !*** ./src/data/valid.json ***!
  \*****************************/
/*! exports provided: css, html, prefixes, pseudo, scope, default */
/***/ (function(module) {

module.exports = {"css":["{","}","*","&","~/","/","../",":root","::selection","*::selection","@charset","@counter-style","@document","@font-face","@font-feature-values","@keyframes","@media","@namespace","@page","@supports","@import","@require","absolute","align-content","align-items","align-self","alignment","alignment-adjust","alignment-baseline","all","alt","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","app-region","appearance","azimuth","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","background-position","background-position-y","background-position-x","baseline-shift","bookmark-label","bookmark-level","bookmark-state","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-clip","border-clip-bottom","border-clip-left","border-clip-right","border-clip-top","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-limit","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-direction","box-orient","box-flex","box-pack","box-shadow","box-sizing","box-snap","box-suppress","box-align","break-after","break-before","break-inside","caption-side","chains","child-align","clear","clear-after","clear-side","clip","clip-path","clip-rule","color","color-interpolation-filters","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","composes","content","corner-shape","corners","counter-increment","counter-reset","counter-set","crop","cue","cue-after","cue-before","cursor","direction","display","display-inside","display-list","display-outside","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fill","fill-opacity","fill-rule","filter","fixed","flex","flex-align","flex-basis","flex-direction","flex-flow","flex-item-align","flex-line-pack","flex-grow","flex-pack","flex-shrink","flex-wrap","float","float-defer-column","float-defer-page","float-displace","float-offset","float-wrap","flood-color","flood-opacity","flow","flow-from","flow-into","font","font-family","font-feature-settings","font-kerning","font-language-override","font-size","font-size-adjust","font-smoothing","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","footnote-display","footnote-policy","from","global","glyph-orientation-horizontal","glyph-orientation-vertical","grid (extra)","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-row","grid-row-end","grid-row-start","grid-template (extra)","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","indent-edge-reset","initial-letter","initial-letter-align","inline-box-align","interpolation-mode","isolation","justify-content","justify-items","justify-self","left","letter-spacing","lighting-color","line-break","line-grid","line-height","line-snap","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","local","kerning","margin","margin-bottom","margin-left","margin-right","margin-top","marker","marker-end","marker-mid","marker-side","marker-start","marquee-direction","marquee-loop","marquee-speed","marquee-style","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","max-height","max-lines","max-width","max-zoom","min-height","min-width","min-zoom","mix-blend-mode","move-to","mso-table-lspace","mso-table-rspace","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","offset-after","offset-before","offset-end","offset-start","opacity","order","orientation","orphans","osx-font-smoothing","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-scrolling","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","play-during","pointer-events","position","presentation-level","quotes","region-fragment","resize","resolution","rest","rest-after","rest-before","richness","right","root","rotation","rotation-point","ruby-align","ruby-merge","ruby-position","running","selection","shape-image-threshold","shape-margin","shape-outside","shape-rendering","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","src","stop-color","stop-opacity","stress","string-set","stroke","stroke-width","tab","tab-align","tab-leaders","tab-leaders-alignment","tab-position","tab-size","table-baseline","table-column-span","table-layout","table-row-span","tap-highlight-color","template","text-align","text-align-all","text-align-last","text-anchor","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-size-adjust","text-transform","text-underline-position","to","top","touch-action","touch-callout","transform","transform-box","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","user-select","user-zoom","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","wrap-flow","wrap-through","writing-mode","z-index","zoom"],"html":["-webkit-line-clamp","[hidden]","a","a","abbr","abel","acronym","address","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","applet","area","article","aside","audio","b","bdi","bdo","big","blockquote","body","br","button","button[disabled]","canvas","caption","circle","cite","clip-path","code","col","colgroup","color-profile","cursor","data","datalist","dd","defs","del","desc","details","dfn","div","dl","dt","ellipse","em","embed","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","fieldset","figcaption","figure","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","footer","foreignObject","form","g","glyph","glyphRef","h1","h2","h3","h4","h5","h6","header","hgroup","hkern","hr","html","i","iframe","image","img","input","input[disabled]","input[type='button']","input[type='checkbox']","input[type='color']","input[type='date']","input[type='datetime']","input[type='datetime-local']","input[type='email']","input[type='file']","input[type='hidden']","input[type='image']","input[type='month']","input[type='number']","input[type='password']","input[type='radio']","input[type='range']","input[type='reset']","input[type='search']","input[type='submit']","input[type='tel']","input[type='text']","input[type='time']","input[type='url']","input[type='week']","input[type=button]","input[type=checkbox]","input[type=color]","input[type=date]","input[type=datetime-local]","input[type=datetime]","input[type=email]","input[type=file]","input[type=hidden]","input[type=image]","input[type=month]","input[type=number]","input[type=password]","input[type=radio]","input[type=range]","input[type=reset]","input[type=search]","input[type=submit]","input[type=tel]","input[type=text]","input[type=time]","input[type=url]","input[type=week]","ins","kbd","keygen","label","legend","li","line","line-clamp","linearGradient","main","map","mark","marker","mask","math","menu","menuitem","meta","meter","nav","object","ol","optgroup","option","output","p","param","path","pattern","picture","polygon","polyline","pre","progress","q","radialGradient","rect","rp","rt","ruby","s","samp","script","section","select","set","size","small","source","span","stop","strike","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-miterlimit","stroke-opacity","stroke-width","strong","style","sub","summary","sup","svg","switch","symbol","table","tbody","td","text","textarea","textPath","tfoot","th","thead","time","title","tr","track","tref","tspan","tt","ul","use","var","video","view","vkern","wbr"],"prefixes":["-ms-","-webkit-","-o-","-moz-","-khtml-"],"pseudo":["{","::-webkit-resizer","::-webkit-scrollbar","::-webkit-scrollbar-button","::-webkit-scrollbar-corner","::-webkit-scrollbar-thumb","::-webkit-scrollbar-track","::-webkit-scrollbar-track-piece","::-moz-inner-focus","::active",":active","::after",":after","::before",":before","::checked",":checked","::disabled",":disabled","::empty",":empty","::enabled",":enabled",":first-child","::first-child","::first-letter",":first-letter","::first-line",":first-line","::first-of-type",":first-of-type","::focus",":focus","::hover",":hover","input-placeholder",":invalid","::last-child",":last-child","::last-of-type",":last-of-type","::link",":link","::not",":not","::nth-child",":nth-child","::nth-last-child",":nth-last-child","::nth-last-of-type",":nth-last-of-type","::nth-of-type",":nth-of-type","::only-child",":only-child","::only-of-type",":only-of-type","::optional",":optional",":placeholder","::placeholder",":selection","::selection","::target",":target","::valid",":valid","::visited",":visited"],"scope":[":global",":local"]};

/***/ }),

/***/ "./src/linter.ts":
/*!***********************!*\
  !*** ./src/linter.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
var reporter_1 = __webpack_require__(/*! ./core/reporter */ "./src/core/reporter.ts");
var parser_1 = __webpack_require__(/*! ./core/parser */ "./src/core/parser.ts");
var checker_1 = __webpack_require__(/*! ./core/checker */ "./src/core/checker.ts");
var fs_1 = __webpack_require__(/*! fs */ "fs");
var path_1 = __webpack_require__(/*! path */ "path");
var rule_1 = __webpack_require__(/*! ./core/rule */ "./src/core/rule.ts");
var Linter = /** @class */ (function () {
    /**
     * @param path
     * @param content
     * @param options
     */
    function Linter(path, content, options) {
        if (content === void 0) { content = null; }
        if (options === void 0) { options = {}; }
        this.content = null;
        this.options = {};
        this.path = path_1.resolve(path);
        this.content = content;
        this.options = options;
        config_1.Config.getInstance(this.options);
        this.reporter = reporter_1.Reporter.getInstance(path, this.config.reporter);
        this.parser = new parser_1.StylusParser();
        this.checker = new checker_1.Checker(this);
    }
    Object.defineProperty(Linter.prototype, "config", {
        get: function () {
            return config_1.Config.getInstance(this.options);
        },
        enumerable: true,
        configurable: true
    });
    ;
    /**
     * Parse styl file and check rules
     */
    Linter.prototype.lint = function () {
        try {
            this.reporter.reset();
            if (!fs_1.existsSync(this.path)) {
                throw new Error('File not exists');
            }
            if (typeof this.content !== 'string') {
                this.content = fs_1.readFileSync(this.path, 'utf8');
            }
            rule_1.Rule.clearContext();
            try {
                var ast = this.parser.parse(this.content);
                this.checker.checkASTRules(ast, this.content);
            }
            catch (e) {
                this.reporter.add(e.message, e.lineno, e.startOffset);
            }
            this.checker.checkLineRules(this.content);
        }
        catch (e) {
            if (this.config.debug) {
                throw e;
            }
        }
        this.reporter.display();
    };
    return Linter;
}());
exports.Linter = Linter;


/***/ }),

/***/ "./src/rules/colons.ts":
/*!*****************************!*\
  !*** ./src/rules/colons.ts ***!
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
var rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
var validJSON = __webpack_require__(/*! ../data/valid.json */ "./src/data/valid.json");
// we only want to check colons on properties/values
var ignoreRe = /hznuznoli/m;
/**
 * @description check for colons
 * @param {string} [line] curr line being linted
 * @returns {boolean} true if colon found, false if not
 */
var Colons = /** @class */ (function (_super) {
    __extends(Colons, _super);
    function Colons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Colons.prototype.checkLine = function (line) {
        if (ignoreRe.test(line.line) || this.context.inHash) {
            return;
        }
        var colon = this.state.conf === 'always';
        var hasPseudo = false;
        var hasScope = false;
        var arr = line.line.split(/\s/);
        if (this.state.conf === 'always' &&
            arr.length > 1 &&
            arr[0].indexOf(':') === -1 &&
            arr[0].indexOf(',') === -1) {
            colon = false;
        }
        // : is allowed in hashes
        else if (this.state.conf === 'never' && line.line.indexOf(':') !== -1) {
            // check for pseudo selector
            hasPseudo = validJSON.pseudo.some(function (val) { return line.line.indexOf(val) !== -1; });
            // check for scope selector
            hasScope = validJSON.scope.some(function (val) { return line.line.indexOf(val) !== -1; });
            if (!hasPseudo && !hasScope) {
                colon = true;
            }
        }
        if (this.state.conf === 'always' && colon === false) {
            this.msg('missing colon between property and value', line.lineno, arr[0].length);
        }
        else if (this.state.conf === 'never' && colon === true) {
            var index = line.line.indexOf(':');
            this.msg('unnecessary colon found', line.lineno, index);
        }
        return colon;
    };
    return Colons;
}(rule_1.Rule));
exports.Colons = Colons;


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
        _this.nodesFilter = ['rgb'];
        return _this;
    }
    Color.prototype.checkNode = function (node) {
        var checkReg = this.state.conf === 'uppercase' ? /[a-z]/ : /[A-Z]/;
        if (node.value && typeof node.value === 'string' && checkReg.test(node.value)) {
            this.msg("Only " + this.state.conf + " HEX format", node.lineno, node.column, node.column + node.value.length - 1);
            return true;
        }
        return false;
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
__export(__webpack_require__(/*! ./colons */ "./src/rules/colons.ts"));
__export(__webpack_require__(/*! ./leadingZero */ "./src/rules/leadingZero.ts"));
__export(__webpack_require__(/*! ./useBasis */ "./src/rules/useBasis.ts"));
__export(__webpack_require__(/*! ./semicolons */ "./src/rules/semicolons.ts"));


/***/ }),

/***/ "./src/rules/leadingZero.ts":
/*!**********************************!*\
  !*** ./src/rules/leadingZero.ts ***!
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
var rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
var decimalRe = /[^\d+](0+\.\d+)|[\s,(:](\.\d+)/i;
var leadZeroRe = /[^\d+](0+\.\d+)/;
var nonZeroRe = /[\s,(:](\.\d+)/;
/**
 * @description check for leading 0 on numbers ( 0.5 )
 * @param {string} [line] curr line being linted
 * @returns {boolean|undefined} true if mixed, false if not
 */
var LeadingZero = /** @class */ (function (_super) {
    __extends(LeadingZero, _super);
    function LeadingZero() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeadingZero.prototype.checkLine = function (line) {
        if (!decimalRe.test(line.line)) {
            return;
        }
        var leadZeroFound = leadZeroRe.exec(line.line);
        var leadZeroMissing = nonZeroRe.exec(line.line);
        if (this.state.conf === 'always' && leadZeroMissing) {
            this.msg('leading zeros for decimal points are required', line.lineno, leadZeroMissing.index);
        }
        else if (this.state.conf === 'never' && leadZeroFound) {
            this.msg('leading zeros for decimal points are unnecessary', line.lineno, leadZeroFound.index);
        }
        return Boolean(leadZeroFound);
    };
    return LeadingZero;
}(rule_1.Rule));
exports.LeadingZero = LeadingZero;


/***/ }),

/***/ "./src/rules/semicolons.ts":
/*!*********************************!*\
  !*** ./src/rules/semicolons.ts ***!
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
var rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
// we only want to check semicolons on properties/values
var ignoreRe = /(^[*#.])|[&>/]|{|}|if|for(?!\w)|else|@block|@media|(}|{|=|,)$/igm;
/**
 * @description check that selector properties are sorted accordingly
 * @param  {string} [line] curr line being linted
 * @return {boolean} true if in order, false if not
 */
var Semicolons = /** @class */ (function (_super) {
    __extends(Semicolons, _super);
    function Semicolons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Semicolons.prototype.checkLine = function (line) {
        if (ignoreRe.test(line.line.trim())) {
            return;
        }
        var semicolon, index = line.line.indexOf(';');
        if (this.state.conf === 'never' && index !== -1) {
            semicolon = true;
        }
        // for reasons that perplex me, even when the first use
        // of this at the top returns true, sometimes the method
        // still runs, so we add this second ignoreCheck here to catch it
        if (this.state.conf === 'always' && !ignoreRe.test(line.line.trim())) {
            if (index === -1 &&
                line.line.indexOf('}') === -1 &&
                line.line.indexOf('{') === -1) {
                semicolon = false;
            }
        }
        if (this.state.conf === 'never' && semicolon === true) {
            this.msg('unnecessary semicolon found', line.lineno, index);
        }
        else if (this.state.conf === 'always' && semicolon === false) {
            this.msg('missing semicolon', line.lineno, line.line.length);
        }
        return semicolon;
    };
    return Semicolons;
}(rule_1.Rule));
exports.Semicolons = Semicolons;


/***/ }),

/***/ "./src/rules/useBasis.ts":
/*!*******************************!*\
  !*** ./src/rules/useBasis.ts ***!
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
var rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
var useBasis = /** @class */ (function (_super) {
    __extends(useBasis, _super);
    function useBasis() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodesFilter = ['unit', 'call'];
        return _this;
    }
    useBasis.prototype.checkNode = function (node) {
        if (this.state.conf === 'always') {
            if (node.value && typeof node.value === 'string') {
                var unit = /([\d]+)px/.exec(node.value);
                if (unit) {
                    var unitSize = Number(unit[1]), basis = (unitSize / 8);
                    this.msg("Use basis mixin instead \"px\" (basis(" + basis + "))", node.lineno, node.column, node.column + node.value.length - 1);
                    return true;
                }
            }
        }
        else {
            if (node.nodeName === 'call' && typeof node.key === 'string' && node.key === 'basis') {
                this.msg("Do not use Basis mixin", node.lineno, node.column, node.column + node.key.length - 1);
            }
        }
        return false;
    };
    return useBasis;
}(rule_1.Rule));
exports.useBasis = useBasis;


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

/***/ "strip-json-comments":
/*!**************************************!*\
  !*** external "strip-json-comments" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("strip-json-comments");

/***/ }),

/***/ "stylus-pro/lib/parser":
/*!****************************************!*\
  !*** external "stylus-pro/lib/parser" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stylus-pro/lib/parser");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
});
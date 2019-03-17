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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var linter_1 = __webpack_require__(/*! ./src/linter */ "./src/linter.ts");
var watcher_1 = __webpack_require__(/*! ./src/watcher */ "./src/watcher.ts");
var reader_1 = __webpack_require__(/*! ./src/core/reader */ "./src/core/reader.ts");
__export(__webpack_require__(/*! ./src/core/rule */ "./src/core/rule.ts"));
function StylusLinter(path, content, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var linter, first, reader, readAndDisplay, watcher;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    linter = new linter_1.Linter(options), first = function () { return Array.isArray(path) ? path[0] : path; };
                    if (content) {
                        linter.lint(first(), content);
                        return [2 /*return*/, linter.display()];
                    }
                    if (!path) {
                        path = linter.config.path || process.cwd();
                    }
                    reader = new reader_1.Reader(linter.config), readAndDisplay = function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, reader.read(path, linter.lint)];
                                case 1:
                                    _a.sent();
                                    linter.display(!linter.config.watch);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (linter.config.watch) {
                        watcher = new watcher_1.Watcher();
                        watcher.start(Array.isArray(path) ? path[0] : path, readAndDisplay);
                    }
                    return [4 /*yield*/, readAndDisplay()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.StylusLinter = StylusLinter;


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
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
var data = __webpack_require__(/*! ./defaultRules.json */ "./src/defaultRules.json");
var baseConfig_1 = __webpack_require__(/*! ./core/baseConfig */ "./src/core/baseConfig.ts");
var chalk = __webpack_require__(/*! chalk */ "chalk");
var path_1 = __webpack_require__(/*! path */ "path");
var Config = /** @class */ (function (_super) {
    __extends(Config, _super);
    function Config(options) {
        var _this = _super.call(this) || this;
        _this.debug = false;
        _this.reporter = 'raw';
        _this.rules = __assign({}, data);
        _this.defaultRules = Object.freeze(__assign({}, data));
        _this.excludes = ['node_modules/'];
        _this.watch = false;
        _this.path = '';
        _this.stylusParserOptions = {};
        _this.extends = '';
        _this.reportOptions = {
            columnSplitter: ' | ',
            headingTransform: function (heading) {
                return chalk.yellow(heading.toUpperCase());
            },
            maxWidth: 70,
            minWidth: 10,
            truncate: false,
        };
        _this.extendsOption(options, _this);
        if (!_this.configFile) {
            _this.configFile = path_1.resolve(process.cwd(), _this.configName);
        }
        _this.readConfig(_this.configFile);
        if (_this.extends) {
            if (Array.isArray(_this.extends)) {
                _this.extends.forEach(_this.extendsByPath.bind(_this));
            }
            else {
                _this.extendsByPath(_this.extends);
            }
        }
        return _this;
    }
    return Config;
}(baseConfig_1.BaseConfig));
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

/***/ "./src/core/ast/bool.ts":
/*!******************************!*\
  !*** ./src/core/ast/bool.ts ***!
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
var Bool = /** @class */ (function (_super) {
    __extends(Bool, _super);
    function Bool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bool;
}(node_1.Node));
exports.Bool = Bool;


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

/***/ "./src/core/ast/comment.ts":
/*!*********************************!*\
  !*** ./src/core/ast/comment.ts ***!
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
var Comment = /** @class */ (function (_super) {
    __extends(Comment, _super);
    function Comment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = '';
        return _this;
    }
    return Comment;
}(node_1.Node));
exports.Comment = Comment;


/***/ }),

/***/ "./src/core/ast/condition.ts":
/*!***********************************!*\
  !*** ./src/core/ast/condition.ts ***!
  \***********************************/
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
var Condition = /** @class */ (function (_super) {
    __extends(Condition, _super);
    function Condition() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cond = null;
        return _this;
    }
    return Condition;
}(node_1.Node));
exports.Condition = Condition;


/***/ }),

/***/ "./src/core/ast/each.ts":
/*!******************************!*\
  !*** ./src/core/ast/each.ts ***!
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
var Each = /** @class */ (function (_super) {
    __extends(Each, _super);
    function Each() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Each;
}(node_1.Node));
exports.Each = Each;


/***/ }),

/***/ "./src/core/ast/feature.ts":
/*!*********************************!*\
  !*** ./src/core/ast/feature.ts ***!
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
var Feature = /** @class */ (function (_super) {
    __extends(Feature, _super);
    function Feature() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.segments = [];
        return _this;
    }
    Feature.prototype.toString = function () {
        return this.segments.join('');
    };
    return Feature;
}(node_1.Node));
exports.Feature = Feature;


/***/ }),

/***/ "./src/core/ast/func.ts":
/*!******************************!*\
  !*** ./src/core/ast/func.ts ***!
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
var Func = /** @class */ (function (_super) {
    __extends(Func, _super);
    function Func() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = '';
        _this.value = '';
        _this.params = [];
        return _this;
    }
    return Func;
}(node_1.Node));
exports.Func = Func;


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
var node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
var Ident = /** @class */ (function (_super) {
    __extends(Ident, _super);
    function Ident() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = '';
        _this.value = null;
        return _this;
    }
    return Ident;
}(node_1.Node));
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
__export(__webpack_require__(/*! ./func */ "./src/core/ast/func.ts"));
__export(__webpack_require__(/*! ./comment */ "./src/core/ast/comment.ts"));
__export(__webpack_require__(/*! ./params */ "./src/core/ast/params.ts"));
__export(__webpack_require__(/*! ./bool */ "./src/core/ast/bool.ts"));
__export(__webpack_require__(/*! ./each */ "./src/core/ast/each.ts"));
__export(__webpack_require__(/*! ./condition */ "./src/core/ast/condition.ts"));
__export(__webpack_require__(/*! ./unaryop */ "./src/core/ast/unaryop.ts"));
__export(__webpack_require__(/*! ./media */ "./src/core/ast/media.ts"));
__export(__webpack_require__(/*! ./querylist */ "./src/core/ast/querylist.ts"));
__export(__webpack_require__(/*! ./query */ "./src/core/ast/query.ts"));
__export(__webpack_require__(/*! ./feature */ "./src/core/ast/feature.ts"));
__export(__webpack_require__(/*! ./keyframes */ "./src/core/ast/keyframes.ts"));


/***/ }),

/***/ "./src/core/ast/keyframes.ts":
/*!***********************************!*\
  !*** ./src/core/ast/keyframes.ts ***!
  \***********************************/
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
var Keyframes = /** @class */ (function (_super) {
    __extends(Keyframes, _super);
    function Keyframes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Keyframes;
}(node_1.Node));
exports.Keyframes = Keyframes;


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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.val = '';
        return _this;
    }
    Literal.prototype.toString = function () {
        return this.val;
    };
    return Literal;
}(node_1.Node));
exports.Literal = Literal;


/***/ }),

/***/ "./src/core/ast/media.ts":
/*!*******************************!*\
  !*** ./src/core/ast/media.ts ***!
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
var Media = /** @class */ (function (_super) {
    __extends(Media, _super);
    function Media() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.query = null;
        return _this;
    }
    return Media;
}(node_1.Node));
exports.Media = Media;


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
    function Node(block, parent) {
        this.parent = null;
        this.lineno = 0;
        this.column = 0;
        this.nodes = [];
        this.source = null;
        this.value = '';
        this.lineno = block.lineno;
        this.column = block.column;
        this.source = block;
        this.parent = parent;
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
    Node.prototype.getSibling = function (next) {
        if (next === void 0) { next = false; }
        if (this.parent && this.parent.nodes.length) {
            var index = this.parent.nodes.indexOf(this);
            if (index !== -1 && ((!next && index > 0) || (next && index < this.parent.nodes.length - 2))) {
                return this.parent.nodes[index + (next ? 1 : -1)];
            }
        }
        return null;
    };
    /**
     * Get previous node in parent.nodes
     */
    Node.prototype.previousSibling = function () {
        return this.getSibling();
    };
    /**
     * Get next node in parent.nodes
     */
    Node.prototype.nextSibling = function () {
        return this.getSibling(true);
    };
    /**
     * Get match parent
     * @param parentClass
     */
    Node.prototype.closest = function (parentClass) {
        var reg = RegExp("^(" + parentClass + ")$", 'i'), node = this.parent;
        while (node) {
            if (reg.test(node.nodeName)) {
                return node;
            }
            node = node.parent;
        }
        return null;
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

/***/ "./src/core/ast/params.ts":
/*!********************************!*\
  !*** ./src/core/ast/params.ts ***!
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
var Params = /** @class */ (function (_super) {
    __extends(Params, _super);
    function Params() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Params;
}(node_1.Node));
exports.Params = Params;


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

/***/ "./src/core/ast/query.ts":
/*!*******************************!*\
  !*** ./src/core/ast/query.ts ***!
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
var Query = /** @class */ (function (_super) {
    __extends(Query, _super);
    function Query() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.predicate = '';
        _this.type = null;
        return _this;
    }
    return Query;
}(node_1.Node));
exports.Query = Query;


/***/ }),

/***/ "./src/core/ast/querylist.ts":
/*!***********************************!*\
  !*** ./src/core/ast/querylist.ts ***!
  \***********************************/
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
var Querylist = /** @class */ (function (_super) {
    __extends(Querylist, _super);
    function Querylist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Querylist;
}(node_1.Node));
exports.Querylist = Querylist;


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
    Selector.prototype.toString = function () {
        return this.segments.join('');
    };
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
    function Tree(block) {
        var _this = _super.call(this, block, null) || this;
        _this.parent = null;
        return _this;
    }
    return Tree;
}(node_1.Node));
exports.Tree = Tree;


/***/ }),

/***/ "./src/core/ast/unaryop.ts":
/*!*********************************!*\
  !*** ./src/core/ast/unaryop.ts ***!
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
var UnaryOp = /** @class */ (function (_super) {
    __extends(UnaryOp, _super);
    function UnaryOp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.left = null;
        _this.right = null;
        return _this;
    }
    return UnaryOp;
}(node_1.Node));
exports.UnaryOp = UnaryOp;


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
    Object.defineProperty(Value.prototype, "key", {
        get: function () {
            if (this.nodes.length && this.nodes[0].key) {
                return String(this.nodes[0].key);
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Value.prototype.toString = function () {
        return this.nodes.join('');
    };
    return Value;
}(node_1.Node));
exports.Value = Value;


/***/ }),

/***/ "./src/core/baseConfig.ts":
/*!********************************!*\
  !*** ./src/core/baseConfig.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isPlainObject_1 = __webpack_require__(/*! ./helpers/isPlainObject */ "./src/core/helpers/isPlainObject.ts");
var fs_1 = __webpack_require__(/*! fs */ "fs");
var stripJsonComments = __webpack_require__(/*! strip-json-comments */ "strip-json-comments");
var path_1 = __webpack_require__(/*! path */ "path");
var fs_2 = __webpack_require__(/*! fs */ "fs");
var BaseConfig = /** @class */ (function () {
    function BaseConfig() {
        this.configName = '.stlintrc';
        this.configFile = '';
        this.extraRules = '';
    }
    /**
     * Try read config file .stlintrc
     */
    BaseConfig.prototype.readConfig = function (configFile) {
        if (fs_1.existsSync(configFile)) {
            try {
                var customConfig = JSON.parse(stripJsonComments(fs_1.readFileSync(configFile, 'utf8')));
                if (customConfig) {
                    this.extendsOption(customConfig, this);
                    if (this.extraRules) {
                        var dir_1 = path_1.dirname(configFile), normaliePath = function (extra) { return path_1.resolve(dir_1, extra); };
                        if (Array.isArray(this.extraRules)) {
                            this.extraRules = this.extraRules.map(normaliePath);
                        }
                        else {
                            this.extraRules = normaliePath(this.extraRules);
                        }
                    }
                }
            }
            catch (_a) { }
        }
    };
    /**
     * Extends default options by some object
     *
     * @param from
     * @param to
     */
    BaseConfig.prototype.extendsOption = function (from, to) {
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
    /**
     * Load extra config files
     */
    BaseConfig.prototype.extendsByPath = function (pathOrPackage) {
        var path;
        if (/^\./.test(pathOrPackage)) {
            path = path_1.resolve(process.cwd(), pathOrPackage);
        }
        else {
            path = path_1.resolve(process.cwd(), 'node_modules', pathOrPackage);
        }
        var stat = fs_2.statSync(path);
        if (stat.isFile()) {
            this.readConfig(path);
        }
        else {
            this.readConfig(path_1.resolve(path, this.configName));
        }
    };
    return BaseConfig;
}());
exports.BaseConfig = BaseConfig;


/***/ }),

/***/ "./src/core/checker.ts":
/*!*****************************!*\
  !*** ./src/core/checker.ts ***!
  \*****************************/
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
var rules = __webpack_require__(/*! ../rules/index */ "./src/rules/index.ts");
var runner_1 = __webpack_require__(/*! ./runner */ "./src/core/runner.ts");
var rule_1 = __webpack_require__(/*! ./rule */ "./src/core/rule.ts");
var lcfirst_1 = __webpack_require__(/*! ./helpers/lcfirst */ "./src/core/helpers/lcfirst.ts");
var splitLines_1 = __webpack_require__(/*! ./helpers/splitLines */ "./src/core/helpers/splitLines.ts");
var fs_1 = __webpack_require__(/*! fs */ "fs");
var path_1 = __webpack_require__(/*! path */ "path");
var _require = __webpack_require__(/*! native-require */ "native-require");
var Checker = /** @class */ (function () {
    function Checker(linter) {
        var _this = this;
        this.linter = linter;
        this.rulesListForNodes = [];
        this.rulesListForLines = [];
        this.rulesList = [];
        this.check = function (root) {
            var type = root.nodeName;
            _this.rulesListForNodes.forEach(function (rule) {
                if (rule.checkNode && rule.isMatchType(type)) {
                    rule.checkNode(root);
                }
            });
        };
    }
    /**
     * Load and init rules (and external rules too)
     */
    Checker.prototype.loadAndInitRules = function () {
        this.rulesList = this.initRules(rules);
        if (this.linter.config.extraRules) {
            var extraRules = this.loadRules(this.linter.config.extraRules);
            this.rulesList = this.rulesList.concat(this.initRules(extraRules));
        }
        this.rulesListForLines = this.rulesList.filter(function (rule) { return rule.checkLine; });
        this.rulesListForNodes = this.rulesList.filter(function (rule) { return rule.checkNode; });
    };
    /**
     * Load one rule or several rules
     * @param path
     */
    Checker.prototype.requireRule = function (path) {
        var _a;
        if (/\.js$/.test(path)) {
            try {
                var rule = _require("" + path);
                if (typeof rule === 'function') {
                    return _a = {},
                        _a[rule.name] = rule,
                        _a;
                }
                else {
                    return __assign({}, rule);
                }
            }
            catch (e) {
                console.log(e);
                throw e;
                this.linter.reporter.add('JS', e.message, 1, 1);
            }
        }
        return {};
    };
    /**
     * Load rules from folder
     */
    Checker.prototype.loadRules = function (path) {
        var _this = this;
        var results = {};
        if (Array.isArray(path)) {
            path.map(this.loadRules).forEach(function (rules) {
                results = __assign({}, results, rules);
            });
            return results;
        }
        var stat = fs_1.statSync(path);
        if (stat.isFile()) {
            results = __assign({}, results, this.requireRule(path));
        }
        else if (stat.isDirectory()) {
            fs_1.readdirSync(path).forEach(function (file) {
                results = __assign({}, results, _this.requireRule(path_1.resolve(path, file)));
            });
        }
        return results;
    };
    /**
     * Create instance od all rules all rules
     * @param rulesConstructors
     */
    Checker.prototype.initRules = function (rulesConstructors) {
        var rulesNames = Object.keys(rulesConstructors), config = this.linter.config;
        return rulesNames
            .filter(function (key) { return typeof rulesConstructors[key] === 'function'; })
            .map(function (key) {
            if (!(rulesConstructors[key].prototype instanceof rule_1.Rule)) {
                rulesConstructors[key].prototype = new rule_1.Rule({ "conf": "always" });
                rulesConstructors[key].prototype.constructor = rulesConstructors[key];
            }
            return key;
        })
            .map(function (key) {
            var options = config.rules[lcfirst_1.lcfirst(key)];
            if (options === true && config.defaultRules[lcfirst_1.lcfirst(key)]) {
                options = config.defaultRules[lcfirst_1.lcfirst(key)];
            }
            return new rulesConstructors[key](options);
        })
            .filter(function (rule) { return rule.state.enabled; });
    };
    /**
     * Check whole AST
     *
     * @param ast
     */
    Checker.prototype.checkASTRules = function (ast) {
        try {
            var runner = new runner_1.Runner(ast, this.check);
            runner.visit(ast, null);
        }
        catch (e) {
            this.linter.reporter.add('parser', e.message, e.lineno || 1, 0);
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
            var lines_1 = splitLines_1.splitLines(content);
            lines_1
                .forEach(function (line, index) {
                if (index) {
                    rule_1.Rule.beforeCheckLine(line);
                    _this.rulesListForLines.forEach(function (rule) { return rule.checkLine && rule.checkLine(line, index, lines_1); });
                }
            });
        }
        catch (e) {
            this.linter.reporter.add('Line', e.message, e.lineno || 1, 0);
        }
        finally {
            this.afterCheck();
        }
    };
    /**
     * After checking put errors in reporter
     */
    Checker.prototype.afterCheck = function () {
        var reporter = this.linter.reporter;
        this.rulesList.forEach(function (rule) {
            rule.errors.forEach(function (msg) { return reporter.add.apply(reporter, msg); });
            rule.clearErrors();
        });
        reporter.fillResponse();
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

/***/ "./src/core/helpers/splitLines.ts":
/*!****************************************!*\
  !*** ./src/core/helpers/splitLines.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var line_1 = __webpack_require__(/*! ../line */ "./src/core/line.ts");
function splitLines(content) {
    var lines = [];
    content.split(/\n/)
        .forEach(function (ln, index) {
        lines[index + 1] = new line_1.Line(ln, index + 1, lines);
    });
    return lines;
}
exports.splitLines = splitLines;


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
    /**
     * Get next line
     */
    Line.prototype.next = function () {
        var index = this.lines.indexOf(this);
        if (index !== -1) {
            return this.lines[index + 1] || null;
        }
        return null;
    };
    /**
     * Get previous line
     */
    Line.prototype.prev = function () {
        var index = this.lines.indexOf(this);
        if (index !== -1) {
            return this.lines[index - 1] || null;
        }
        return null;
    };
    /**
     * Check the line is empty
     */
    Line.prototype.isEmpty = function () {
        return this.line.trim().length === 0;
    };
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
var Parser = __webpack_require__(/*! stylus/lib/parser */ "stylus/lib/parser");
var translator_1 = __webpack_require__(/*! ./translator */ "./src/core/translator.ts");
var splitLines_1 = __webpack_require__(/*! ./helpers/splitLines */ "./src/core/helpers/splitLines.ts");
var StylusParser = /** @class */ (function () {
    /**
     * @param options Stylus parser options
     */
    function StylusParser(options) {
        if (options === void 0) { options = {}; }
        this.options = options;
    }
    /**
     * Parse use native stylus parser into StylusAST and convert it in our AST
     *
     * @param {string} content
     * @returns {Tree}
     */
    StylusParser.prototype.parse = function (content) {
        var parser = new Parser(content, this.options);
        try {
            var stylusAST = parser.parse();
            var translator = new translator_1.Translator(stylusAST, splitLines_1.splitLines(content));
            return translator.transpile();
        }
        catch (err) {
            err.lineno = parser.lexer.lineno || err.lineno || 1;
            err.column = parser.lexer.column || err.column || 1;
            err.message = 'Syntax error: ' + err.message + ("(" + err.lineno + "," + err.column + ")");
            throw err;
        }
    };
    return StylusParser;
}());
exports.StylusParser = StylusParser;


/***/ }),

/***/ "./src/core/reader.ts":
/*!****************************!*\
  !*** ./src/core/reader.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob_1 = __webpack_require__(/*! glob */ "glob");
var path_1 = __webpack_require__(/*! path */ "path");
var async_1 = __webpack_require__(/*! async */ "async");
var fs_1 = __webpack_require__(/*! fs */ "fs");
var Reader = /** @class */ (function () {
    function Reader(config) {
        this.config = config;
    }
    /**
     * Check `dir` parameter for folder or file call `readFolder` or `readFiles`
     *
     * @param dir
     * @param callback
     * @return Promise
     */
    Reader.prototype.read = function (dir, callback) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof dir !== 'string' && !(dir instanceof Array)) {
                            throw new TypeError('getFiles err. Expected string or array, but received: ' + typeof dir);
                        }
                        if (!(typeof dir === 'string')) return [3 /*break*/, 3];
                        if (!(dir === process.cwd())) return [3 /*break*/, 2];
                        dir = dir + '/**/*.styl';
                        return [4 /*yield*/, this.readFolder(dir, callback)];
                    case 1:
                        _a.sent();
                        resolve();
                        return [2 /*return*/];
                    case 2: return [2 /*return*/, fs_1.stat(dir, function (err, stats) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!stats || err) {
                                            throw Error('Stlint Error: No such file or dir exists!');
                                        }
                                        if (!stats.isFile()) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.readFiles([dir.toString()], callback)];
                                    case 1:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        if (!stats.isDirectory()) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.readFolder(dir.toString() + '/**/*.styl', callback)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 3: return [2 /*return*/, Promise.all(dir.map(function (path) { return _this.read(path, callback); }))];
                }
            });
        }); });
    };
    /**
     * Find all 'styl' files in the directory and call `readFiles`
     *
     * @param dir
     * @param callback
     * @return Promise
     */
    Reader.prototype.readFolder = function (dir, callback) {
        var _this = this;
        return new Promise(function (resolve) {
            return new glob_1.Glob(dir, {}, function (err, files) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (err) {
                                throw err;
                            }
                            if (this.config.excludes && this.config.excludes.length) {
                                files = files.filter(function (file) {
                                    var relPath = path_1.relative(dir.replace('/**/*.styl', ''), file);
                                    return !_this.config.excludes.some(function (exclude) {
                                        var reg = new RegExp(exclude);
                                        return reg.test(relPath);
                                    });
                                });
                            }
                            return [4 /*yield*/, this.readFiles(files, callback)];
                        case 1:
                            _a.sent();
                            resolve();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    /**
     * Read all files from array and call ReaderCallback
     *
     * @param files
     * @param callback
     * @return Promise
     */
    Reader.prototype.readFiles = function (files, callback) {
        var _this = this;
        return new Promise(function (resolve) {
            async_1.map(files, fs_1.readFile, function (error, buffer) {
                if (error) {
                    throw error;
                }
                if (buffer) {
                    buffer.forEach(function (bf, index) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = bf;
                                    if (!_a) return [3 /*break*/, 2];
                                    return [4 /*yield*/, callback(files[index], bf.toString())];
                                case 1:
                                    _a = (_b.sent());
                                    _b.label = 2;
                                case 2:
                                    _a;
                                    if (index === files.length - 1) {
                                        resolve();
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
            });
        });
    };
    return Reader;
}());
exports.Reader = Reader;


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
    function Reporter(options) {
        this.options = options;
        this.errors = [];
        this.path = '';
        this.response = {
            passed: true
        };
    }
    /**
     * Set current working file
     * @param path
     */
    Reporter.prototype.setPath = function (path) {
        this.path = path;
    };
    Reporter.getInstance = function (type, config) {
        if (!Reporter.__instance) {
            switch (type) {
                case 'json':
                    Reporter.__instance = new jsonReporter_1.JsonReporter(config);
                    break;
                case 'silent':
                    Reporter.__instance = new silentReporter_1.SilentReporter(config);
                    break;
                default:
                    Reporter.__instance = new rawReporter_1.RawReporter(config);
            }
        }
        return Reporter.__instance;
    };
    /**
     * Add new error in message pull
     * @param rule
     * @param message
     * @param line
     * @param start
     * @param end
     * @param fix
     */
    Reporter.prototype.add = function (rule, message, line, start, end, fix) {
        if (line === void 0) { line = 0; }
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = 0; }
        if (fix === void 0) { fix = null; }
        this.errors.push({
            message: [{
                    rule: rule,
                    descr: message,
                    path: this.path,
                    line: line,
                    endline: line,
                    start: start,
                    end: end > start ? end : start,
                    fix: typeof fix === 'string' ? { replace: fix } : null
                }]
        });
    };
    /**
     * Fill response object
     */
    Reporter.prototype.fillResponse = function () {
        if (this.errors.length) {
            this.response.passed = false;
            this.response.errors = this.errors;
        }
    };
    /**
     * Prepare data and output result
     * @param exit
     */
    Reporter.prototype.display = function (exit) {
        this.fillResponse();
        this.log();
        this.reset();
        if (exit) {
            process.exit(this.response.passed ? 0 : 1);
        }
    };
    /**
     * Reset all error stores
     */
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
var silentReporter_1 = __webpack_require__(/*! ./reporters/silentReporter */ "./src/core/reporters/silentReporter.ts");
var rawReporter_1 = __webpack_require__(/*! ./reporters/rawReporter */ "./src/core/reporters/rawReporter.ts");
var jsonReporter_1 = __webpack_require__(/*! ./reporters/jsonReporter */ "./src/core/reporters/jsonReporter.ts");


/***/ }),

/***/ "./src/core/reporters/jsonReporter.ts":
/*!********************************************!*\
  !*** ./src/core/reporters/jsonReporter.ts ***!
  \********************************************/
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
var JsonReporter = /** @class */ (function (_super) {
    __extends(JsonReporter, _super);
    function JsonReporter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @override
     */
    JsonReporter.prototype.log = function () {
        if (this.response.errors) {
            this.response.errors.forEach(function (error) { return error.message.forEach(function (message) {
                message.descr = message.rule + ': ' + message.descr;
            }); });
        }
        console.clear();
        console.log(JSON.stringify(this.response, null, 2));
    };
    return JsonReporter;
}(reporter_1.Reporter));
exports.JsonReporter = JsonReporter;


/***/ }),

/***/ "./src/core/reporters/rawReporter.ts":
/*!*******************************************!*\
  !*** ./src/core/reporters/rawReporter.ts ***!
  \*******************************************/
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
var columnify = __webpack_require__(/*! columnify */ "columnify");
var chalk = __webpack_require__(/*! chalk */ "chalk");
var RawReporter = /** @class */ (function (_super) {
    __extends(RawReporter, _super);
    function RawReporter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @override
     */
    RawReporter.prototype.log = function () {
        var _this = this;
        var cwd = process.cwd(), warningsOrErrors = this.errors.slice(), // TODO add warning mode
        messagesToFile = {}, msg = [];
        warningsOrErrors.forEach(function (pack) {
            pack.message.forEach(function (message) {
                var path = message.path.replace(cwd, '');
                if (!messagesToFile[path]) {
                    messagesToFile[path] = [];
                }
                messagesToFile[path].push({
                    file: chalk.magenta(path.padEnd(30, ' ')),
                    line: chalk.yellow(message.line),
                    description: chalk.red(message.descr.padEnd(_this.options.maxWidth || 100, ' ')),
                    rule: chalk.cyan(message.rule)
                });
            });
        });
        var msgGrouped = Object.keys(messagesToFile).map(function (file) {
            return chalk.blue(file) + '\n' + columnify(messagesToFile[file], _this.options) + '\n';
        });
        msg.push(msgGrouped.join('\n'));
        var cnt = this.errors.length;
        msg.push('Stlint: ' + (cnt ? chalk.red(cnt) : chalk.green(0)) + ' Errors.');
        console.log(msg.join(''));
    };
    return RawReporter;
}(reporter_1.Reporter));
exports.RawReporter = RawReporter;


/***/ }),

/***/ "./src/core/reporters/silentReporter.ts":
/*!**********************************************!*\
  !*** ./src/core/reporters/silentReporter.ts ***!
  \**********************************************/
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
var SilentReporter = /** @class */ (function (_super) {
    __extends(SilentReporter, _super);
    function SilentReporter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SilentReporter.prototype.log = function () { };
    return SilentReporter;
}(reporter_1.Reporter));
exports.SilentReporter = SilentReporter;


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
    inComment: false,
};
var hashStartRe = /\$?[\w]+\s*[=:]\s*{/, hashEndRe = /}/, startMultiComment = /\/\*/, endMultiComment = /\*\//;
var Rule = /** @class */ (function () {
    function Rule(conf) {
        this.conf = conf;
        this.state = {
            conf: 'always',
            enabled: true
        };
        this.cache = {};
        this.nodesFilter = null;
        this.hashErrors = {};
        this.errors = [];
        if (typeof conf !== 'boolean') {
            if (Array.isArray(conf)) {
                this.state.conf = conf[0];
                this.state.enabled = conf[1] === undefined || Boolean(conf[1]);
            }
            else {
                this.state = __assign({}, this.state, conf);
                if (conf.enabled === undefined) {
                    this.state.enabled = true;
                }
            }
        }
        else {
            this.state.enabled = conf;
        }
    }
    Object.defineProperty(Rule.prototype, "context", {
        get: function () {
            return Rule.context;
        },
        enumerable: true,
        configurable: true
    });
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
        if (startMultiComment.test(line.line)) {
            Rule.context.inComment = true;
        }
        if (Rule.context.inComment) {
            var prev = line.prev();
            if (prev && endMultiComment.test(prev.line)) {
                Rule.context.inComment = false;
            }
        }
    };
    Object.defineProperty(Rule.prototype, "name", {
        /**
         * Rule name
         */
        get: function () {
            return lcfirst_1.lcfirst(this.constructor.name);
        },
        enumerable: true,
        configurable: true
    });
    Rule.prototype.clearErrors = function () {
        this.errors.length = 0;
        this.hashErrors = {};
    };
    Rule.prototype.clearContext = function () {
        Rule.clearContext();
    };
    /**
     * Add error message in list
     *
     * @param message
     * @param line
     * @param start
     * @param end
     * @param fix
     */
    Rule.prototype.msg = function (message, line, start, end, fix) {
        if (line === void 0) { line = 1; }
        if (start === void 0) { start = 1; }
        if (end === void 0) { end = 1; }
        if (fix === void 0) { fix = null; }
        var error = [this.name, message, line, start, end, fix], hash = error.join('&');
        if (!this.hashErrors[hash]) {
            this.hashErrors[hash] = true;
            this.errors.push(error);
        }
    };
    /**
     * Check type included in filter
     * @param type
     */
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
    Runner.prototype.visitNode = function (node, parent) {
        var _this = this;
        this.fn(node);
        node.nodes.forEach(function (elm) { return _this.visit(elm, parent); });
        if (node.value && node.value instanceof ast_1.Node) {
            this.visit(node.value, parent);
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
    function Translator(root, lines) {
        var _this = _super.call(this, root) || this;
        _this.lines = lines;
        return _this;
    }
    Translator.prototype.methodNotExists = function (method, node) {
        var e = new Error("No method " + method + " line:" + node.lineno);
        e.lineno = node.lineno;
        throw e;
    };
    Translator.prototype.transpile = function () {
        return this.visit(this.root, null);
    };
    Translator.prototype.eachVisit = function (list, fn, parent) {
        if (Array.isArray(list)) {
            for (var i = 0, len = list.length; i < len; ++i) {
                var node = list[i];
                var ret = this.visit(node, parent);
                if (ret) {
                    fn(ret);
                }
            }
        }
    };
    /**
     * Root element in AST
     * @param block
     */
    Translator.prototype.visitRoot = function (block) {
        var tree = new ast_1.Tree(block);
        this.eachVisit(block.nodes, function (ret) {
            tree.append(ret);
        }, tree);
        return tree;
    };
    Translator.prototype.visitNode = function (block, parent) {
        return new ast_1.Node(block, parent);
    };
    Translator.prototype.visitBlock = function (block, parent) {
        var node = new ast_1.Block(block, parent);
        this.eachVisit(block.nodes, function (ret) {
            node.append(ret);
        }, node);
        return node;
    };
    Translator.prototype.visitGroup = function (block, parent) {
        var node = new ast_1.Group(block, parent);
        this.eachVisit(block.nodes, function (ret) {
            node.append(ret);
        }, node);
        return node;
    };
    Translator.prototype.visitSelector = function (block, parent) {
        var node = new ast_1.Selector(block, parent);
        this.eachVisit(block.segments, function (ret) {
            node.append(ret, 'segments');
        }, node);
        if (block.block) {
            node.append(this.visit(block.block, node));
        }
        return node;
    };
    Translator.prototype.visitProperty = function (block, parent) {
        var node = new ast_1.Property(block, parent);
        node.key = block.name || (Array.isArray(block.segments) ? block.segments.join('') : '');
        if (block.expr) {
            node.value = this.visit(block.expr, node);
        }
        return node;
    };
    Translator.prototype.visitLiteral = function (block, parent) {
        var node = new ast_1.Literal(block, parent);
        node.val = typeof block.val === 'string' ? block.val : '';
        return node;
    };
    Translator.prototype.visitString = function (block, parent) {
        return this.visitLiteral(block, parent);
    };
    Translator.prototype.visitExpression = function (block, parent) {
        var node = new ast_1.Value(block, parent);
        this.eachVisit(block.nodes, function (ret) {
            node.append(ret);
        }, node);
        return node;
    };
    Translator.prototype.visitRGBA = function (block, parent) {
        var node = new ast_1.RGB(block, parent);
        node.value = block.name || (typeof block.raw === 'string' ? block.raw : '') || '';
        return node;
    };
    Translator.prototype.visitIdent = function (block, parent) {
        var node = new ast_1.Ident(block, parent);
        node.key = block.string || block.name || '';
        if (block.val) {
            node.value = this.visit(block.val, node);
        }
        return node;
    };
    /**
     * Если импорт то только такой
     * @param block
     * @param parent
     */
    Translator.prototype.visitImport = function (block, parent) {
        var node = new ast_1.Import(block, parent);
        node.value = (block.path || '').toString().replace(/[()]/g, '');
        return node;
    };
    /**
     * Обработка $p хеша
     * @param block
     * @param parent
     */
    Translator.prototype.visitObject = function (block, parent) {
        var _this = this;
        var node = new ast_1.Obj(block, parent);
        var vals = block.vals, keys = block.keys;
        if (vals && typeof vals === 'object' && keys && typeof keys === 'object') {
            Object.keys(vals).forEach(function (key) {
                var elm = vals[key];
                if (elm) {
                    if (!keys[key]) {
                        debugger;
                    }
                    var property = new ast_1.Property(vals[key], node), keyItem = new ast_1.Ident(keys[key], property), ret = _this.visit(vals[key], property);
                    property.key = keyItem;
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
     * @param parent
     */
    Translator.prototype.visitNull = function (block, parent) {
        // console.log(block);
    };
    /**
     * Нода значений типа px или em
     * @param block
     * @param parent
     */
    Translator.prototype.visitUnit = function (block, parent) {
        var node = new ast_1.Unit(block, parent);
        node.value = typeof block.raw === 'string' ? block.raw : '';
        return node;
    };
    /**
     * Вызов миксина
     * @param block
     * @param parent
     */
    Translator.prototype.visitCall = function (block, parent) {
        var node = new ast_1.Call(block, parent);
        node.key = block.name || '';
        if (block.args) {
            this.eachVisit(block.args.nodes, function (ret) {
                node.append(ret);
            }, node);
        }
        return node;
    };
    /**
     * Получение элемента хеша
     * @param block
     * @param parent
     */
    Translator.prototype.visitMember = function (block, parent) {
        var node = new ast_1.Member(block, parent);
        if (block.left) {
            node.left = new ast_1.Ident(block.left, node);
            node.left.key = block.name || '';
        }
        if (block.right) {
            node.right = new ast_1.Ident(block.right, node);
            node.right.key = block.name || '';
        }
        return node;
    };
    /**
     * Binary operation
     * @param block
     * @param parent
     */
    Translator.prototype.visitBinOp = function (block, parent) {
        var node = new ast_1.BinOp(block, parent);
        if (block.left) {
            node.left = new ast_1.Ident(block.left, node);
        }
        if (block.right) {
            node.right = new ast_1.Ident(block.right, node);
        }
        return node;
    };
    /**
     * Declared function
     * @param block
     * @param parent
     */
    Translator.prototype.visitFunction = function (block, parent) {
        var node = new ast_1.Func(block, parent);
        node.key = block.name || '';
        this.eachVisit(block.params, function (ret) {
            node.append(ret, 'params');
        }, node);
        if (block.block) {
            node.append(this.visit(block.block, node));
        }
        if (block.params) {
            node.append(this.visit(block.params, node));
        }
        return node;
    };
    /**
     * Functions params
     * @param block
     * @param parent
     */
    Translator.prototype.visitParams = function (block, parent) {
        var node = new ast_1.Params(block, parent);
        this.eachVisit(block.nodes, function (ret) {
            node.append(ret);
        }, node);
        return node;
    };
    /**
     * Comment
     * @param block
     * @param parent
     */
    Translator.prototype.visitComment = function (block, parent) {
        return new ast_1.Comment(block, parent);
    };
    /**
     * Visit boolean value
     * @param block
     * @param parent
     */
    Translator.prototype.visitBoolean = function (block, parent) {
        return new ast_1.Bool(block, parent);
    };
    /**
     * Cycle value
     * @param block
     * @param parent
     */
    Translator.prototype.visitEach = function (block, parent) {
        return new ast_1.Each(block, parent);
    };
    /**
     * Condition nodes
     * @param block
     * @param parent
     */
    Translator.prototype.visitIf = function (block, parent) {
        var node = new ast_1.Condition(block, parent);
        if (block.block) {
            node.append(this.visit(block.block, node));
        }
        if (block.cond) {
            node.cond = this.visit(block.cond, node);
        }
        this.eachVisit(block.elses, function (ret) {
            node.append(ret);
        }, node);
        return node;
    };
    /**
     * Unary operation
     * @param block
     * @param parent
     */
    Translator.prototype.visitUnaryOp = function (block, parent) {
        var node = new ast_1.UnaryOp(block, parent);
        if (block.left) {
            node.left = new ast_1.Ident(block.left, node);
        }
        if (block.right) {
            node.right = new ast_1.Ident(block.right, node);
        }
        return node;
    };
    /**
     * Media scope
     * @param block
     * @param parent
     */
    Translator.prototype.visitMedia = function (block, parent) {
        var node = new ast_1.Media(block, parent);
        if (block.block) {
            node.append(this.visit(block.block, node));
        }
        if (block.val) {
            node.query = this.visit(block.val, node);
        }
        // Hack because stylus set Media.column on end of line
        if (this.lines[node.lineno]) {
            var column = this.lines[node.lineno].line.indexOf('@media');
            if (~column && column + 1 !== node.column) {
                node.column = column + 1;
            }
        }
        return node;
    };
    /**
     * Query list in media scope
     * @param block
     * @param parent
     */
    Translator.prototype.visitQueryList = function (block, parent) {
        var node = new ast_1.Querylist(block, parent);
        this.eachVisit(block.nodes, function (ret) {
            node.append(ret);
        }, node);
        return node;
    };
    /**
     * Query in query list
     * @param block
     * @param parent
     */
    Translator.prototype.visitQuery = function (block, parent) {
        var node = new ast_1.Query(block, parent);
        if (block.type) {
            node.type = this.visit(block.type, node);
        }
        if (block.predicate) {
            node.predicate = block.predicate;
        }
        this.eachVisit(block.nodes, function (ret) {
            node.append(ret);
        }, node);
        return node;
    };
    Translator.prototype.visitFeature = function (block, parent) {
        var node = new ast_1.Feature(block, parent);
        this.eachVisit(block.segments, function (ret) {
            node.append(ret, 'segments');
        }, node);
        if (block.expr) {
            node.append(this.visit(block.expr, node));
        }
        return node;
    };
    /**
     * Visit keyframes node
     * @param block
     * @param parent
     */
    Translator.prototype.visitKeyframes = function (block, parent) {
        var node = new ast_1.Keyframes(block, parent);
        this.eachVisit(block.segments, function (ret) {
            node.append(ret, 'segments');
        }, node);
        if (block.block) {
            node.append(this.visit(block.block, node));
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
    Visitor.prototype.methodNotExists = function (method, node) { };
    Visitor.prototype.visit = function (node, parent) {
        var method = 'visit' + node.constructor.name;
        var fn = this[method];
        if (fn && typeof fn === 'function') {
            return fn.call(this, node, parent);
        }
        this.methodNotExists(method, node);
        return this.visitNode(node, parent);
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

/***/ "./src/defaultRules.json":
/*!*******************************!*\
  !*** ./src/defaultRules.json ***!
  \*******************************/
/*! exports provided: mixedSpaces, prefixVarsWithDollar, emptyLines, commaInObject, depthControl, quotePref, semicolons, colons, color, leadingZero, useMixinInsteadUnit, sortOrder, default */
/***/ (function(module) {

module.exports = {"mixedSpaces":{"indentPref":"tab"},"prefixVarsWithDollar":{"conf":"always","prefix":"$"},"emptyLines":true,"commaInObject":["never"],"depthControl":{"indentPref":"tab"},"quotePref":["double"],"semicolons":["never"],"colons":["never"],"color":{"conf":"uppercase","enabled":true,"allowOnlyInVar":true},"leadingZero":["always"],"useMixinInsteadUnit":{"enabled":false,"conf":"always","mixin":"basis","unitType":"px"},"sortOrder":{"conf":"grouped","startGroupChecking":6,"order":[["absolute","position","z-index","top","right","bottom","left"],["content","display","flexbox","flex","flex-grow","flex-shrink","flex-basis","flex-direction","order","flex-order","flex-wrap","flex-flow","justify-content","align-self","align-items","align-content","flex-pack","flex-align","box-sizing","vertical-align","size","width","height","max-width","min-width","max-height","min-height","overflow","overflow-x","overflow-y","float","clear","visibility","opacity","margin","margin-top","margin-right","margin-bottom","margin-left","padding","padding-top","padding-right","padding-bottom","padding-left"],["font","font-family","font-size","font-weight","font-style","font-variant","font-size-adjust","font-stretch","line-height","letter-spacing","text-align","text-align-last","text-decoration","text-emphasis","text-emphasis-position","text-emphasis-style","text-emphasis-color","text-indent","text-justify","text-outline","text-transform","text-wrap","text-overflow","text-overflow-ellipsis","text-overflow-mode","word-spacing","word-wrap","word-break","tab-size","hyphens"],["pointer-events","border","border-spacing","border-collapse","border-width","border-style","border-color","border-top","border-top-width","border-top-style","border-top-color","border-right","border-right-width","border-right-style","border-right-color","border-bottom","border-bottom-width","border-bottom-style","border-bottom-color","border-left","border-left-width","border-left-style","border-left-color","border-radius","border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius","border-image","border-image-source","border-image-slice","border-image-width","border-image-outset","border-image-repeat","border-top-image","border-right-image","border-bottom-image","border-left-image","border-corner-image","border-top-left-image","border-top-right-image","border-bottom-right-image","border-bottom-left-image","color","background","filter","background-color","background-image","background-attachment","background-position","background-position-x","background-position-y","background-clip","background-origin","background-size","background-repeat","clip","list-style","outline","outline-width","outline-style","outline-color","outline-offset","cursor","box-shadow","text-shadow","table-layout","backface-visibility","will-change","transition","transform","animation"]]}};

/***/ }),

/***/ "./src/linter.ts":
/*!***********************!*\
  !*** ./src/linter.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var reporter_1 = __webpack_require__(/*! ./core/reporter */ "./src/core/reporter.ts");
var parser_1 = __webpack_require__(/*! ./core/parser */ "./src/core/parser.ts");
var checker_1 = __webpack_require__(/*! ./core/checker */ "./src/core/checker.ts");
var fs_1 = __webpack_require__(/*! fs */ "fs");
var path_1 = __webpack_require__(/*! path */ "path");
var rule_1 = __webpack_require__(/*! ./core/rule */ "./src/core/rule.ts");
var config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
var Linter = /** @class */ (function () {
    /**
     * @param options
     */
    function Linter(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        this.options = {};
        /**
         * Parse styl file and check rules
         */
        this.lint = function (path, content) {
            if (content === void 0) { content = null; }
            return __awaiter(_this, void 0, void 0, function () {
                var ast;
                return __generator(this, function (_a) {
                    path = path_1.resolve(path);
                    try {
                        if (!fs_1.existsSync(path)) {
                            throw new Error('File not exists');
                        }
                        if (typeof content !== 'string') {
                            content = fs_1.readFileSync(path, 'utf8');
                        }
                        this.checker.loadAndInitRules();
                        this.reporter.setPath(path);
                        rule_1.Rule.clearContext();
                        try {
                            ast = this.parser.parse(content);
                            this.checker.checkASTRules(ast);
                        }
                        catch (e) {
                            this.reporter.add('parse', e.message, e.lineno, e.startOffset);
                        }
                        this.checker.checkLineRules(content);
                    }
                    catch (e) {
                        if (this.config.debug) {
                            throw e;
                        }
                    }
                    return [2 /*return*/];
                });
            });
        };
        this.options = options;
        this.config = new config_1.Config(this.options);
        this.reporter = reporter_1.Reporter.getInstance(this.config.reporter, this.config.reportOptions);
        this.reporter.reset();
        this.parser = new parser_1.StylusParser(this.config.stylusParserOptions);
        this.checker = new checker_1.Checker(this);
    }
    /**
     * Print all errors or warnings
     */
    Linter.prototype.display = function (exit) {
        if (exit === void 0) { exit = true; }
        this.reporter.display(exit);
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
            this.msg('unnecessary colon found', line.lineno, index + 1);
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
var ast_1 = __webpack_require__(/*! ../core/ast */ "./src/core/ast/index.ts");
var Color = /** @class */ (function (_super) {
    __extends(Color, _super);
    function Color() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodesFilter = ['rgb'];
        return _this;
    }
    Color.prototype.checkNode = function (node) {
        var checkReg = this.state.conf !== 'lowercase' ? /[a-z]/ : /[A-Z]/;
        if (this.state.allowOnlyInVar) {
            var elm = node.parent;
            while (elm) {
                if (elm instanceof ast_1.Block) {
                    this.msg("Set color only in variable", node.lineno, node.column, node.column + node.value.length - 1);
                    break;
                }
                elm = elm.parent;
            }
        }
        if (node.value && typeof node.value === 'string' && checkReg.test(node.value)) {
            var fix = node.value.toString();
            this.msg("Only " + this.state.conf + " HEX format", node.lineno, node.column, node.column + node.value.length - 1, this.state.conf === 'uppercase' ? fix.toUpperCase() : fix.toLowerCase());
            return true;
        }
        return false;
    };
    return Color;
}(rule_1.Rule));
exports.Color = Color;


/***/ }),

/***/ "./src/rules/commaInObject.ts":
/*!************************************!*\
  !*** ./src/rules/commaInObject.ts ***!
  \************************************/
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
var reg = /(,)(\s)*$/, keyValue = /:/, hashEnd = /\}/;
var CommaInObject = /** @class */ (function (_super) {
    __extends(CommaInObject, _super);
    function CommaInObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommaInObject.prototype.checkLine = function (line) {
        if (!this.context.inHash) {
            return;
        }
        var hasComma = false;
        var match = reg.exec(line.line);
        if (match) {
            hasComma = true;
        }
        if (hasComma && this.state.conf === 'never') {
            this.msg('Remove comma from object hash', line.lineno, match ? match.index + 1 : 0);
        }
        else if (!hasComma && this.state.conf === 'always') {
            var next = line.next();
            if (keyValue.test(line.line) && !hashEnd.test(line.line) && next && !hashEnd.test(next.line)) {
                this.msg('Add comma after object key: value', line.lineno, line.line.length - 2);
            }
        }
        return hasComma;
    };
    return CommaInObject;
}(rule_1.Rule));
exports.CommaInObject = CommaInObject;


/***/ }),

/***/ "./src/rules/depthControl.ts":
/*!***********************************!*\
  !*** ./src/rules/depthControl.ts ***!
  \***********************************/
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
var ast_1 = __webpack_require__(/*! ../core/ast */ "./src/core/ast/index.ts");
var DepthControl = /** @class */ (function (_super) {
    __extends(DepthControl, _super);
    function DepthControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodesFilter = ['block', 'selector', 'obj'];
        return _this;
    }
    DepthControl.prototype.checkNode = function (node) {
        var _this = this;
        var indentPref = typeof this.state.indentPref === 'number' ? this.state.indentPref : 1;
        if (node instanceof ast_1.Block || node instanceof ast_1.Selector) {
            var parentNode_1 = node.closest('selector|media|condition|keyframes'), needCheckPreviousSelector = false, prev = parentNode_1;
            if (parentNode_1 && parentNode_1 instanceof ast_1.Selector) {
                while (prev && parentNode_1) {
                    prev = prev.previousSibling();
                    if (prev && prev instanceof ast_1.Selector && prev.lineno === parentNode_1.lineno) {
                        parentNode_1 = prev;
                    }
                    else {
                        break;
                    }
                }
            }
            if (parentNode_1) {
                if (node instanceof ast_1.Block) {
                    node.nodes.forEach(function (child) {
                        if (parentNode_1 && (child instanceof ast_1.Property || child instanceof ast_1.Media || child instanceof ast_1.Condition) && child.column - indentPref !== parentNode_1.column) {
                            _this.msg('incorrect indent', child.lineno, 0, child.column);
                        }
                    });
                }
                else if (node.column - indentPref !== parentNode_1.column) {
                    needCheckPreviousSelector = true;
                }
            }
            else if (node instanceof ast_1.Selector && node.column !== 1) {
                needCheckPreviousSelector = true;
            }
            if (needCheckPreviousSelector) {
                prev = node.previousSibling();
                if (!prev || prev.lineno !== node.lineno) {
                    this.msg('incorrect indent', node.lineno, 0, node.column);
                }
            }
            return;
        }
        if (node instanceof ast_1.Obj) {
            var key = node.closest('ident|property');
            if (key) {
                var parentColumn_1 = (key instanceof ast_1.Property && key.key instanceof ast_1.Ident) ? key.key.column : key.column;
                node.nodes.forEach(function (child) {
                    if (child instanceof ast_1.Property && child.key instanceof ast_1.Ident && child.key.column - indentPref !== parentColumn_1) {
                        _this.msg('incorrect indent', child.key.lineno, 0, child.key.column);
                    }
                });
            }
            return;
        }
    };
    return DepthControl;
}(rule_1.Rule));
exports.DepthControl = DepthControl;


/***/ }),

/***/ "./src/rules/emptyLines.ts":
/*!*********************************!*\
  !*** ./src/rules/emptyLines.ts ***!
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
/**
 * Check if document has several empty lines
 */
var EmptyLines = /** @class */ (function (_super) {
    __extends(EmptyLines, _super);
    function EmptyLines() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyLines.prototype.checkLine = function (line) {
        if (line.isEmpty()) {
            var prev = line.prev();
            if (prev && prev.isEmpty()) {
                this.msg('Deny several empty lines', line.lineno);
            }
        }
    };
    return EmptyLines;
}(rule_1.Rule));
exports.EmptyLines = EmptyLines;


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
__export(__webpack_require__(/*! ./useMixinInsteadUnit */ "./src/rules/useMixinInsteadUnit.ts"));
__export(__webpack_require__(/*! ./semicolons */ "./src/rules/semicolons.ts"));
__export(__webpack_require__(/*! ./quotePref */ "./src/rules/quotePref.ts"));
__export(__webpack_require__(/*! ./sortOrder */ "./src/rules/sortOrder.ts"));
__export(__webpack_require__(/*! ./prefixVarsWithDollar */ "./src/rules/prefixVarsWithDollar.ts"));
__export(__webpack_require__(/*! ./mixedSpaces */ "./src/rules/mixedSpaces.ts"));
__export(__webpack_require__(/*! ./commaInObject */ "./src/rules/commaInObject.ts"));
__export(__webpack_require__(/*! ./depthControl */ "./src/rules/depthControl.ts"));
__export(__webpack_require__(/*! ./emptyLines */ "./src/rules/emptyLines.ts"));


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

/***/ "./src/rules/mixedSpaces.ts":
/*!**********************************!*\
  !*** ./src/rules/mixedSpaces.ts ***!
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
/**
 * check for mixed spaces and tabs
 */
var MixedSpaces = /** @class */ (function (_super) {
    __extends(MixedSpaces, _super);
    function MixedSpaces() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MixedSpaces.prototype.checkLine = function (line) {
        var mixed = /( \t|\t )[\t\s]*/.exec(line.line), isMixed = mixed !== null;
        if (isMixed && mixed && !this.context.inComment) {
            this.msg('mixed spaces and tabs', line.lineno, mixed.index, mixed.index + mixed[0].length);
        }
        return isMixed;
    };
    return MixedSpaces;
}(rule_1.Rule));
exports.MixedSpaces = MixedSpaces;


/***/ }),

/***/ "./src/rules/prefixVarsWithDollar.ts":
/*!*******************************************!*\
  !*** ./src/rules/prefixVarsWithDollar.ts ***!
  \*******************************************/
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
var ast_1 = __webpack_require__(/*! ../core/ast */ "./src/core/ast/index.ts");
/**
 * Check that $ is used when declaring vars
 */
var PrefixVarsWithDollar = /** @class */ (function (_super) {
    __extends(PrefixVarsWithDollar, _super);
    function PrefixVarsWithDollar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodesFilter = ['ident'];
        return _this;
    }
    PrefixVarsWithDollar.prototype.checkNode = function (node) {
        if (!(node.parent instanceof ast_1.Tree) || (node.value instanceof ast_1.Func)) {
            return;
        }
        var hasDollar = node.key.indexOf(this.state.prefix) === 0;
        if (this.state.conf === 'always' && hasDollar === false) {
            //console.log(node.key.length);
            this.msg("variables and parameters must be prefixed with the " + this.state.prefix + " sign (" + node.key + ")", node.lineno, node.column, node.column + node.key.length - 1);
        }
        else if (this.state.conf === 'never' && hasDollar === true) {
            this.msg(this.state.prefix + " sign is disallowed for variables and parameters (" + node.key + ")", node.lineno, node.column, node.column + node.key.length - 1);
        }
        return hasDollar;
    };
    return PrefixVarsWithDollar;
}(rule_1.Rule));
exports.PrefixVarsWithDollar = PrefixVarsWithDollar;


/***/ }),

/***/ "./src/rules/quotePref.ts":
/*!********************************!*\
  !*** ./src/rules/quotePref.ts ***!
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
var rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
var stringRe = /(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/g;
/**
 * Check that quote style is consistent with config
 */
var QuotePref = /** @class */ (function (_super) {
    __extends(QuotePref, _super);
    function QuotePref() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QuotePref.prototype.checkLine = function (line) {
        if (line.line.indexOf('"') === -1 && line.line.indexOf("'") === -1) {
            return;
        }
        stringRe.lastIndex = 0;
        var badQuotes = false;
        var hasInnerQuote = true;
        var match;
        while ((match = stringRe.exec(line.line)) !== null) {
            var content = match[0].slice(1, -1);
            if (this.state.conf === 'single' && match[0].indexOf('"') === 0) {
                hasInnerQuote = content.indexOf("'") !== -1;
                if (!hasInnerQuote) {
                    badQuotes = true;
                    this.msg('preferred quote style is ' + this.state.conf + ' quotes', line.lineno, match.index + 1, match[0].length + match.index, match[0].replace(/^"/g, '\'').replace(/'$/g, '\''));
                }
            }
            else if (this.state.conf === 'double' && match[0].indexOf("'") === 0) {
                hasInnerQuote = content.indexOf('"') !== -1;
                if (!hasInnerQuote) {
                    badQuotes = true;
                    this.msg('preferred quote style is ' + this.state.conf + ' quotes', line.lineno, match.index + 1, match[0].length + match.index, match[0].replace(/^'/g, '"').replace(/'$/g, '"'));
                }
            }
        }
        return badQuotes;
    };
    return QuotePref;
}(rule_1.Rule));
exports.QuotePref = QuotePref;


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

/***/ "./src/rules/sortOrder.ts":
/*!********************************!*\
  !*** ./src/rules/sortOrder.ts ***!
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
var rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
var ast_1 = __webpack_require__(/*! ../core/ast */ "./src/core/ast/index.ts");
var SortOrder = /** @class */ (function (_super) {
    __extends(SortOrder, _super);
    function SortOrder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodesFilter = ['block'];
        return _this;
    }
    SortOrder.prototype.checkNode = function (node) {
        var _this = this;
        var names = [], order = this.state.order || [], startGroupChecking = this.state.startGroupChecking || 6;
        node.nodes.forEach(function (child) {
            if (child instanceof ast_1.Property || child instanceof ast_1.Value) {
                names.push(child.key.toString().toLowerCase());
            }
        });
        // sort only 2 and more properties
        if (names.length < 2) {
            return;
        }
        if (this.state.conf === 'alphabetical') {
            names.sort();
        }
        else {
            if (!this.cache.order) {
                this.cache.ketToGroup = {};
                var groupIndex_1 = 0;
                this.cache.order = order.reduce(function (sort, key) {
                    if (typeof key === 'string') {
                        sort.push(key);
                    }
                    else {
                        sort.push.apply(sort, key);
                        key.forEach(function (subkey) { return _this.cache.ketToGroup[subkey] = groupIndex_1; });
                        groupIndex_1 += 1;
                    }
                    return sort;
                }, []);
            }
            names.sort(function (keyA, keyB) {
                var values = {
                    keyA: keyA,
                    keyB: keyB
                }, index = {
                    keyA: _this.cache.order.indexOf(keyA),
                    keyB: _this.cache.order.indexOf(keyB),
                }, keys = Object.keys(index);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    if (index[key] === -1) {
                        var parts = values[key].split('-');
                        if (parts.length > 1) {
                            var l = parts.length - 1;
                            while (l > 0 && index[key] === -1) {
                                index[key] = _this.cache.order.indexOf(parts.slice(0, l).join('-'));
                                if (index[key] !== -1) {
                                    index[key] += 1;
                                }
                                l -= 1;
                            }
                        }
                    }
                    if (index[key] === -1) {
                        return values.keyA > values.keyB ? 1 : -1;
                    }
                }
                if (index.keyA === index.keyB) {
                    return values.keyA > values.keyB ? 1 : -1;
                }
                return index.keyA - index.keyB;
            });
        }
        var index = 0;
        node.nodes.forEach(function (child) {
            if (child instanceof ast_1.Property || child instanceof ast_1.Value) {
                var key = child.key.toString();
                if (names[index] !== child.key) {
                    var needIndex = names.indexOf(key);
                    _this.msg('Property must be ' + (needIndex < index ? 'higher' : 'lower') + ' - ' + names.join(', '), child.lineno, child.column, child.column + key.length);
                }
                index += 1;
            }
        });
        if (!this.errors.length &&
            names.length >= startGroupChecking &&
            this.state.conf === 'grouped') {
            var lastGroup_1 = null;
            node.nodes.forEach(function (node) {
                if (node instanceof ast_1.Property) {
                    var key = node.key.toString(), group = _this.cache.ketToGroup[key];
                    if (group === undefined) {
                        var parts = key.split('-');
                        if (parts.length > 1) {
                            var l = parts.length - 1;
                            while (l > 0 && group === undefined) {
                                group = _this.cache.ketToGroup[parts.slice(0, l).join('-')];
                                l -= 1;
                            }
                        }
                    }
                    if (group !== undefined && group !== lastGroup_1) {
                        if (lastGroup_1 !== null) {
                            var prev = node.previousSibling();
                            if (prev && prev.lineno === node.lineno - 1) {
                                _this.msg('Need new line after group', prev.lineno, prev.column, prev.column);
                            }
                        }
                        lastGroup_1 = group;
                    }
                }
            });
        }
    };
    return SortOrder;
}(rule_1.Rule));
exports.SortOrder = SortOrder;


/***/ }),

/***/ "./src/rules/useMixinInsteadUnit.ts":
/*!******************************************!*\
  !*** ./src/rules/useMixinInsteadUnit.ts ***!
  \******************************************/
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
var useMixinInsteadUnit = /** @class */ (function (_super) {
    __extends(useMixinInsteadUnit, _super);
    function useMixinInsteadUnit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodesFilter = ['unit', 'call'];
        return _this;
    }
    useMixinInsteadUnit.prototype.checkNode = function (node) {
        if (this.state.conf === 'always') {
            if (node.value && typeof node.value === 'string') {
                var unit = RegExp('([\\d]+)' + this.state.unitType).exec(node.value);
                if (unit) {
                    var extraInfo = '';
                    if (this.state.mixin === 'basis') {
                        var unitSize = Number(unit[1]), basis = (unitSize / 8);
                        extraInfo = " (basis(" + basis + "))";
                    }
                    this.msg("Use \"" + this.state.mixin + "\" mixin instead \"" + this.state.unitType + "\"" + extraInfo, node.lineno, node.column, node.column + node.value.length - 1);
                    return true;
                }
            }
        }
        else {
            if (node.nodeName === 'call' && typeof node.key === 'string' && node.key === this.state.mixin) {
                this.msg("Do not use \"" + this.state.mixin + "\" mixin", node.lineno, node.column, node.column + node.key.length - 1);
            }
        }
        return false;
    };
    return useMixinInsteadUnit;
}(rule_1.Rule));
exports.useMixinInsteadUnit = useMixinInsteadUnit;


/***/ }),

/***/ "./src/watcher.ts":
/*!************************!*\
  !*** ./src/watcher.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var watch = __webpack_require__(/*! node-watch */ "node-watch");
var Watcher = /** @class */ (function () {
    function Watcher() {
    }
    Watcher.prototype.start = function (path, callback) {
        watch(path, {
            encoding: 'utf-8',
            recursive: true,
            filter: /\.styl$/
        }, callback);
    };
    return Watcher;
}());
exports.Watcher = Watcher;


/***/ }),

/***/ "async":
/*!************************!*\
  !*** external "async" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "columnify":
/*!****************************!*\
  !*** external "columnify" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("columnify");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),

/***/ "native-require":
/*!*********************************!*\
  !*** external "native-require" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("native-require");

/***/ }),

/***/ "node-watch":
/*!*****************************!*\
  !*** external "node-watch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-watch");

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

/***/ "stylus/lib/parser":
/*!************************************!*\
  !*** external "stylus/lib/parser" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stylus/lib/parser");

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
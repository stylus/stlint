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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const linter_1 = __webpack_require__(/*! ./src/linter */ "./src/linter.ts");
const reader_1 = __webpack_require__(/*! ./src/core/reader */ "./src/core/reader.ts");
const astList = __webpack_require__(/*! ./src/core/ast/index */ "./src/core/ast/index.ts");
__export(__webpack_require__(/*! ./src/core/rule */ "./src/core/rule.ts"));
exports.ast = astList;
__export(__webpack_require__(/*! ./src/doc */ "./src/doc.ts"));
__export(__webpack_require__(/*! ./src/linter */ "./src/linter.ts"));
/**
 * Main stylus checker
 *
 * @param path
 * @param content
 * @param options
 * @constructor
 */
function StylusLinter(path, content, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const linter = new linter_1.Linter(options), first = () => Array.isArray(path) ? path[0] : path;
        if (content) {
            linter.lint(first(), content);
            return linter.display();
        }
        if (!path) {
            path = linter.config.path || process.cwd();
        }
        const reader = new reader_1.Reader(linter.config), readAndDisplay = () => __awaiter(this, void 0, void 0, function* () {
            yield reader.read(path, linter.lint.bind(linter));
            linter.display(!linter.config.watch);
        });
        if (linter.config.watch) {
            linter.watch(Array.isArray(path) ? path[0] : path, readAndDisplay);
        }
        yield readAndDisplay();
    });
}
exports.StylusLinter = StylusLinter;


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, bin, files, repository, bugs, scripts, keywords, author, license, dependencies, devDependencies, mocha, default */
/***/ (function(module) {

module.exports = {"name":"stlint","version":"1.0.17","description":"Stylus Linter","main":"index.js","bin":{"stlint":"./bin/stlint"},"files":["bin/","index.js","src/"],"repository":{"type":"git","url":"https://github.com/stylus/stlint"},"bugs":{"url":"https://github.com/stylus/stlint/issues"},"scripts":{"newversion":"npm test && npm version patch --no-git-tag-version && npm run build && npm run doc && npm run newversiongit && npm publish ./","newversiongit":"git add --all  && git commit -m \"New version $npm_package_version. Read more https://github.com/stylus/stlint/releases/tag/$npm_package_version \" && git tag $npm_package_version && git push --tags origin HEAD:master","start":"webpack --watch","build":"webpack","doc":"./bin/stlint --doc rules --fix","test2":"./bin/stlint ./test.styl","test":"mocha tests/**/**.ts tests/**.ts","fix":"tslint -c tslint.json ./src/**/*.ts ./src/**/**/*.ts ./src/*.ts --fix"},"keywords":["lint","linter","stylus","stylus-linter","stlint"],"author":"Chupurnov Valeriy<chupurnov@gmail.com>","license":"MIT","dependencies":{"async":"^2.6.2","chalk":"^2.4.2","columnify":"^1.5.4","glob":"^7.1.3","native-require":"^1.1.4","node-watch":"^0.6.0","strip-json-comments":"^2.0.1","stylus":"github:stylus/stylus#fix-source-maps-bugs","tslint":"^5.14.0","yargs":"^13.2.2"},"devDependencies":{"@types/async":"^2.4.1","@types/chai":"^4.1.7","@types/glob":"^7.1.1","@types/mocha":"^5.2.6","@types/node":"^11.11.5","awesome-typescript-loader":"^5.2.1","chai":"^4.2.0","mocha":"^6.0.1","ts-node":"^8.0.3","tslint-config-prettier":"^1.18.0","tslint-plugin-prettier":"^2.0.1","typescript":"^3.3.4000","typings":"^2.1.1","webpack":"^4.29.5","webpack-cli":"^3.3.0","webpack-node-externals":"^1.7.2"},"mocha":{"require":["ts-node/register","tests/staff/bootstrap.ts"]}};

/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const data = __webpack_require__(/*! ./defaultRules.json */ "./src/defaultRules.json");
const baseConfig_1 = __webpack_require__(/*! ./core/baseConfig */ "./src/core/baseConfig.ts");
const chalk_1 = __webpack_require__(/*! chalk */ "chalk");
const path_1 = __webpack_require__(/*! path */ "path");
class Config extends baseConfig_1.BaseConfig {
    constructor(options) {
        super();
        this.debug = false;
        this.reporter = 'raw';
        this.rules = Object.assign({}, data);
        this.defaultRules = Object.freeze(Object.assign({}, data));
        this.excludes = ['node_modules/'];
        this.watch = false;
        this.path = '';
        this.grep = '';
        this.doc = '';
        this.fix = false;
        this.stylusParserOptions = {};
        this.extends = '';
        this.reportOptions = {
            columnSplitter: ' | ',
            headingTransform: (heading) => chalk_1.default.yellow(heading.toUpperCase()),
            maxWidth: 70,
            minWidth: 10,
            truncate: false
        };
        this.extendsOption(options, this);
        if (!this.configFile) {
            this.configFile = path_1.resolve(process.cwd(), this.configName);
        }
        this.readConfig(this.configFile);
        if (this.extends) {
            if (Array.isArray(this.extends)) {
                this.extends.forEach(this.extendsByPath.bind(this));
            }
            else {
                this.extendsByPath(this.extends);
            }
        }
        delete options.extraRules;
        this.extendsOption(options, this); // options are main
    }
}
exports.Config = Config;


/***/ }),

/***/ "./src/core/ast/atrule.ts":
/*!********************************!*\
  !*** ./src/core/ast/atrule.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Atrule extends node_1.Node {
}
exports.Atrule = Atrule;


/***/ }),

/***/ "./src/core/ast/binop.ts":
/*!*******************************!*\
  !*** ./src/core/ast/binop.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class BinOp extends node_1.Node {
    constructor() {
        super(...arguments);
        this.left = null;
        this.right = null;
    }
    toString() {
        let right = this.right ? this.right.toString() : '';
        if (right) {
            right = /^[0-9]$/.test(right) ? `[${right}]` : `.${right}`;
        }
        return (this.left && right) ? this.left.toString() + right : super.toString();
    }
}
exports.BinOp = BinOp;


/***/ }),

/***/ "./src/core/ast/block.ts":
/*!*******************************!*\
  !*** ./src/core/ast/block.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Block extends node_1.Node {
}
exports.Block = Block;


/***/ }),

/***/ "./src/core/ast/bool.ts":
/*!******************************!*\
  !*** ./src/core/ast/bool.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Bool extends node_1.Node {
}
exports.Bool = Bool;


/***/ }),

/***/ "./src/core/ast/call.ts":
/*!******************************!*\
  !*** ./src/core/ast/call.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Call extends node_1.Node {
    constructor() {
        super(...arguments);
        this.key = '';
    }
    toString() {
        return `${this.key}(${this.nodes.map((arg) => arg.toString(), this).join(', ')})`;
    }
}
exports.Call = Call;


/***/ }),

/***/ "./src/core/ast/comment.ts":
/*!*********************************!*\
  !*** ./src/core/ast/comment.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Comment extends node_1.Node {
    constructor() {
        super(...arguments);
        this.value = '';
    }
}
exports.Comment = Comment;


/***/ }),

/***/ "./src/core/ast/condition.ts":
/*!***********************************!*\
  !*** ./src/core/ast/condition.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Condition extends node_1.Node {
    constructor() {
        super(...arguments);
        this.cond = null;
    }
}
exports.Condition = Condition;


/***/ }),

/***/ "./src/core/ast/each.ts":
/*!******************************!*\
  !*** ./src/core/ast/each.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Each extends node_1.Node {
}
exports.Each = Each;


/***/ }),

/***/ "./src/core/ast/feature.ts":
/*!*********************************!*\
  !*** ./src/core/ast/feature.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Feature extends node_1.Node {
    constructor() {
        super(...arguments);
        this.segments = [];
    }
    toString() {
        return this.segments.join('');
    }
}
exports.Feature = Feature;


/***/ }),

/***/ "./src/core/ast/func.ts":
/*!******************************!*\
  !*** ./src/core/ast/func.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Func extends node_1.Node {
    constructor() {
        super(...arguments);
        this.key = '';
        this.value = '';
        this.params = [];
    }
}
exports.Func = Func;


/***/ }),

/***/ "./src/core/ast/group.ts":
/*!*******************************!*\
  !*** ./src/core/ast/group.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Group extends node_1.Node {
}
exports.Group = Group;


/***/ }),

/***/ "./src/core/ast/ident.ts":
/*!*******************************!*\
  !*** ./src/core/ast/ident.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Ident extends node_1.Node {
    constructor() {
        super(...arguments);
        this.key = '';
        this.value = null;
    }
}
exports.Ident = Ident;


/***/ }),

/***/ "./src/core/ast/import.ts":
/*!********************************!*\
  !*** ./src/core/ast/import.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Import extends node_1.Node {
    constructor() {
        super(...arguments);
        this.value = '';
    }
}
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
__export(__webpack_require__(/*! ./atrule */ "./src/core/ast/atrule.ts"));


/***/ }),

/***/ "./src/core/ast/keyframes.ts":
/*!***********************************!*\
  !*** ./src/core/ast/keyframes.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Keyframes extends node_1.Node {
}
exports.Keyframes = Keyframes;


/***/ }),

/***/ "./src/core/ast/literal.ts":
/*!*********************************!*\
  !*** ./src/core/ast/literal.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Literal extends node_1.Node {
    constructor() {
        super(...arguments);
        this.val = '';
    }
    toString() {
        return this.val;
    }
}
exports.Literal = Literal;


/***/ }),

/***/ "./src/core/ast/media.ts":
/*!*******************************!*\
  !*** ./src/core/ast/media.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Media extends node_1.Node {
    constructor() {
        super(...arguments);
        this.query = null;
    }
}
exports.Media = Media;


/***/ }),

/***/ "./src/core/ast/member.ts":
/*!********************************!*\
  !*** ./src/core/ast/member.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Member extends node_1.Node {
    constructor() {
        super(...arguments);
        this.left = null;
        this.right = null;
    }
    toString() {
        return (this.left && this.right) ? `${this.left.toString()}.${this.right.toString()}` : super.toString();
    }
}
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
class Node {
    constructor(block, parent) {
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
    get nodeName() {
        return this.constructor.name.toLowerCase();
    }
    append(node, listField = 'nodes') {
        const list = this[listField];
        if (list && Array.isArray(list) && node instanceof Node) {
            list.push(node);
        }
        node.parent = this;
    }
    /**
     * Use stylus source
     */
    toString() {
        if (this.source) {
            return this.source.toString();
        }
        return this.value ? this.value.toString() : ' ';
    }
    getSibling(next = false) {
        if (this.parent && this.parent.nodes.length) {
            const index = this.parent.nodes.indexOf(this);
            if (index !== -1 && ((!next && index > 0) || (next && index < this.parent.nodes.length - 2))) {
                return this.parent.nodes[index + (next ? 1 : -1)] || null;
            }
        }
        return null;
    }
    /**
     * Get previous node in parent.nodes
     */
    previousSibling() {
        return this.getSibling();
    }
    /**
     * Get next node in parent.nodes
     */
    nextSibling() {
        return this.getSibling(true);
    }
    /**
     * Get matched parent
     * @param parentClass
     */
    closest(parentClass) {
        const reg = RegExp(`^(${parentClass})$`, 'i');
        let node = this.parent;
        while (node) {
            if (reg.test(node.nodeName)) {
                return node;
            }
            node = node.parent;
        }
        return null;
    }
    getChild(findClass, last = false) {
        let node = this.nodes[last ? this.nodes.length - 1 : 0];
        if (findClass === undefined) {
            return node || null;
        }
        if (node) {
            const reg = RegExp(`^(${findClass})$`, 'i');
            while (node) {
                if (reg.test(node.nodeName)) {
                    return node;
                }
                node = (last ? node.previousSibling() : node.nextSibling());
            }
        }
        return null;
    }
    /**
     * Get first matched child
     * @param findClass
     */
    lastChild(findClass) {
        return this.getChild(findClass, true);
    }
    /**
     * Get last matched child
     * @param findClass
     */
    firstChild(findClass) {
        return this.getChild(findClass, false);
    }
}
exports.Node = Node;


/***/ }),

/***/ "./src/core/ast/obj.ts":
/*!*****************************!*\
  !*** ./src/core/ast/obj.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Obj extends node_1.Node {
}
exports.Obj = Obj;


/***/ }),

/***/ "./src/core/ast/params.ts":
/*!********************************!*\
  !*** ./src/core/ast/params.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Params extends node_1.Node {
}
exports.Params = Params;


/***/ }),

/***/ "./src/core/ast/property.ts":
/*!**********************************!*\
  !*** ./src/core/ast/property.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Property extends node_1.Node {
    constructor() {
        super(...arguments);
        this.key = '';
        this.value = null;
    }
}
exports.Property = Property;


/***/ }),

/***/ "./src/core/ast/query.ts":
/*!*******************************!*\
  !*** ./src/core/ast/query.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Query extends node_1.Node {
    constructor() {
        super(...arguments);
        this.predicate = '';
        this.type = null;
    }
}
exports.Query = Query;


/***/ }),

/***/ "./src/core/ast/querylist.ts":
/*!***********************************!*\
  !*** ./src/core/ast/querylist.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Querylist extends node_1.Node {
}
exports.Querylist = Querylist;


/***/ }),

/***/ "./src/core/ast/rgb.ts":
/*!*****************************!*\
  !*** ./src/core/ast/rgb.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const unit_1 = __webpack_require__(/*! ./unit */ "./src/core/ast/unit.ts");
class RGB extends unit_1.Unit {
}
exports.RGB = RGB;


/***/ }),

/***/ "./src/core/ast/selector.ts":
/*!**********************************!*\
  !*** ./src/core/ast/selector.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Selector extends node_1.Node {
    constructor() {
        super(...arguments);
        this.segments = [];
    }
    toString() {
        return this.segments.join('');
    }
}
exports.Selector = Selector;


/***/ }),

/***/ "./src/core/ast/tree.ts":
/*!******************************!*\
  !*** ./src/core/ast/tree.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Tree extends node_1.Node {
    constructor(block) {
        super(block, null);
        this.parent = null;
    }
}
exports.Tree = Tree;


/***/ }),

/***/ "./src/core/ast/unaryop.ts":
/*!*********************************!*\
  !*** ./src/core/ast/unaryop.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class UnaryOp extends node_1.Node {
    constructor() {
        super(...arguments);
        this.left = null;
        this.right = null;
    }
}
exports.UnaryOp = UnaryOp;


/***/ }),

/***/ "./src/core/ast/unit.ts":
/*!******************************!*\
  !*** ./src/core/ast/unit.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Unit extends node_1.Node {
    constructor() {
        super(...arguments);
        this.value = '';
    }
}
exports.Unit = Unit;


/***/ }),

/***/ "./src/core/ast/value.ts":
/*!*******************************!*\
  !*** ./src/core/ast/value.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = __webpack_require__(/*! ./node */ "./src/core/ast/node.ts");
class Value extends node_1.Node {
    get key() {
        if (this.nodes.length && this.nodes[0].key) {
            return String(this.nodes[0].key);
        }
        return '';
    }
    toString() {
        return this.nodes.join(' ');
    }
}
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
const isPlainObject_1 = __webpack_require__(/*! ./helpers/isPlainObject */ "./src/core/helpers/isPlainObject.ts");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const stripJsonComments = __webpack_require__(/*! strip-json-comments */ "strip-json-comments");
const path_1 = __webpack_require__(/*! path */ "path");
class BaseConfig {
    constructor() {
        this.configName = '.stlintrc';
        this.configFile = '';
        this.extraRules = '';
    }
    /**
     * Wrapper for path.statSync
     * @param path
     */
    statSync(path) {
        return fs_1.statSync(path);
    }
    /**
     * Read JSON File
     */
    readJSONFile(configFile) {
        if (fs_1.existsSync(configFile)) {
            try {
                return JSON.parse(stripJsonComments(fs_1.readFileSync(configFile, 'utf8')));
            }
            catch (_a) { }
        }
        return {};
    }
    /**
     * Try read config file .stlintrc
     */
    readConfig(configFile) {
        const customConfig = this.readJSONFile(configFile);
        if (customConfig) {
            this.extendsOption(customConfig, this);
            if (this.extraRules) {
                const dir = path_1.dirname(configFile), normalizePath = (extra) => path_1.resolve(dir, extra);
                this.extraRules = Array.isArray(this.extraRules) ?
                    this.extraRules.map(normalizePath) : normalizePath(this.extraRules);
            }
        }
    }
    /**
     * Extends default options by some object
     *
     * @param from
     * @param to
     */
    extendsOption(from, to) {
        Object.keys(from).forEach((key) => {
            if (isPlainObject_1.isPlainObject(from[key]) && isPlainObject_1.isPlainObject(to[key])) {
                this.extendsOption(from[key], to[key]);
            }
            else if (Array.isArray(from[key]) && Array.isArray(to[key])) {
                to[key] = to[key].map((val, index) => (from[key][index] !== undefined) ? from[key][index] : to[key][index]);
            }
            else {
                to[key] = from[key];
            }
        });
    }
    /**
     * Load extra config files
     */
    extendsByPath(pathOrPackage) {
        const path = /^\./.test(pathOrPackage) ?
            path_1.resolve(process.cwd(), pathOrPackage) : path_1.resolve(process.cwd(), 'node_modules', pathOrPackage), stat = this.statSync(path);
        if (stat.isFile()) {
            this.readConfig(path);
        }
        else {
            this.readConfig(path_1.resolve(path, this.configName));
        }
    }
}
exports.BaseConfig = BaseConfig;


/***/ }),

/***/ "./src/core/checker.ts":
/*!*****************************!*\
  !*** ./src/core/checker.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rules = __webpack_require__(/*! ../rules/index */ "./src/rules/index.ts");
const runner_1 = __webpack_require__(/*! ./runner */ "./src/core/runner.ts");
const rule_1 = __webpack_require__(/*! ./rule */ "./src/core/rule.ts");
const lcfirst_1 = __webpack_require__(/*! ./helpers/lcfirst */ "./src/core/helpers/lcfirst.ts");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const path_1 = __webpack_require__(/*! path */ "path");
const _require = __webpack_require__(/*! native-require */ "native-require");
class Checker {
    constructor(linter) {
        this.linter = linter;
        this.rulesListForNodes = [];
        this.rulesListForLines = [];
        this.rulesList = [];
    }
    /**
     * Load and init rules (and external rules too)
     */
    loadAndInitRules() {
        this.rulesList = this.initRules(rules);
        if (this.linter.config.extraRules) {
            const extraRules = this.loadRules(this.linter.config.extraRules);
            this.rulesList = this.rulesList.concat(this.initRules(extraRules));
        }
        this.rulesListForLines = this.rulesList.filter((rule) => rule.checkLine);
        this.rulesListForNodes = this.rulesList.filter((rule) => rule.checkNode);
    }
    /**
     * Create instance od all rules all rules
     * @param rulesConstructors
     */
    initRules(rulesConstructors) {
        const rulesNames = Object.keys(rulesConstructors), config = this.linter.config;
        return rulesNames
            .filter((key) => typeof rulesConstructors[key] === 'function')
            .map((key) => {
            if (!(rulesConstructors[key].prototype instanceof rule_1.Rule)) {
                rulesConstructors[key].prototype = new rule_1.Rule({ conf: 'always' });
                rulesConstructors[key].prototype.constructor = rulesConstructors[key];
            }
            return key;
        })
            .map((key) => {
            let options = config.rules[lcfirst_1.lcfirst(key)];
            if (options === true && config.defaultRules[lcfirst_1.lcfirst(key)]) {
                options = config.defaultRules[lcfirst_1.lcfirst(key)];
            }
            return new rulesConstructors[key](options);
        })
            .filter((rule) => rule.state.enabled);
    }
    /**
     * Load rules from folder
     */
    loadRules(path) {
        let results = {};
        if (Array.isArray(path)) {
            path.map(this.loadRules.bind(this)).forEach((rules) => {
                results = Object.assign({}, results, rules);
            });
            return results;
        }
        const stat = fs_1.statSync(path);
        if (stat.isFile()) {
            results = Object.assign({}, results, this.requireRule(path));
        }
        else if (stat.isDirectory()) {
            fs_1.readdirSync(path).forEach((file) => {
                // @ts-ignore
                results = Object.assign({}, results, this.requireRule(path_1.resolve(path, file)));
            });
        }
        return results;
    }
    /**
     * Load one rule or several rules
     * @param path
     */
    requireRule(path) {
        if (/\.js$/.test(path)) {
            try {
                const rule = _require(`${path}`);
                if (typeof rule === 'function') {
                    return {
                        [rule.name]: rule
                    };
                }
                else {
                    return Object.assign({}, rule);
                }
            }
            catch (e) {
                this.linter.reporter.add('JS', e.message, 1, 1);
            }
        }
        return {};
    }
    /**
     * Check whole AST
     *
     * @param ast
     */
    checkASTRules(ast, lines) {
        try {
            const runner = new runner_1.Runner(ast, this.check.bind(this, lines));
            runner.visit(ast, null);
        }
        catch (e) {
            this.linter.reporter.add('astError', e.message, e.lineno || 1, 0);
        }
        finally {
            this.afterCheck();
        }
    }
    /**
     * Check line by line
     * @param content
     */
    checkLineRules(content, lines) {
        try {
            lines
                .forEach((line, index) => {
                if (index && !line.isIgnored) {
                    rule_1.Rule.beforeCheckLine(line);
                    this.rulesListForLines.forEach((rule) => rule.checkLine && rule.checkLine(line, index, lines));
                }
            });
        }
        catch (e) {
            this.linter.reporter.add('Line', e.message, e.lineno || 1, 0);
        }
        finally {
            this.afterCheck();
        }
    }
    check(lines, node) {
        const type = node.nodeName;
        rule_1.Rule.beforeCheckNode(node);
        this.rulesListForNodes.forEach((rule) => {
            const line = lines[node.lineno];
            if (line && !line.isIgnored && rule.checkNode && rule.isMatchType(type)) {
                rule.checkNode(node, lines);
            }
        });
    }
    ;
    /**
     * After checking put errors in reporter
     */
    afterCheck() {
        const reporter = this.linter.reporter;
        this.rulesList.forEach((rule) => {
            rule.errors.forEach((msg) => reporter.add.apply(reporter, msg));
            rule.clearErrors();
        });
        reporter.fillResponse();
    }
}
exports.Checker = Checker;


/***/ }),

/***/ "./src/core/documentator/documentator.ts":
/*!***********************************************!*\
  !*** ./src/core/documentator/documentator.ts ***!
  \***********************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(/*! ../../config */ "./src/config.ts");
const glob_1 = __webpack_require__(/*! glob */ "glob");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const readmePatcher_1 = __webpack_require__(/*! ./readmePatcher */ "./src/core/documentator/readmePatcher.ts");
// @ts-ignore
const ts = __webpack_require__(/*! typescript */ "typescript");
const lcfirst_1 = __webpack_require__(/*! ../helpers/lcfirst */ "./src/core/helpers/lcfirst.ts");
/**
 * Visit all ts nodes
 *
 * @param callback
 * @param node
 */
function visit(callback, node) {
    callback(node);
    ts.forEachChild(node, visit.bind(null, callback));
}
class Documentator {
    constructor(options) {
        this.config = new config_1.Config(options);
    }
    /**
     * Generate documentation
     */
    generate() {
        switch (this.config.doc) {
            default:
                this.generateRules();
        }
    }
    /**
     * Generate rules docs
     */
    generateRules() {
        const result = [];
        new glob_1.Glob('./src/rules/*.ts', {}, (err, files) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                throw err;
            }
            files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
                const match = /\/(\w+)\.ts/.exec(file);
                if (match) {
                    const rule = match[1];
                    if (rule !== 'index') {
                        const sourceFile = ts.createSourceFile(file, fs_1.readFileSync(file).toString(), ts.ScriptTarget.ES2018, 
                        /*setParentNodes */ true);
                        visit((node) => {
                            switch (node.kind) {
                                case ts.SyntaxKind.ClassDeclaration: {
                                    const name = lcfirst_1.lcfirst(node.name.escapedText);
                                    let description = (node.jsDoc && node.jsDoc[0]) ? node.jsDoc[0].comment : '';
                                    description = description
                                        .replace(/\t/g, '  ')
                                        .replace(/(```stylus)(.*)(```)/s, (...match) => {
                                        match[2] = match[2]
                                            .split('\n')
                                            .map((line) => line
                                            .replace(/^[ \t]+\*/g, '')
                                            .replace(/^ /g, ''))
                                            .join('\n');
                                        return `${match[1]}${match[2]}${match[3]}`;
                                    });
                                    result.push({
                                        name,
                                        description,
                                        default: this.config.defaultRules[name]
                                    });
                                }
                            }
                        }, sourceFile);
                    }
                }
            }));
            if (!this.config.fix) {
                return this.log(result);
            }
            readmePatcher_1.readmePatcher(result);
        }));
    }
    /**
     *
     * @param data
     */
    log(data) {
        console.log(JSON.stringify(data));
        process.exit();
    }
}
exports.Documentator = Documentator;


/***/ }),

/***/ "./src/core/documentator/readmePatcher.ts":
/*!************************************************!*\
  !*** ./src/core/documentator/readmePatcher.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __webpack_require__(/*! fs */ "fs");
/**
 * Patch readme file
 * @param result
 */
function readmePatcher(result) {
    const readmeFile = process.cwd() + '/readme.md';
    fs_1.readFile(readmeFile, 'utf-8', (err, readme) => {
        if (err) {
            throw err;
        }
        const text = result.map((item) => [
            '\n',
            `### ${item.name}`,
            `${item.description}\n`,
            '**Default value**',
            '```json',
            `${JSON.stringify(item.default, null, 2)}`,
            '```',
            '----'
        ].join('\n')).join('');
        const readmeNew = readme.replace(/<!-- RULES START -->(.*)<!-- RULES END -->/msg, `<!-- RULES START -->${text}<!-- RULES END -->`);
        if (readmeNew !== readme) {
            fs_1.writeFileSync(readmeFile, readmeNew);
            console.log('Readme file patched');
        }
        else {
            console.log('Readme file not patched');
        }
    });
}
exports.readmePatcher = readmePatcher;


/***/ }),

/***/ "./src/core/helpers/calcPosition.ts":
/*!******************************************!*\
  !*** ./src/core/helpers/calcPosition.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const splitLines_1 = __webpack_require__(/*! ./splitLines */ "./src/core/helpers/splitLines.ts");
/**
 * Calc position in text by line and column
 *
 * @param line
 * @param column
 * @param content
 */
exports.calcPosition = (line, column, content) => {
    if (line === 1) {
        return column - 1;
    }
    const lines = content.split(splitLines_1.SPLIT_REG);
    let position = 0;
    for (let i = 0; i < line - 1 && i < lines.length; i += 1) {
        position += lines[i].length + 1;
    }
    return position + column - 1;
};


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
exports.isPlainObject = (obj) => {
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
exports.lcfirst = (str) => str[0].toLowerCase() + str.substr(1);


/***/ }),

/***/ "./src/core/helpers/objToHash.ts":
/*!***************************************!*\
  !*** ./src/core/helpers/objToHash.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__(/*! ../ast/index */ "./src/core/ast/index.ts");
exports.objTohash = (node) => {
    const result = {};
    node.nodes.forEach((prop) => {
        if (prop instanceof index_1.Property && prop.key instanceof index_1.Ident && prop.value) {
            const subkey = prop.key.key;
            if (prop.value.nodes && prop.value.nodes[0] && prop.value.nodes[0] instanceof index_1.Obj) {
                result[subkey] = exports.objTohash(prop.value.nodes[0]);
            }
            else {
                if (prop.value.nodes.length > 1) {
                    result[subkey] = prop.value.nodes.map((node) => node.toString());
                }
                else {
                    result[subkey] = prop.value.toString();
                }
            }
        }
    });
    return result;
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
const line_1 = __webpack_require__(/*! ../line */ "./src/core/line.ts");
exports.SPLIT_REG = /\n/;
/**
 * Split line on lines
 * @param content
 */
function splitLines(content) {
    const lines = [];
    content.split(exports.SPLIT_REG)
        .forEach((ln, index) => {
        lines[index + 1] = new line_1.Line(ln, index + 1, lines);
    });
    return lines;
}
exports.splitLines = splitLines;


/***/ }),

/***/ "./src/core/helpers/unwrapObject.ts":
/*!******************************************!*\
  !*** ./src/core/helpers/unwrapObject.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const isPlainObject_1 = __webpack_require__(/*! ./isPlainObject */ "./src/core/helpers/isPlainObject.ts");
exports.unwrapObject = (obj, prefix = []) => {
    let result = {};
    Object.keys(obj).forEach((_key) => {
        const key = prefix.concat([_key]).join('.'), item = obj[_key];
        if (Array.isArray(item)) {
            item.forEach((value, index) => {
                result[value] = `${key}[${index}]`;
            });
        }
        else if (isPlainObject_1.isPlainObject(item)) {
            result = Object.assign({}, result, exports.unwrapObject(item, prefix.concat([_key])));
        }
        else {
            result[item] = key;
        }
    });
    return result;
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
class Line {
    constructor(line, lineno = 1, lines = []) {
        this.lineno = 1;
        this.isIgnored = false;
        this.lines = [];
        this.line = line;
        this.lineno = lineno;
        this.lines = lines;
    }
    /**
     * Get next line
     */
    next() {
        const index = this.lines.indexOf(this);
        if (index !== -1) {
            return this.lines[index + 1] || null;
        }
        return null;
    }
    /**
     * Get previous line
     */
    prev() {
        const index = this.lines.indexOf(this);
        if (index !== -1) {
            return this.lines[index - 1] || null;
        }
        return null;
    }
    /**
     * Check the line is empty
     */
    isEmpty() {
        return this.line.trim().length === 0;
    }
}
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
const Parser = __webpack_require__(/*! stylus/lib/parser */ "stylus/lib/parser");
const translator_1 = __webpack_require__(/*! ./translator */ "./src/core/translator.ts");
const splitLines_1 = __webpack_require__(/*! ./helpers/splitLines */ "./src/core/helpers/splitLines.ts");
class StylusParser {
    /**
     * @param options Stylus parser options
     */
    constructor(options = {}) {
        this.options = options;
    }
    /**
     * Parse use native stylus parser into StylusAST and convert it in our AST
     *
     * @param {string} content
     * @returns {Tree}
     */
    parse(content) {
        const parser = new Parser(content, this.options);
        try {
            const stylusAST = parser.parse();
            const translator = new translator_1.Translator(stylusAST, splitLines_1.splitLines(content));
            return translator.transpile();
        }
        catch (err) {
            err.lineno = parser.lexer.lineno || err.lineno || 1;
            err.column = parser.lexer.column || err.column || 1;
            err.message = `Syntax error: ${err.message} (${err.lineno},${err.column})`;
            throw err;
        }
    }
}
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
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __webpack_require__(/*! glob */ "glob");
const path_1 = __webpack_require__(/*! path */ "path");
const async_1 = __webpack_require__(/*! async */ "async");
const fs_1 = __webpack_require__(/*! fs */ "fs");
class Reader {
    constructor(config) {
        this.config = config;
    }
    /**
     * Check `dir` parameter for folder or file call `readFolder` or `readFiles`
     *
     * @param dir
     * @param callback
     * @return Promise
     */
    read(dir, callback) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            if (typeof dir !== 'string' && !(dir instanceof Array)) {
                throw new TypeError('getFiles err. Expected string or array, but received: ' + typeof dir);
            }
            if (typeof dir === 'string') {
                if (dir === process.cwd()) {
                    dir = dir + '/**/*.styl';
                    yield this.readFolder(dir, callback);
                    resolve();
                    return;
                }
                return fs_1.stat(dir, (err, stats) => __awaiter(this, void 0, void 0, function* () {
                    if (!stats || err) {
                        throw Error('Stlint Error: No such file or dir exists!');
                    }
                    if (stats.isFile()) {
                        yield this.readFiles([dir.toString()], callback);
                    }
                    else if (stats.isDirectory()) {
                        yield this.readFolder(dir.toString() + '/**/*.styl', callback);
                    }
                    resolve();
                }));
            }
            return Promise.all(dir.map((path) => this.read(path, callback)));
        }));
    }
    /**
     * Find all 'styl' files in the directory and call `readFiles`
     *
     * @param dir
     * @param callback
     * @return Promise
     */
    readFolder(dir, callback) {
        return new Promise((resolve) => new glob_1.Glob(dir, {}, (err, files) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                throw err;
            }
            if (this.config.excludes && this.config.excludes.length) {
                files = files.filter((file) => {
                    const relPath = path_1.relative(dir.replace('/**/*.styl', ''), file);
                    return !this.config.excludes.some((exclude) => {
                        const reg = new RegExp(exclude);
                        return reg.test(relPath);
                    });
                });
            }
            yield this.readFiles(files, callback);
            resolve();
        })));
    }
    /**
     * Read all files from array and call ReaderCallback
     *
     * @param files
     * @param callback
     * @return Promise
     */
    readFiles(files, callback) {
        return new Promise((resolve) => {
            async_1.map(files, fs_1.readFile, (error, buffer) => {
                if (error) {
                    throw error;
                }
                if (buffer) {
                    buffer.forEach((bf, index) => __awaiter(this, void 0, void 0, function* () {
                        bf && (yield callback(files[index], bf.toString()));
                        if (index === files.length - 1) {
                            resolve();
                        }
                    }));
                }
            });
        });
    }
}
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
const util_1 = __webpack_require__(/*! util */ "util");
class Reporter {
    constructor(options) {
        this.options = options;
        this.errors = [];
        this.response = {
            passed: true
        };
        this.path = '';
    }
    static getInstance(type, config) {
        switch (type) {
            case 'json':
                return new (__webpack_require__(/*! ./reporters/jsonReporter */ "./src/core/reporters/jsonReporter.ts").JsonReporter)(config);
            case 'silent':
                return new (__webpack_require__(/*! ./reporters/silentReporter */ "./src/core/reporters/silentReporter.ts").SilentReporter)(config);
            default:
                return new (__webpack_require__(/*! ./reporters/rawReporter */ "./src/core/reporters/rawReporter.ts").RawReporter)(config);
        }
    }
    /**
     * Set current working file
     * @param path
     */
    setPath(path) {
        this.path = path;
    }
    /**
     * Add new error in message pull
     * @param rule
     * @param message
     * @param line
     * @param start
     * @param end
     * @param fix
     * @param endLine
     */
    add(rule, message, line = 0, start = 0, end = 0, fix = null, endLine = line) {
        this.errors.push({
            message: [{
                    rule,
                    descr: message,
                    path: this.path,
                    line,
                    endline: endLine,
                    start,
                    end: end > start ? end : start,
                    fix: typeof fix === 'string' ? { replace: fix } : null
                }]
        });
    }
    /**
     * Fill response object
     */
    fillResponse() {
        this.response.passed = !this.errors.length;
        this.response.errors = this.errors.length ? this.errors : undefined;
    }
    /**
     * Prepare data and output result
     * @param exit
     */
    display(exit) {
        this.fillResponse();
        this.log();
        this.reset();
        if (exit) {
            process.exit(this.response.passed ? 0 : 1);
        }
    }
    /**
     * Reset all error stores
     */
    reset() {
        this.errors.length = 0;
        this.response = {
            passed: true
        };
    }
    /**
     * Filter messages
     * @param grep
     */
    filterErrors(grep) {
        this.errors = this.errors.filter((error) => {
            error.message = error.message.filter((msg) => !!msg.descr.match(grep) || !!msg.rule.match(grep));
            return error.message.length;
        });
    }
}
exports.Reporter = Reporter;
exports.log = (val) => console.log(util_1.inspect(val, {
    depth: 10
}));


/***/ }),

/***/ "./src/core/reporters/jsonReporter.ts":
/*!********************************************!*\
  !*** ./src/core/reporters/jsonReporter.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const reporter_1 = __webpack_require__(/*! ../reporter */ "./src/core/reporter.ts");
class JsonReporter extends reporter_1.Reporter {
    /**
     * @override
     */
    log() {
        if (this.response.errors) {
            this.response.errors.forEach((error) => error.message.forEach((message) => {
                message.descr = `${message.rule}: ${message.descr}`;
            }));
        }
        console.clear();
        console.log(JSON.stringify(this.response, null, 2));
    }
}
exports.JsonReporter = JsonReporter;


/***/ }),

/***/ "./src/core/reporters/rawReporter.ts":
/*!*******************************************!*\
  !*** ./src/core/reporters/rawReporter.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const columnify = __webpack_require__(/*! columnify */ "columnify");
const chalk_1 = __webpack_require__(/*! chalk */ "chalk");
const reporter_1 = __webpack_require__(/*! ../reporter */ "./src/core/reporter.ts");
class RawReporter extends reporter_1.Reporter {
    /**
     * @override
     */
    log() {
        const cwd = process.cwd(), warningsOrErrors = [...this.errors], // TODO add warning mode
        messagesToFile = {}, msg = [];
        warningsOrErrors.forEach((pack) => {
            pack.message.forEach((message) => {
                const path = message.path.replace(cwd, '');
                if (!messagesToFile[path]) {
                    messagesToFile[path] = [];
                }
                messagesToFile[path].push({
                    file: chalk_1.default.magenta(path.padEnd(30, ' ')),
                    line: chalk_1.default.yellow(message.line),
                    description: chalk_1.default.red(message.descr.padEnd(this.options.maxWidth || 100, ' ')),
                    rule: chalk_1.default.cyan(message.rule)
                });
            });
        });
        const msgGrouped = Object.keys(messagesToFile).map((file) => [
            chalk_1.default.blue(file),
            columnify(messagesToFile[file], this.options),
            ''
        ].join('\n'));
        msg.push(msgGrouped.join('\n'));
        const cnt = this.errors.length;
        msg.push(`Stlint: ${(cnt ? chalk_1.default.red(cnt) : chalk_1.default.green(0))} Errors.`);
        console.log(msg.join(''));
    }
}
exports.RawReporter = RawReporter;


/***/ }),

/***/ "./src/core/reporters/silentReporter.ts":
/*!**********************************************!*\
  !*** ./src/core/reporters/silentReporter.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const reporter_1 = __webpack_require__(/*! ../reporter */ "./src/core/reporter.ts");
class SilentReporter extends reporter_1.Reporter {
    log() {
        // ignore
    }
    reset() {
        // ignore
    }
}
exports.SilentReporter = SilentReporter;


/***/ }),

/***/ "./src/core/rule.ts":
/*!**************************!*\
  !*** ./src/core/rule.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const lcfirst_1 = __webpack_require__(/*! ./helpers/lcfirst */ "./src/core/helpers/lcfirst.ts");
const index_1 = __webpack_require__(/*! ./ast/index */ "./src/core/ast/index.ts");
const objToHash_1 = __webpack_require__(/*! ./helpers/objToHash */ "./src/core/helpers/objToHash.ts");
const unwrapObject_1 = __webpack_require__(/*! ./helpers/unwrapObject */ "./src/core/helpers/unwrapObject.ts");
const initContext = () => ({
    hashDeep: 0,
    inHash: false,
    inComment: false,
    vars: {},
    valueToVar: {}
});
const hashStartRe = /\$?[\w]+\s*[=:]\s*{/, hashEndRe = /}/, startMultiComment = /\/\*/, endMultiComment = /\*\//;
class Rule {
    constructor(conf) {
        this.conf = conf;
        this.nodesFilter = null;
        this.state = {
            conf: 'always',
            enabled: true
        };
        this.cache = {};
        this.hashErrors = {};
        this.errors = [];
        if (typeof conf !== 'boolean') {
            if (Array.isArray(conf)) {
                this.state.conf = conf[0];
                this.state.enabled = conf[1] === undefined || Boolean(conf[1]);
            }
            else {
                this.state = Object.assign({}, this.state, conf);
                if (conf.enabled === undefined) {
                    this.state.enabled = true;
                }
            }
        }
        else {
            this.state.enabled = conf;
        }
    }
    get context() {
        return Rule.context;
    }
    /**
     * Rule name
     */
    get name() {
        return lcfirst_1.lcfirst(this.constructor.name);
    }
    static clearContext() {
        Rule.context = initContext();
    }
    static getContext() {
        return Rule.context;
    }
    /**
     *
     * @param node
     */
    static beforeCheckNode(node) {
        if (node instanceof index_1.Ident && node.value instanceof index_1.Value) {
            const isHash = node.value.nodes && node.value.nodes.length && node.value.nodes[0] instanceof index_1.Obj;
            this.context.vars[node.key] = isHash ? objToHash_1.objTohash(node.value.nodes[0]) : node.value.nodes[0].toString();
            this.context.valueToVar = Object.assign({}, this.context.valueToVar, unwrapObject_1.unwrapObject(this.context.vars));
        }
    }
    /**
     * Check hash object etc
     * @param line
     */
    static beforeCheckLine(line) {
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
            const prev = line.prev();
            if (prev && endMultiComment.test(prev.line)) {
                Rule.context.inComment = false;
            }
        }
    }
    clearErrors() {
        this.errors.length = 0;
        this.hashErrors = {};
    }
    clearContext() {
        Rule.clearContext();
    }
    /**
     * Add error message in list
     *
     * @param message
     * @param line
     * @param start
     * @param end
     * @param fix
     * @param endLine
     */
    msg(message, line = 1, start = 1, end = 1, fix = null, endLine = line) {
        const error = [this.name, message, line, start, end, fix, endLine], hash = error.join('&');
        if (!this.hashErrors[hash]) {
            this.hashErrors[hash] = true;
            this.errors.push(error);
        }
    }
    /**
     * Check type included in filter
     * @param type
     */
    isMatchType(type) {
        return !this.nodesFilter || this.nodesFilter.includes(type);
    }
}
Rule.context = initContext();
exports.Rule = Rule;


/***/ }),

/***/ "./src/core/runner.ts":
/*!****************************!*\
  !*** ./src/core/runner.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const visitor_1 = __webpack_require__(/*! ./visitor */ "./src/core/visitor.ts");
const index_1 = __webpack_require__(/*! ./ast/index */ "./src/core/ast/index.ts");
class Runner extends visitor_1.Visitor {
    constructor(ast, fn) {
        super(ast);
        this.fn = fn;
    }
    visitNode(node, parent) {
        this.fn(node);
        node.nodes.forEach((elm) => this.visit(elm, parent));
        if (node.value && node.value instanceof index_1.Node) {
            this.visit(node.value, parent);
        }
        return node;
    }
}
exports.Runner = Runner;


/***/ }),

/***/ "./src/core/translator.ts":
/*!********************************!*\
  !*** ./src/core/translator.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const visitor_1 = __webpack_require__(/*! ./visitor */ "./src/core/visitor.ts");
const index_1 = __webpack_require__(/*! ./ast/index */ "./src/core/ast/index.ts");
class Translator extends visitor_1.Visitor {
    constructor(root, lines) {
        super(root);
        this.lines = lines;
    }
    methodNotExists(method, node) {
        const e = new Error(`No method ${method} line:${node.lineno}`);
        e.lineno = node.lineno;
        throw e;
    }
    transpile() {
        return this.visit(this.root, null);
    }
    /**
     * Root element in AST
     * @param block
     */
    visitRoot(block) {
        const tree = new index_1.Tree(block);
        this.eachVisit(block.nodes, (ret) => {
            tree.append(ret);
        }, tree);
        return tree;
    }
    visitNode(block, parent) {
        return new index_1.Node(block, parent);
    }
    visitBlock(block, parent) {
        const node = new index_1.Block(block, parent);
        this.eachVisit(block.nodes, (ret) => {
            node.append(ret);
        }, node);
        return node;
    }
    visitGroup(block, parent) {
        const node = new index_1.Group(block, parent);
        this.eachVisit(block.nodes, (ret) => {
            node.append(ret);
        }, node);
        return node;
    }
    visitSelector(block, parent) {
        const node = new index_1.Selector(block, parent);
        this.eachVisit(block.segments, (ret) => {
            node.append(ret, 'segments');
        }, node);
        if (block.block) {
            node.append(this.visit(block.block, node));
        }
        return node;
    }
    visitProperty(block, parent) {
        const node = new index_1.Property(block, parent);
        node.key = block.name || (Array.isArray(block.segments) ? block.segments.join('') : '');
        if (block.expr) {
            node.value = this.visit(block.expr, node);
        }
        return node;
    }
    visitLiteral(block, parent) {
        const node = new index_1.Literal(block, parent);
        node.val = typeof block.val === 'string' ? block.val : '';
        return node;
    }
    visitString(block, parent) {
        return this.visitLiteral(block, parent);
    }
    visitExpression(block, parent) {
        const node = new index_1.Value(block, parent);
        this.eachVisit(block.nodes, (ret) => {
            node.append(ret);
        }, node);
        return node;
    }
    visitRGBA(block, parent) {
        const node = new index_1.RGB(block, parent);
        node.value = block.name || (typeof block.raw === 'string' ? block.raw : '') || '';
        return node;
    }
    visitIdent(block, parent) {
        const node = new index_1.Ident(block, parent);
        node.key = block.string || block.name || '';
        if (block.val) {
            node.value = this.visit(block.val, node);
        }
        return node;
    }
    /**
     * Если импорт то только такой
     * @param block
     * @param parent
     */
    visitImport(block, parent) {
        const node = new index_1.Import(block, parent);
        node.value = (block.path || '').toString().replace(/[()]/g, '');
        return node;
    }
    /**
     * Обработка $p хеша
     * @param block
     * @param parent
     */
    visitObject(block, parent) {
        const node = new index_1.Obj(block, parent);
        const vals = block.vals, keys = block.keys;
        if (vals && typeof vals === 'object' && keys && typeof keys === 'object') {
            Object.keys(vals).forEach((key) => {
                const elm = vals[key];
                if (elm) {
                    if (!keys[key]) {
                        debugger;
                    }
                    const property = new index_1.Property(vals[key], node), ret = this.visit(vals[key], property);
                    property.key = this.visit(keys[key], property);
                    property.value = ret;
                    node.append(property);
                }
            });
        }
        return node;
    }
    /**
     * Пустые значения
     * @param block
     * @param parent
     */
    visitNull(block, parent) {
        // console.log(block);
    }
    /**
     * Нода значений типа px или em
     * @param block
     * @param parent
     */
    visitUnit(block, parent) {
        const node = new index_1.Unit(block, parent);
        node.value = typeof block.raw === 'string' ? block.raw : '';
        return node;
    }
    /**
     * Вызов миксина
     * @param block
     * @param parent
     */
    visitCall(block, parent) {
        const node = new index_1.Call(block, parent);
        node.key = block.name || '';
        if (block.args) {
            this.eachVisit(block.args.nodes, (ret) => {
                node.append(ret);
            }, node);
        }
        return node;
    }
    /**
     * Получение элемента хеша
     * @param block
     * @param parent
     */
    visitMember(block, parent) {
        const node = new index_1.Member(block, parent);
        if (block.left) {
            node.left = this.visit(block.left, node);
            node.left.key = block.name || '';
        }
        if (block.right) {
            node.right = this.visit(block.right, node);
            node.right.key = block.name || '';
        }
        return node;
    }
    /**
     * Binary operation
     * @param block
     * @param parent
     */
    visitBinOp(block, parent) {
        const node = new index_1.BinOp(block, parent);
        if (block.left) {
            node.left = this.visit(block.left, node);
        }
        if (block.right) {
            node.right = this.visit(block.right, node);
        }
        return node;
    }
    /**
     * Visit atrule (ex. @font-face)
     * @param block
     * @param parent
     */
    visitAtrule(block, parent) {
        const node = new index_1.Atrule(block, parent);
        if (block.block) {
            node.append(this.visit(block.block, node));
        }
        return node;
    }
    /**
     * Declared function
     * @param block
     * @param parent
     */
    visitFunction(block, parent) {
        const node = new index_1.Func(block, parent);
        node.key = block.name || '';
        this.eachVisit(block.params, (ret) => {
            node.append(ret, 'params');
        }, node);
        if (block.block) {
            node.append(this.visit(block.block, node));
        }
        if (block.params) {
            node.append(this.visit(block.params, node));
        }
        return node;
    }
    /**
     * Functions params
     * @param block
     * @param parent
     */
    visitParams(block, parent) {
        const node = new index_1.Params(block, parent);
        this.eachVisit(block.nodes, (ret) => {
            node.append(ret);
        }, node);
        return node;
    }
    /**
     * Comment
     * @param block
     * @param parent
     */
    visitComment(block, parent) {
        return new index_1.Comment(block, parent);
    }
    /**
     * Visit boolean value
     * @param block
     * @param parent
     */
    visitBoolean(block, parent) {
        return new index_1.Bool(block, parent);
    }
    /**
     * Cycle value
     * @param block
     * @param parent
     */
    visitEach(block, parent) {
        return new index_1.Each(block, parent);
    }
    /**
     * Condition nodes
     * @param block
     * @param parent
     */
    visitIf(block, parent) {
        const node = new index_1.Condition(block, parent);
        if (block.block) {
            node.append(this.visit(block.block, node));
        }
        if (block.cond) {
            node.cond = this.visit(block.cond, node);
        }
        this.eachVisit(block.elses, (ret) => {
            node.append(ret);
        }, node);
        return node;
    }
    /**
     * Unary operation
     * @param block
     * @param parent
     */
    visitUnaryOp(block, parent) {
        const node = new index_1.UnaryOp(block, parent);
        if (block.left) {
            node.left = this.visit(block.left, node);
        }
        if (block.right) {
            node.right = this.visit(block.right, node);
        }
        return node;
    }
    /**
     * Media scope
     * @param block
     * @param parent
     */
    visitMedia(block, parent) {
        const node = new index_1.Media(block, parent);
        if (block.block) {
            node.append(this.visit(block.block, node));
        }
        if (block.val) {
            node.query = this.visit(block.val, node);
        }
        // Hack because stylus set Media.column on end of line
        if (this.lines[node.lineno]) {
            const column = this.lines[node.lineno].line.indexOf('@media');
            if (column !== -1 && column + 1 !== node.column) {
                node.column = column + 1;
            }
        }
        return node;
    }
    /**
     * Query list in media scope
     * @param block
     * @param parent
     */
    visitQueryList(block, parent) {
        const node = new index_1.Querylist(block, parent);
        this.eachVisit(block.nodes, (ret) => {
            node.append(ret);
        }, node);
        return node;
    }
    /**
     * Query in query list
     * @param block
     * @param parent
     */
    visitQuery(block, parent) {
        const node = new index_1.Query(block, parent);
        if (block.type) {
            node.type = this.visit(block.type, node);
        }
        if (block.predicate) {
            node.predicate = block.predicate;
        }
        this.eachVisit(block.nodes, (ret) => {
            node.append(ret);
        }, node);
        return node;
    }
    visitFeature(block, parent) {
        const node = new index_1.Feature(block, parent);
        this.eachVisit(block.segments, (ret) => {
            node.append(ret, 'segments');
        }, node);
        if (block.expr) {
            node.append(this.visit(block.expr, node));
        }
        return node;
    }
    /**
     * Visit keyframes node
     * @param block
     * @param parent
     */
    visitKeyframes(block, parent) {
        const node = new index_1.Keyframes(block, parent);
        this.eachVisit(block.segments, (ret) => {
            node.append(ret, 'segments');
        }, node);
        if (block.block) {
            node.append(this.visit(block.block, node));
        }
        return node;
    }
    eachVisit(list, fn, parent) {
        if (Array.isArray(list)) {
            for (let i = 0, len = list.length; i < len; ++i) {
                const node = list[i];
                const ret = this.visit(node, parent);
                if (ret) {
                    fn(ret);
                }
            }
        }
    }
}
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
class Visitor {
    constructor(root) {
        this.root = root;
    }
    methodNotExists(method, node) {
        // ignore
    }
    visit(node, parent) {
        const method = 'visit' + node.constructor.name;
        const fn = this[method];
        if (fn && typeof fn === 'function') {
            return fn.call(this, node, parent);
        }
        this.methodNotExists(method, node);
        return this.visitNode(node, parent);
    }
}
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

module.exports = {"mixedSpaces":{"indentPref":"tab"},"prefixVarsWithDollar":{"conf":"always","prefix":"$"},"emptyLines":true,"commaInObject":["never"],"depthControl":{"indentPref":"tab"},"quotePref":["double"],"semicolons":["never"],"colons":["never"],"color":{"conf":"uppercase","enabled":true,"allowOnlyInVar":true},"leadingZero":["always"],"useMixinInsteadUnit":{"conf":"always","mixin":"basis","unitType":"px"},"sortOrder":{"conf":"grouped","startGroupChecking":6,"order":[["absolute","position","z-index","top","right","bottom","left"],["content","display","flexbox","flex","flex-grow","flex-shrink","flex-basis","flex-direction","order","flex-order","flex-wrap","flex-flow","justify-content","align-self","align-items","align-content","flex-pack","flex-align","box-sizing","vertical-align","size","width","height","max-width","min-width","max-height","min-height","overflow","overflow-x","overflow-y","float","clear","visibility","opacity","margin","margin-top","margin-right","margin-bottom","margin-left","padding","padding-top","padding-right","padding-bottom","padding-left"],["font","font-family","font-size","font-weight","font-style","font-variant","font-size-adjust","font-stretch","line-height","letter-spacing","text-align","text-align-last","text-decoration","text-emphasis","text-emphasis-position","text-emphasis-style","text-emphasis-color","text-indent","text-justify","text-outline","text-transform","text-wrap","text-overflow","text-overflow-ellipsis","text-overflow-mode","word-spacing","word-wrap","word-break","tab-size","hyphens"],["pointer-events","border","border-spacing","border-collapse","border-width","border-style","border-color","border-top","border-top-width","border-top-style","border-top-color","border-right","border-right-width","border-right-style","border-right-color","border-bottom","border-bottom-width","border-bottom-style","border-bottom-color","border-left","border-left-width","border-left-style","border-left-color","border-radius","border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius","border-image","border-image-source","border-image-slice","border-image-width","border-image-outset","border-image-repeat","border-top-image","border-right-image","border-bottom-image","border-left-image","border-corner-image","border-top-left-image","border-top-right-image","border-bottom-right-image","border-bottom-left-image","color","background","filter","background-color","background-image","background-attachment","background-position","background-position-x","background-position-y","background-clip","background-origin","background-size","background-repeat","clip","list-style","outline","outline-width","outline-style","outline-color","outline-offset","cursor","box-shadow","text-shadow","table-layout","backface-visibility","will-change","transition","transform","animation"]]}};

/***/ }),

/***/ "./src/doc.ts":
/*!********************!*\
  !*** ./src/doc.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const documentator_1 = __webpack_require__(/*! ./core/documentator/documentator */ "./src/core/documentator/documentator.ts");
exports.doc = (options = {}) => {
    const documentator = new documentator_1.Documentator(options);
    documentator.generate();
};


/***/ }),

/***/ "./src/linter.ts":
/*!***********************!*\
  !*** ./src/linter.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const reporter_1 = __webpack_require__(/*! ./core/reporter */ "./src/core/reporter.ts");
const parser_1 = __webpack_require__(/*! ./core/parser */ "./src/core/parser.ts");
const checker_1 = __webpack_require__(/*! ./core/checker */ "./src/core/checker.ts");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const path_1 = __webpack_require__(/*! path */ "path");
const rule_1 = __webpack_require__(/*! ./core/rule */ "./src/core/rule.ts");
const config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
const node_watch_1 = __webpack_require__(/*! node-watch */ "node-watch");
const splitLines_1 = __webpack_require__(/*! ./core/helpers/splitLines */ "./src/core/helpers/splitLines.ts");
const calcPosition_1 = __webpack_require__(/*! ./core/helpers/calcPosition */ "./src/core/helpers/calcPosition.ts");
const pkg = __webpack_require__(/*! ../package.json */ "./package.json");
class Linter {
    /**
     * @param options
     */
    constructor(options = {}) {
        this.options = {};
        this.options = options;
        this.config = new config_1.Config(this.options);
        this.reporter = reporter_1.Reporter.getInstance(this.config.reporter, this.config.reportOptions);
        this.parser = new parser_1.StylusParser(this.config.stylusParserOptions);
        this.checker = new checker_1.Checker(this);
    }
    /**
     * Parse styl file and check rules
     */
    lint(path, content = null) {
        this.reporter.reset();
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
            const lines = splitLines_1.splitLines(content);
            this.fillIgnoredLines(lines);
            try {
                const ast = this.parser.parse(content);
                this.checker.checkASTRules(ast, lines);
            }
            catch (e) {
                this.reporter.add('syntaxError', e.message, e.lineno, e.startOffset);
            }
            this.checker.checkLineRules(content, lines);
        }
        catch (e) {
            if (this.config.debug) {
                throw e;
            }
        }
        finally {
            if (this.config.grep) {
                this.reporter.filterErrors(this.config.grep);
            }
            if (this.config.fix && content !== null && this.reporter.errors && this.reporter.errors.length) {
                this.fix(path, content);
            }
        }
    }
    fillIgnoredLines(lines) {
        let ignoreBlock = false, line, index;
        for (index = 1; index < lines.length; index += 1) {
            line = lines[index];
            if (ignoreBlock) {
                line.isIgnored = true;
                if (/@stlint-enable/.test(line.line)) {
                    ignoreBlock = false;
                }
            }
            else if (/@stlint-ignore/.test(line.line)) {
                line.isIgnored = true;
                const next = line.next();
                if (next) {
                    next.isIgnored = true;
                }
            }
            else if (/@stlint-disable/.test(line.line)) {
                ignoreBlock = true;
            }
        }
    }
    /**
     * Watch to some directory or file
     *
     * @param path
     * @param callback
     */
    watch(path, callback) {
        node_watch_1.default(path, {
            encoding: 'utf-8',
            recursive: true,
            filter: /\.styl$/
        }, callback);
    }
    /**
     * Print all errors or warnings
     */
    display(exit = true) {
        this.reporter.display(exit);
    }
    /**
     * Try fix some errors
     */
    fix(path, content) {
        let diffContent = content;
        this.reporter.errors.forEach((error) => {
            error.message.forEach((message) => {
                if (message.fix !== null) {
                    diffContent = this.applyFix(message.fix, message, diffContent);
                }
            });
        });
        if (diffContent !== content) {
            this.saveFix(path, diffContent);
        }
        return diffContent;
    }
    applyFix(fix, message, content) {
        const start = calcPosition_1.calcPosition(message.line, message.start, content), end = calcPosition_1.calcPosition(message.endline, message.end, content);
        return content.substr(0, start) + fix.replace + content.substr(end + 1);
    }
    saveFix(path, content) {
        fs_1.writeFileSync(path, content);
    }
    info() {
        const rules = Object.keys(this.config.rules)
            .filter((ruleKey) => ruleKey.match(this.config.grep))
            .reduce((rls, ruleKey) => {
            rls[ruleKey] = this.config.rules[ruleKey];
            return rls;
        }, {});
        console.log(`Version: ${pkg.version}\n` +
            `Config:  ${this.config.configFile}\n` +
            (this.config.extraRules ? `Extra Rules:  ${JSON.stringify(this.config.extraRules)}\\n` : '') +
            (this.config.extends ? `Extends:  ${JSON.stringify(this.config.extends)}\\n` : '') +
            `Rules:  ${JSON.stringify(rules, null, 2)}\n` +
            '');
    }
}
exports.Linter = Linter;


/***/ }),

/***/ "./src/rules/colons.ts":
/*!*****************************!*\
  !*** ./src/rules/colons.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
const validJSON = __webpack_require__(/*! ../data/valid.json */ "./src/data/valid.json");
/**
 * Use/Do not use colons after property
 */
class Colons extends rule_1.Rule {
    checkLine(line) {
        if (this.context.inHash) {
            return;
        }
        let colon = this.state.conf === 'always';
        let hasPseudo = false;
        let hasScope = false;
        const arr = line.line.split(/ /);
        if (this.state.conf === 'always' &&
            arr.length > 1 &&
            arr[0].indexOf(':') === -1 &&
            arr[0].indexOf(',') === -1) {
            colon = false;
        }
        else if (this.state.conf === 'never' && line.line.indexOf(':') !== -1) {
            // check for pseudo selector
            hasPseudo = validJSON.pseudo.some((val) => line.line.indexOf(val) !== -1);
            // check for scope selector
            hasScope = validJSON.scope.some((val) => line.line.indexOf(val) !== -1);
            const index = line.line.indexOf(':'), url = /url\(.*?\)/i.exec(line.line);
            if (url && url.index < index && url[0].length + url.index > index) {
                colon = false;
            }
            else {
                if (!hasPseudo && !hasScope) {
                    colon = true;
                }
            }
        }
        if (this.state.conf === 'always' && colon === false) {
            this.msg('missing colon between property and value', line.lineno, arr[0].length + 1, arr[0].length + 1, ': ');
        }
        else if (this.state.conf === 'never' && colon === true) {
            const index = line.line.indexOf(':');
            this.msg('unnecessary colon found', line.lineno, index + 1, index + 2, ' ');
        }
        return colon;
    }
}
exports.Colons = Colons;


/***/ }),

/***/ "./src/rules/color.ts":
/*!****************************!*\
  !*** ./src/rules/color.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
/**
 * Process all color values. Allow or deny use it not in variable and use uppercase or lowercase statements
 * For example this code has error - because we use only color in `uppercase`
 * ```stylus
 * .test
 * 	color #ccc
 * ```
 * If `allowOnlyInVar` === true code above also has error - no use color without variable
 *
 * Fixed code
 * ```stylus
 * $color = #CCC
 * .test
 * 	color $color
 * ```
 */
class Color extends rule_1.Rule {
    constructor() {
        super(...arguments);
        this.nodesFilter = ['rgb'];
    }
    checkNode(node) {
        const checkReg = this.state.conf !== 'lowercase' ? /[a-z]/ : /[A-Z]/;
        let fixed = false;
        if (this.state.allowOnlyInVar && node.closest('block')) {
            const fix = this.context.valueToVar[node.value] ||
                this.context.valueToVar[node.value.toLowerCase()] ||
                this.context.valueToVar[node.value.toUpperCase()];
            this.msg('Set color only in variable' + (fix ? `(${fix})` : ''), node.lineno, node.column, node.column + node.value.length - 1, fix || null);
            fixed = !!fix;
        }
        if (node.value && typeof node.value === 'string' && checkReg.test(node.value)) {
            const fix = node.value.toString();
            this.msg(`Only ${this.state.conf} HEX format`, node.lineno, node.column, node.column + node.value.length - 1, fixed ? null : this.state.conf === 'uppercase' ? fix.toUpperCase() : fix.toLowerCase());
            return true;
        }
        return false;
    }
}
exports.Color = Color;


/***/ }),

/***/ "./src/rules/commaInObject.ts":
/*!************************************!*\
  !*** ./src/rules/commaInObject.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
const reg = /(,)(\s)*$/, keyValue = /:/, hashEnd = /}/;
/**
 * Allow or deny commas in object hash
 */
class CommaInObject extends rule_1.Rule {
    checkLine(line) {
        if (!this.context.inHash) {
            return;
        }
        let hasComma = false;
        const match = reg.exec(line.line);
        if (match) {
            hasComma = true;
        }
        if (hasComma && this.state.conf === 'never') {
            this.msg('Remove comma from object hash', line.lineno, match ? match.index + 1 : 0, match ? match.index + 1 : 0, '');
        }
        else if (!hasComma && this.state.conf === 'always') {
            const next = line.next();
            if (keyValue.test(line.line) && !hashEnd.test(line.line) && next && !hashEnd.test(next.line)) {
                this.msg('Add comma after object key: value', line.lineno, line.line.length - 2);
            }
        }
        return hasComma;
    }
}
exports.CommaInObject = CommaInObject;


/***/ }),

/***/ "./src/rules/depthControl.ts":
/*!***********************************!*\
  !*** ./src/rules/depthControl.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
const index_1 = __webpack_require__(/*! ../core/ast/index */ "./src/core/ast/index.ts");
/**
 * Control depth spaces or tab
 */
class DepthControl extends rule_1.Rule {
    constructor() {
        super(...arguments);
        this.nodesFilter = ['block', 'selector', 'obj'];
    }
    checkNode(node) {
        const indentPref = typeof this.state.indentPref === 'number' ? this.state.indentPref : 1;
        if (node instanceof index_1.Block || node instanceof index_1.Selector) {
            let parentNode = node.closest('selector|media|condition|keyframes|func'), needCheckPreviousSelector = false, prev = parentNode;
            if (parentNode && parentNode instanceof index_1.Selector) {
                while (prev && parentNode) {
                    prev = prev.previousSibling();
                    if (prev && prev instanceof index_1.Selector && prev.lineno === parentNode.lineno) {
                        parentNode = prev;
                    }
                    else {
                        break;
                    }
                }
            }
            if (parentNode) {
                if (node instanceof index_1.Block) {
                    node.nodes.forEach((child) => {
                        if (parentNode &&
                            (child instanceof index_1.Property ||
                                child instanceof index_1.Media ||
                                child instanceof index_1.Condition) &&
                            child.column - indentPref !== parentNode.column) {
                            this.msg('incorrect indent', child.lineno, 0, child.column);
                        }
                    });
                }
                else if (node.column - indentPref !== parentNode.column) {
                    needCheckPreviousSelector = true;
                }
            }
            else if (node instanceof index_1.Selector && node.column !== 1) {
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
        if (node instanceof index_1.Obj) {
            const key = node.closest('ident|property');
            if (key) {
                const parentColumn = (key instanceof index_1.Property && key.key instanceof index_1.Ident) ? key.key.column : key.column;
                node.nodes.forEach((child) => {
                    if (child instanceof index_1.Property && child.key instanceof index_1.Ident && child.key.column - indentPref !== parentColumn) {
                        this.msg('incorrect indent', child.key.lineno, 0, child.key.column);
                    }
                });
            }
            return;
        }
    }
}
exports.DepthControl = DepthControl;


/***/ }),

/***/ "./src/rules/emptyLines.ts":
/*!*********************************!*\
  !*** ./src/rules/emptyLines.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
/**
 * Check if document has several empty lines
 */
class EmptyLines extends rule_1.Rule {
    checkLine(line) {
        if (line.isEmpty()) {
            const prev = line.prev();
            if (prev && prev.isEmpty()) {
                this.msg('Deny several empty lines', line.lineno);
            }
        }
    }
}
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

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
const decimalRe = /[^\d+](0+\.\d+)|[\s,(:](\.\d+)/i;
const leadZeroRe = /([^\d+])(0+\.\d+)/;
const nonZeroRe = /([\s,(:])(\.\d+)/;
/**
 * Check for leading 0 on numbers ( 0.5 )
 */
class LeadingZero extends rule_1.Rule {
    checkLine(line) {
        if (!decimalRe.test(line.line)) {
            return;
        }
        const leadZeroFound = leadZeroRe.exec(line.line);
        const leadZeroMissing = nonZeroRe.exec(line.line);
        if (this.state.conf === 'always' && leadZeroMissing) {
            this.msg('leading zeros for decimal points are required', line.lineno, leadZeroMissing.index + leadZeroMissing[1].length + 1, leadZeroMissing.index + leadZeroMissing[1].length + 1, '0.');
        }
        else if (this.state.conf === 'never' && leadZeroFound) {
            this.msg('leading zeros for decimal points are unnecessary', line.lineno, leadZeroFound.index + leadZeroFound[1].length + 1, leadZeroFound.index + leadZeroFound[1].length + 1, '');
        }
        return Boolean(leadZeroFound);
    }
}
exports.LeadingZero = LeadingZero;


/***/ }),

/***/ "./src/rules/mixedSpaces.ts":
/*!**********************************!*\
  !*** ./src/rules/mixedSpaces.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
/**
 * check for mixed spaces and tabs
 */
class MixedSpaces extends rule_1.Rule {
    checkLine(line) {
        const mixed = /( \t|\t )[\t\s]*/.exec(line.line), isMixed = mixed !== null;
        if (isMixed && mixed && !this.context.inComment) {
            this.msg('mixed spaces and tabs', line.lineno, mixed.index, mixed.index + mixed[0].length);
        }
        return isMixed;
    }
}
exports.MixedSpaces = MixedSpaces;


/***/ }),

/***/ "./src/rules/prefixVarsWithDollar.ts":
/*!*******************************************!*\
  !*** ./src/rules/prefixVarsWithDollar.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
const index_1 = __webpack_require__(/*! ../core/ast/index */ "./src/core/ast/index.ts");
/**
 * Check that $ is used when declaring vars
 */
class PrefixVarsWithDollar extends rule_1.Rule {
    constructor() {
        super(...arguments);
        this.nodesFilter = ['ident'];
    }
    checkNode(node) {
        if (!(node.parent instanceof index_1.Tree) || (node.value instanceof index_1.Func)) {
            return;
        }
        const hasDollar = node.key.indexOf(this.state.prefix) === 0;
        if (this.state.conf === 'always' && hasDollar === false) {
            //console.log(node.key.length);
            this.msg(`Variables and parameters must be prefixed with the ${this.state.prefix} sign (${node.key})`, node.lineno, node.column, node.column + node.key.length - 1);
        }
        else if (this.state.conf === 'never' && hasDollar === true) {
            this.msg(`${this.state.prefix} sign is disallowed for variables and parameters (${node.key})`, node.lineno, node.column, node.column + node.key.length - 1);
        }
        return hasDollar;
    }
}
exports.PrefixVarsWithDollar = PrefixVarsWithDollar;


/***/ }),

/***/ "./src/rules/quotePref.ts":
/*!********************************!*\
  !*** ./src/rules/quotePref.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
const stringRe = /(?=["'])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/g;
/**
 * Check that quote style is consistent with config
 */
class QuotePref extends rule_1.Rule {
    checkLine(line) {
        if (line.line.indexOf('"') === -1 && line.line.indexOf("'") === -1) {
            return;
        }
        stringRe.lastIndex = 0;
        let badQuotes = false;
        let hasInnerQuote = true;
        let match = stringRe.exec(line.line);
        while (match !== null) {
            const content = match[0].slice(1, -1);
            if (this.state.conf === 'single' && match[0].indexOf('"') === 0) {
                hasInnerQuote = content.indexOf("'") !== -1;
                if (!hasInnerQuote) {
                    badQuotes = true;
                    this.msg(`Preferred quote style is ${this.state.conf} quotes`, line.lineno, match.index + 1, match[0].length + match.index, match[0].replace(/^"/g, '\'').replace(/'$/g, '\''));
                }
            }
            else if (this.state.conf === 'double' && match[0].indexOf("'") === 0) {
                hasInnerQuote = content.indexOf('"') !== -1;
                if (!hasInnerQuote) {
                    badQuotes = true;
                    this.msg(`Preferred quote style is ${this.state.conf} quotes`, line.lineno, match.index + 1, match[0].length + match.index, match[0].replace(/^'/g, '"').replace(/'$/g, '"'));
                }
            }
            match = stringRe.exec(line.line);
        }
        return badQuotes;
    }
}
exports.QuotePref = QuotePref;


/***/ }),

/***/ "./src/rules/semicolons.ts":
/*!*********************************!*\
  !*** ./src/rules/semicolons.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
// we only want to check semicolons on properties/values
const ignoreRe = /(^[*#.])|[&>/]|{|}|if|for(?!\w)|else|@block|@media|([}{=,])$/igm;
/**
 * Check that selector properties are sorted accordingly
 */
class Semicolons extends rule_1.Rule {
    checkLine(line) {
        if (ignoreRe.test(line.line.trim())) {
            return;
        }
        let semicolon;
        const index = line.line.indexOf(';');
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
    }
}
exports.Semicolons = Semicolons;


/***/ }),

/***/ "./src/rules/sortOrder.ts":
/*!********************************!*\
  !*** ./src/rules/sortOrder.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
const index_1 = __webpack_require__(/*! ../core/ast/index */ "./src/core/ast/index.ts");
/**
 * Rule for checking properties order. Can use alphabetical order or order from grouped array
 */
class SortOrder extends rule_1.Rule {
    constructor() {
        super(...arguments);
        this.nodesFilter = ['block'];
    }
    checkNode(node, lines) {
        const names = [], order = this.state.order || [], startGroupChecking = this.state.startGroupChecking || 6;
        node.nodes.forEach((child) => {
            if (child instanceof index_1.Property || child instanceof index_1.Value) {
                names.push({
                    name: child.key.toString().toLowerCase(),
                    lineno: child.lineno
                });
            }
        });
        // sort only 2 and more properties
        if (names.length < 2) {
            return;
        }
        if (this.state.conf === 'alphabetical') {
            names.sort((a, b) => {
                if (a.name === b.name) {
                    return 0;
                }
                return a.name > b.name ? 1 : -1;
            });
        }
        else {
            if (!this.cache.order) {
                this.cache.ketToGroup = {};
                let groupIndex = 0;
                this.cache.order = order.reduce((sort, key) => {
                    if (typeof key === 'string') {
                        sort.push(key);
                    }
                    else {
                        sort.push.apply(sort, key);
                        key.forEach((subkey) => this.cache.ketToGroup[subkey] = groupIndex);
                        groupIndex += 1;
                    }
                    return sort;
                }, []);
            }
            names.sort((keyA, keyB) => {
                const values = {
                    keyA: keyA.name,
                    keyB: keyB.name
                }, index = {
                    keyA: this.cache.order.indexOf(keyA.name),
                    keyB: this.cache.order.indexOf(keyB.name)
                }, keys = Object.keys(index);
                for (const key of keys) {
                    if (index[key] === -1) {
                        const parts = values[key].split('-');
                        if (parts.length > 1) {
                            let l = parts.length - 1;
                            while (l > 0 && index[key] === -1) {
                                index[key] = this.cache.order.indexOf(parts.slice(0, l).join('-'));
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
        let index = 0, indexNoOrdered = 0, hasOrderError = false, last = void (0), first = void (0), child;
        const fix = [], partLines = [];
        for (let i = 0; i < node.nodes.length; i += 1) {
            child = node.nodes[i];
            if (child instanceof index_1.Property || child instanceof index_1.Value) {
                if (names[index].name !== child.key) {
                    if (!first) {
                        first = child;
                    }
                    last = child;
                    hasOrderError = true;
                    fix[indexNoOrdered] = lines[names[index].lineno].line;
                }
                if (first) {
                    partLines[indexNoOrdered] = lines[child.lineno].line;
                    indexNoOrdered += 1;
                }
                index += 1;
            }
        }
        if (hasOrderError && last && first) {
            for (let i = 0; i < fix.length; i += 1) {
                if (fix[i] === undefined) {
                    fix[i] = partLines[i];
                }
            }
            this.msg(`Properties have wrong order -  ${names.map((item) => item.name).join(', ')}`, first.lineno, 1, lines[last.lineno].line.length, fix.join('\n'), last.lineno);
        }
        if (!hasOrderError &&
            names.length >= startGroupChecking &&
            this.state.conf === 'grouped') {
            let lastGroup = null;
            node.nodes.forEach((node) => {
                if (node instanceof index_1.Property || node instanceof index_1.Value) {
                    const key = node.key.toString();
                    let group = this.cache.ketToGroup[key];
                    if (group === undefined) {
                        const parts = key.split('-');
                        if (parts.length > 1) {
                            let l = parts.length - 1;
                            while (l > 0 && group === undefined) {
                                group = this.cache.ketToGroup[parts.slice(0, l).join('-')];
                                l -= 1;
                            }
                        }
                    }
                    if (group !== undefined && group !== lastGroup) {
                        if (lastGroup !== null) {
                            const prev = node.previousSibling();
                            if (prev && prev.lineno === node.lineno - 1) {
                                this.msg('Need new line after group', prev.lineno, prev.column, prev.column);
                            }
                        }
                        lastGroup = group;
                    }
                }
            });
        }
    }
}
exports.SortOrder = SortOrder;


/***/ }),

/***/ "./src/rules/useMixinInsteadUnit.ts":
/*!******************************************!*\
  !*** ./src/rules/useMixinInsteadUnit.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rule_1 = __webpack_require__(/*! ../core/rule */ "./src/core/rule.ts");
/**
 * Allo or deny some mixin instead of unit statement
 */
class useMixinInsteadUnit extends rule_1.Rule {
    constructor() {
        super(...arguments);
        this.nodesFilter = ['unit', 'call'];
    }
    checkNode(node) {
        if (this.state.conf === 'always') {
            if (node.value && typeof node.value === 'string') {
                const unit = RegExp('([\\d]+)' + this.state.unitType).exec(node.value);
                if (unit) {
                    let fix = '';
                    if (this.state.mixin === 'basis') {
                        const unitSize = Number(unit[1]), basis = (unitSize / 8);
                        fix = `basis(${basis})`;
                    }
                    this.msg(`Use "${this.state.mixin}" mixin instead "${this.state.unitType}"`, node.lineno, node.column, node.column + node.value.trimRight().length - 1, fix || null);
                    return true;
                }
            }
        }
        else {
            if (node.nodeName === 'call' && typeof node.key === 'string' && node.key === this.state.mixin) {
                this.msg(`Do not use "${this.state.mixin}" mixin`, node.lineno, node.column, node.column + node.key.length - 1);
            }
        }
        return false;
    }
}
exports.useMixinInsteadUnit = useMixinInsteadUnit;


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

/***/ "typescript":
/*!*****************************!*\
  !*** external "typescript" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typescript");

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
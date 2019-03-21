# Stylus Linter 
[![Build Status](https://travis-ci.org/stylus/stlint.svg?branch=master)](https://www.npmjs.org/package/stlint)
[![NPM version](https://img.shields.io/npm/v/stlint.svg)](https://www.npmjs.org/package/stlint)
[![NPM Downloads](https://img.shields.io/npm/dm/stlint.svg)](https://npmcharts.com/compare/stlint?minimal=true)

[![NPM](https://nodei.co/npm/stlint.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/stlint/)

* [issues](https://github.com/stylus/stlint/issues)

## Installation

As part of your project
```bash
npm i stlint -D
```

As a cli tool: 
```bash
npm install stlint -g
```

## Example cli Usage:
`npx stlint` Run stlint on cwd

`stlint` Run stlint on cwd as global

`stlint path/to/filename.styl` Run stlint on a file

`stlint path/to/dir --watch` Watch dir, run stlint on file change

`stlint --help` Get list of commands

`stlint --version` Get version number

`stlint --config path/to/config/.configrc` Run stlint with custom config settings

`stlint styl/ --watch -c path/to/config/.configrc` Watch dir, use custom config


## CLI
`-h` or `--help`    Display list of commands

`-w` or `--watch`   Watch file or directory and run lint on change

`-c` or `--config`  Pass in location of custom config file

`-v` or `--version` Display current version

`-g` or `--grep` Only run rules matching this string or regexp

`-f` or `--fix` Try fix some issues

`-r` or `--reporter` Reporter "raw", "json" or "silent"

All another options from [config](#Config file) 

## Non CLI Usage
```javascript
const StylusLinter = require('stlint').StylusLinter;
const stlint = StylusLinter('path/to/stylus/', {
	...options
});
```

## Config file
Create `.stlintrc` file in project root
```json
{
  "reporter": "raw",
  "watch": false,
  "extends": ["stlint-v4fire", "./test/.myfileconfig.json"],
  "extraRules": "./my-rules/",
  "rules": {
    "color": false,
    "colons": ["always"],
    "depthControl": {
      "indentPref": 4
    }
  },
  "path": "./src",
  "excludes": ["node_modules/"],
  "stylusParserOptions": {},
  "reportOptions": {
    "columnSplitter": " | ",
    "maxWidth": 70,
    "minWidth": 70,
    "trancate": false
  }
}
```
## As Part of Your Workflow
Stlint integrations with IDEs are available.

* [WebStorm / PhpStorm / IntelliJ IDEA](https://github.com/stylus/stlint-idea-plugin)
* VSCode - coming soon

## Ignore errors
sometimes you want to ignore the error for this there are two directives:
* `@stline-ignode` - ignores only one line after it
* `@stlint-disable` `@stlint-enable` - ignore block (@stlint-enable is optional)

For example, in the following code, some errors will be ignored.
```stylus
$p = {
  a: #CCC
  // @stlint-ignore  
  b: #ccc // need use uppercase notation will be ignored
  c: 10px
}
.test
  margin-top 20px
  // @stlint-disable
  padding-top 20px  // need use mixin will be ignored
  color #ccc        // need use uppercase notation and use variable will be ignored
  // @stlint-enable
  background-color #ddd
```

Respectively, in order not to display errors of the entire file, it is enough to add an 
`@stlint-disable` directive to its beginning

```stylus
// @stlint-disable - all errors below will be ignored
$p = {
  a: #CCC
  b: #ccc
  c: 10px
}
.test
  margin-top 20px
  padding-top 20px
  color #ccc 
  background-color #ddd
```

## Rules
<!-- RULES START -->

### colons
Use/Do not use colons after property

**Default value**
```json
[
  "never"
]
```
----

### color
Process all color values. Allow or deny use it not in variable and use uppercase or lowercase statements
For example this code has error - because we use only color in `uppercase`
```stylus
.test
  color #ccc
```
If `allowOnlyInVar` === true code above also has error - no use color without variable

Fixed code
```stylus
$color = #CCC
.test
  color $color
```

**Default value**
```json
{
  "conf": "uppercase",
  "enabled": true,
  "allowOnlyInVar": true
}
```
----

### commaInObject
Allow or deny commas in object hash

**Default value**
```json
[
  "never"
]
```
----

### depthControl
Control depth spaces or tab

**Default value**
```json
{
  "indentPref": "tab"
}
```
----

### emptyLines
Check if document has several empty lines

**Default value**
```json
true
```
----

### leadingZero
Check for leading 0 on numbers ( 0.5 )

**Default value**
```json
[
  "always"
]
```
----

### mixedSpaces
check for mixed spaces and tabs

**Default value**
```json
{
  "indentPref": "tab"
}
```
----

### prefixVarsWithDollar
Check that $ is used when declaring vars

**Default value**
```json
{
  "conf": "always",
  "prefix": "$"
}
```
----

### quotePref
Check that quote style is consistent with config

**Default value**
```json
[
  "double"
]
```
----

### semicolons
Check that selector properties are sorted accordingly

**Default value**
```json
[
  "never"
]
```
----

### sortOrder
Rule for checking properties order. Can use alphabetical order or order from grouped array

**Default value**
```json
{
  "conf": "grouped",
  "startGroupChecking": 6,
  "order": [
    [
      "absolute",
      "position",
      "z-index",
      "top",
      "right",
      "bottom",
      "left"
    ],
    [
      "content",
      "display",
      "flexbox",
      "flex",
      "flex-grow",
      "flex-shrink",
      "flex-basis",
      "flex-direction",
      "order",
      "flex-order",
      "flex-wrap",
      "flex-flow",
      "justify-content",
      "align-self",
      "align-items",
      "align-content",
      "flex-pack",
      "flex-align",
      "box-sizing",
      "vertical-align",
      "size",
      "width",
      "height",
      "max-width",
      "min-width",
      "max-height",
      "min-height",
      "overflow",
      "overflow-x",
      "overflow-y",
      "float",
      "clear",
      "visibility",
      "opacity",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left"
    ],
    [
      "font",
      "font-family",
      "font-size",
      "font-weight",
      "font-style",
      "font-variant",
      "font-size-adjust",
      "font-stretch",
      "line-height",
      "letter-spacing",
      "text-align",
      "text-align-last",
      "text-decoration",
      "text-emphasis",
      "text-emphasis-position",
      "text-emphasis-style",
      "text-emphasis-color",
      "text-indent",
      "text-justify",
      "text-outline",
      "text-transform",
      "text-wrap",
      "text-overflow",
      "text-overflow-ellipsis",
      "text-overflow-mode",
      "word-spacing",
      "word-wrap",
      "word-break",
      "tab-size",
      "hyphens"
    ],
    [
      "pointer-events",
      "border",
      "border-spacing",
      "border-collapse",
      "border-width",
      "border-style",
      "border-color",
      "border-top",
      "border-top-width",
      "border-top-style",
      "border-top-color",
      "border-right",
      "border-right-width",
      "border-right-style",
      "border-right-color",
      "border-bottom",
      "border-bottom-width",
      "border-bottom-style",
      "border-bottom-color",
      "border-left",
      "border-left-width",
      "border-left-style",
      "border-left-color",
      "border-radius",
      "border-top-left-radius",
      "border-top-right-radius",
      "border-bottom-right-radius",
      "border-bottom-left-radius",
      "border-image",
      "border-image-source",
      "border-image-slice",
      "border-image-width",
      "border-image-outset",
      "border-image-repeat",
      "border-top-image",
      "border-right-image",
      "border-bottom-image",
      "border-left-image",
      "border-corner-image",
      "border-top-left-image",
      "border-top-right-image",
      "border-bottom-right-image",
      "border-bottom-left-image",
      "color",
      "background",
      "filter",
      "background-color",
      "background-image",
      "background-attachment",
      "background-position",
      "background-position-x",
      "background-position-y",
      "background-clip",
      "background-origin",
      "background-size",
      "background-repeat",
      "clip",
      "list-style",
      "outline",
      "outline-width",
      "outline-style",
      "outline-color",
      "outline-offset",
      "cursor",
      "box-shadow",
      "text-shadow",
      "table-layout",
      "backface-visibility",
      "will-change",
      "transition",
      "transform",
      "animation"
    ]
  ]
}
```
----

### useMixinInsteadUnit
Allo or deny some mixin instead of unit statement

**Default value**
```json
{
  "conf": "always",
  "mixin": "basis",
  "unitType": "px"
}
```
----<!-- RULES END -->

### License

[The MIT License](https://raw.githubusercontent.com/stylus/stlint/master/LICENSE).

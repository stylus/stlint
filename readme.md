# Stylus Linter
### Install
```bash
npm i stlint -D
```
### Use
```bash
npx stlint ./src/file.styl
npx stlint ./
npx stlint ./ -w
```

### Options
<!-- RULES START -->### colons
Check for colons
#### Default value
```json
["never"]
```
### color
Process all color values. Allow or deny use it not in variable and use uppercase or lowercase statements
#### Default value
```json
{"conf":"uppercase","enabled":true,"allowOnlyInVar":true}
```
### commaInObject
Allow or deny commas in object hash
#### Default value
```json
["never"]
```
### depthControl
Control depth spaces or tab
#### Default value
```json
{"indentPref":"tab"}
```
### emptyLines
Check if document has several empty lines
#### Default value
```json
true
```
### leadingZero
Check for leading 0 on numbers ( 0.5 )
#### Default value
```json
["always"]
```
### mixedSpaces
check for mixed spaces and tabs
#### Default value
```json
{"indentPref":"tab"}
```
### prefixVarsWithDollar
Check that $ is used when declaring vars
#### Default value
```json
{"conf":"always","prefix":"$"}
```
### quotePref
Check that quote style is consistent with config
#### Default value
```json
["double"]
```
### semicolons
Check that selector properties are sorted accordingly
#### Default value
```json
["never"]
```
### sortOrder
Rule for checking properties order. Can use alphabetical order or order from grouped array
#### Default value
```json
{"conf":"grouped","startGroupChecking":6,"order":[["absolute","position","z-index","top","right","bottom","left"],["content","display","flexbox","flex","flex-grow","flex-shrink","flex-basis","flex-direction","order","flex-order","flex-wrap","flex-flow","justify-content","align-self","align-items","align-content","flex-pack","flex-align","box-sizing","vertical-align","size","width","height","max-width","min-width","max-height","min-height","overflow","overflow-x","overflow-y","float","clear","visibility","opacity","margin","margin-top","margin-right","margin-bottom","margin-left","padding","padding-top","padding-right","padding-bottom","padding-left"],["font","font-family","font-size","font-weight","font-style","font-variant","font-size-adjust","font-stretch","line-height","letter-spacing","text-align","text-align-last","text-decoration","text-emphasis","text-emphasis-position","text-emphasis-style","text-emphasis-color","text-indent","text-justify","text-outline","text-transform","text-wrap","text-overflow","text-overflow-ellipsis","text-overflow-mode","word-spacing","word-wrap","word-break","tab-size","hyphens"],["pointer-events","border","border-spacing","border-collapse","border-width","border-style","border-color","border-top","border-top-width","border-top-style","border-top-color","border-right","border-right-width","border-right-style","border-right-color","border-bottom","border-bottom-width","border-bottom-style","border-bottom-color","border-left","border-left-width","border-left-style","border-left-color","border-radius","border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius","border-image","border-image-source","border-image-slice","border-image-width","border-image-outset","border-image-repeat","border-top-image","border-right-image","border-bottom-image","border-left-image","border-corner-image","border-top-left-image","border-top-right-image","border-bottom-right-image","border-bottom-left-image","color","background","filter","background-color","background-image","background-attachment","background-position","background-position-x","background-position-y","background-clip","background-origin","background-size","background-repeat","clip","list-style","outline","outline-width","outline-style","outline-color","outline-offset","cursor","box-shadow","text-shadow","table-layout","backface-visibility","will-change","transition","transform","animation"]]}
```
### useMixinInsteadUnit
Allo or deny some mixin instead of unit statement
#### Default value
```json
{"conf":"always","mixin":"basis","unitType":"px"}
```
<!-- RULES END -->

### License
MIT

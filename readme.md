# Stylus Linter by Edadeal
### Install
```bash
npm i stylus-linter -D
```
### Use
```bash
npx stylus-linter ./src/file.styl
```

### Options
## Default
```js
{
	semicolons: ['never'],
	colons: ['never'],
	color: 	['uppercase'],
	leadingZero: ['always'],
	useBasis: ['always']
}
```
#### colons
Allow/Deny use colons between `rule: value`

Deny colons
```
"colons": ["never"] 
```

Use colons always
```
"colons": ["always"] 
```

Switch off rule
```
"colons": false 
```

Show only warning
```
"colons": ["always", "warning"] 
```

#### semicolons
Allow/Deny use semicolons after `rule: value`

Deny semicolons
```
"semicolons": ["never"] 
```

Use semicolons always
```
"semicolons": ["always"] 
```

Switch off rule
```
"semicolons": false 
```

Show only warning
```
"semicolons": ["always", "warning"] 
```

### License
MIT

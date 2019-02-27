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

Check off rule
```
"colons": false 
```

Show only warning
```
"colons": ["always", "warning"] 
```


### License
MIT

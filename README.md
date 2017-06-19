Utility that transforms a JSON object into a flowconfig file.


## Install
```
npm install -g @tiddo/flow-json-config
```

## Usage:

```
flow-json-config file.json [configPath] > .flowconfig
```

`configPath` is an optional parameter that causes `flow-json-config` to get
its configuration from a subfield of the input JSON. This can for example
be used to put the configuration in the `package.json`:

```
flow-json-config package.json [configPath] > .flowconfig
```

## Format
```js
{
	"ignore" : [/* ignore path */],
	"include" : [/* include paths */],
	"libs" : [/* lib paths */],
	"options" : {
		"optionKey" : "optionValue",
		"nested" : {
			"subKey" : "subValue"
		}
	}
}
```

See the [examples](examples) folder for full examples.

## On npm
[@tiddo/flow-json-config](https://www.npmjs.com/package/@tiddo/flow-json-config)

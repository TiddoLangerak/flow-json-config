#!/usr/bin/env node

var fs = require('fs');

var filePath = process.argv[2];
var field = process.argv[3];
var fieldParts = [];
if (field) {
	fieldParts = field.split('.');
}

var file = fs.readFileSync(filePath, 'utf8');
var json;
try {
	json = JSON.parse(file);
} catch (e) {
	console.error(filePath + " is not a valid JSON file");
	process.exit(1);
}
var flowConfig = fieldParts
	.reduce((obj, path) => {
		if (!obj[path]) {
			console.error("Could not find flow config in file '" + filePath + "' for field '" + field + "'");
			process.exit(1);
		}
		return obj[path];
	}, json);

function listToConfig(section, list) {
	return '[' + section + ']\n' + list.join('\n') + '\n\n';
}

var output = '# Generated from ' + filePath + '\n';
if (flowConfig.include) {
	output += listToConfig('include', flowConfig.include);
}

if (flowConfig.ignore) {
	output += listToConfig('ignore', flowConfig.ignore);
}

if (flowConfig.libs) {
	output += listToConfig('libs', flowConfig.libs);
}

function objectToKeyVal(obj, prefix = '') {
	return Object.entries(obj)
		.map((tuple) => {
			var key = tuple[0];
			var val = tuple[1];
			if (typeof val === 'object') {
				return objectToKeyVal(val, prefix + key + ".");
			}
			return [
				prefix + key + '='+val
			]
		})
		.reduce((acc, val) => acc.concat(val))
}

if (flowConfig.options) {
	output += listToConfig('options', objectToKeyVal(flowConfig.options));
}

if (flowConfig.version) {
	output += listToConfig('version', [flowConfig.version]);
}

console.log(output);




// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

// Messages
exports.VALIDATION_FAILED = "JSHint failed.";
exports.OPTIONS_MUST_BE_OBJECT = "Options parameter must be an object.";
exports.OPTIONS_MUST_NOT_BE_NULL = "Options parameter must not be null.";
exports.NO_FILE_OPTION = "Need 'file' option containing path to file to check.";
exports.NO_FILES_OPTION = "Need 'files' option containing array of filenames (or globs) to check.";
exports.NO_CODE_OPTION = "Need 'code' option containing source code to check.";

// Generic descriptors
var OPTIONS_DESCRIPTOR = {
	description: "JSHint options (see [the JSHint documentation](http://www.jshint.com/docs/options/)).",
	default: {}
};
var GLOBALS_DESCRIPTOR = {
	description: "Permitted global variables (for use with the `undef` option). Each variable should be set to `true` or `false`. If false, the variable is considered read-only.",
	default: {}
};

// File list validator
exports.FILE_LIST_VALIDATOR_DESCRIPTORS = {
	title: "JSHint",
	description: "Run JSHint against a list of files. A dot will be written to stdout for each file processed. Any errors will be written to stdout.",
	options: {
		files: {
			description: "A string or array containing the files to check. Globs (`*`) and globstars (`**`) will be expanded to match files and directory trees respectively. Prepend `!` to exclude files.",
		},
		options: OPTIONS_DESCRIPTOR,
		globals: GLOBALS_DESCRIPTOR
	}
};

// One file validator
exports.ONE_FILE_VALIDATOR_DESCRIPTORS = {
	title: "JSHint",
	description: "Run JSHint against a single file (it's useful for auto-generated build dependencies). Any errors will be written to stdout.",
	options: {
		file: {
			description: "A string containing the path to the file to check."
		},
		options: OPTIONS_DESCRIPTOR,
		globals: GLOBALS_DESCRIPTOR
	}
};

// Source validator
exports.SOURCE_VALIDATOR_DESCRIPTORS = {
	title: "JSHint",
	description: "Run JSHint against raw source code. Any errors will be will be written to stdout.",
	options: {
		code: {
			description: "A string containing the source code to check."
		},
		options: OPTIONS_DESCRIPTOR,
		globals: GLOBALS_DESCRIPTOR
	}
};
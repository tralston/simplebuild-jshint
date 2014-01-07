// Copyright (c) 2014 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
"use strict";

var expect = require("expect.js");
var jshint = require("./index.js");
var messages = require("./messages.js");
var stdout = require("./__stdout.js");
var testFiles = require("./__test_files.js");

describe("Simplebuild module", function() {

	var restoreStdout;
	var successArgs;
	var failureArgs;

	beforeEach(function() {
		successArgs = null;
		failureArgs = null;
		restoreStdout = stdout.ignore();
	});

	afterEach(function() {
		restoreStdout();
	});

	describe("source validator", function() {

		it("has descriptors", function() {
			expect(jshint.checkCode.title).to.equal(messages.SOURCE_VALIDATOR_TITLE);
			expect(jshint.checkCode.description).to.equal(messages.SOURCE_VALIDATOR_DESCRIPTION);
		});

		it("calls success() callback on success", function() {
			jshint.checkCode({
				code: "var a = 1;"
			}, success, failure);
			expectSuccess();
		});

		it("calls failure() callback on failure", function() {
			jshint.checkCode({
				code: "bargledy-bargle"
			}, success, failure);
			expectFailure(messages.VALIDATION_FAILED);
		});

		it("passes 'options' option through to JSHint", function() {
			jshint.checkCode({
				code: "a = 1;",
				options: { undef: true },
			}, success, failure);
			expectFailure(messages.VALIDATION_FAILED);
		});

		it("passes 'global' option through to JSHint", function() {
			jshint.checkCode({
				code: "a = 1;",
				options: { undef: true },
				globals: { a: true }
			}, success, failure);
			expectSuccess();
		});

		it("fails when no code is provided", function() {
			jshint.checkCode({}, success, failure);
			expectFailure(messages.NO_CODE_OPTION);
		});

		it("fails when option variable isn't an object", function() {
			jshint.checkCode("foo", success, failure);
			expectFailure(messages.OPTIONS_MUST_BE_OBJECT);
		});

		it("fails when option variable is null", function() {
			jshint.checkCode(null, success, failure);
			expectFailure(messages.OPTIONS_MUST_NOT_BE_NULL);
		});
	});

	describe("file validator", function() {
		it("has descriptors", function() {
			expect(jshint.checkFiles.title).to.equal(messages.FILE_VALIDATOR_TITLE);
			expect(jshint.checkFiles.description).to.equal(messages.FILE_VALIDATOR_DESCRIPTION);
		});

		it("calls success() callback on success", function() {
			testFiles.write("var a = 1;", function(filenames) {
				jshint.checkFiles({
					files: filenames
				}, success, failure);
				expectSuccess();
			});
		});

		it("calls failure() callback on failure", function() {
			testFiles.write("bargledy-bargle", function(filenames) {
				jshint.checkFiles({
					files: filenames
				}, success, failure);
			});
			expectFailure(messages.VALIDATION_FAILED);
		});

		it("supports globs", function() {
			testFiles.write("var a = 1;", "bargledy-bargle", function(filenames) {
				jshint.checkFiles({
					files: [ "temp_files/*" ]
				}, success, failure);
				expectFailure(messages.VALIDATION_FAILED);
			});
		});

		it("passes 'options' option through to JSHint", function() {
			testFiles.write("a = 1;", function(filenames) {
				jshint.checkFiles({
					files: filenames,
					options: { undef: true },
				}, success, failure);
				expectFailure(messages.VALIDATION_FAILED);
			});
		});

		it("passes 'global' option through to JSHint", function() {
			testFiles.write("a = 1;", function(filenames) {
				jshint.checkFiles({
					files: filenames,
					options: { undef: true },
					globals: { a: true }
				}, success, failure);
				expectSuccess();
			});
		});

		it("fails when no code is provided", function() {
			jshint.checkFiles({}, success, failure);
			expectFailure(messages.NO_FILES_OPTION);
		});

		it("fails when option variable isn't an object", function() {
			jshint.checkFiles("foo", success, failure);
			expectFailure(messages.OPTIONS_MUST_BE_OBJECT);
		});

		it("fails when option variable is null", function() {
			jshint.checkFiles(null, success, failure);
			expectFailure(messages.OPTIONS_MUST_NOT_BE_NULL);
		});
	});

	function success() {
		successArgs = arguments;
	}

	function failure() {
		failureArgs = arguments;
	}

	function expectSuccess() {
		if (successArgs === null) throw new Error("Expected success callback to be called");
		if (failureArgs !== null) throw new Error("Did not expect failure callback to be called");
		expect(successArgs).to.eql([]);
	}

	function expectFailure(failureMessage) {
		if (failureArgs === null) throw new Error("Expected failure callback to be called");
		if (successArgs !== null) throw new Error("Did not expect success callback to be called");
		expect(failureArgs).to.eql([ failureMessage ]);
	}

});
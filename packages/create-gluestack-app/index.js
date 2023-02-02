#!/usr/bin/env node
"use strict";

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split(".");
const major = semver[0];

if (major < 18 || major >= 19) {
  console.error(
    "You are running Node " +
      currentNodeVersion +
      ".\n" +
      "Create Gluestack App requires Node 18. \n" +
      "Please update your version of Node.",
  );
  process.exit(1);
}

// const { init } = require("./create");
const { init } = require("./createGlueStackApp");

init();

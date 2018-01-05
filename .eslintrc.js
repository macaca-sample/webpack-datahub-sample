'use strict';

module.exports = {
  "extends": [
    "standard"
  ],
  "plugins": [
    "mocha"
  ],
  "rules": {
    "no-labels": 0,
    "no-empty-label": 0,
    "semi": [2, "always"],
    "space-before-function-paren": 0,
  },
  "env": {
    "es6": true,
    "browser": true,
    "mocha": true,
  }
};

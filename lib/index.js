'use strict';

// exports

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _general = require('./helpers/general/');

Object.keys(_general).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _general[key];
    }
  });
});
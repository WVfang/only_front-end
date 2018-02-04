"use strict";

var requireDir = require('require-dir');
global.devBuild = process.env.NODE_ENV === 'development';
requireDir('./gulp/tasks', {recurse: true});
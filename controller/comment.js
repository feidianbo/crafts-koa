'use strict';
var views = require('co-views');
var parse = require('co-body');
var monk = require('monk');
var wrap = require('co-monk');
// var db = monk('localhost/library');
var mongoose = require('mongoose');
var co = require('co');

var Comment = require('../model/comment');

// console.log(mongoose);

// From lifeofjs
co(function * () {
  var comments = yield Comment.find({});
});

var render = views(__dirname + '/../views', {
  map: {
    html: 'swig'
  }
});

// This must be avoided, use ajax in the view.
module.exports.all = function * all(next) {
  if ('GET' != this.method) return yield next;
  var comments = yield Comment.find({}).populate('poster');
  console.log(comments);
  this.body = comments;
};

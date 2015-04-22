'use strict';
var views = require('co-views');
var parse = require('co-body');
var monk = require('monk');
var wrap = require('co-monk');
// var db = monk('localhost/library');
var mongoose = require('mongoose');
var co = require('co');

var Expert = require('../model/expert');

// console.log(mongoose);
mongoose.connect('mongodb://localhost/crafts');

// From lifeofjs
co(function * () {
  var experts = yield Expert.find({});
});

var render = views(__dirname + '/../views', {
  map: {
    html: 'swig'
  }
});

module.exports.fetch = function * fetch(id,next) {

  var schema = new mongoose.Schema({name: String});
  var Expert = mongoose.model('Expert', schema);
  var experts = yield Expert.find({});

  if ('GET' != this.method) return yield next;
  // Quick hack.
  if(id === ""+parseInt(id, 10)){
    // var expert = yield Expert.find({}, {
    //   'skip': id - 1,
    //   'limit': 1
    // });
    // if (expert.length === 0) {
    //   this.throw(404, 'book with id = ' + id + ' was not found');
    // }
    this.body = yield experts;
  }

};

module.exports.home = function * home(next) {
  if ('GET' != this.method) return yield next;
  this.body = yield experts.find({});
};

module.exports.list = function * list(next) {
  if ('GET' != this.method) return yield next;
  this.body = yield render('list', {
    'experts': yield experts.find({})
  });
};

// This must be avoided, use ajax in the view.
module.exports.all = function * all(next) {
  if ('GET' != this.method) return yield next;
  var experts = yield Expert.find({}).populate('works');
  console.log(experts);
  this.body = experts;
};

module.exports.add = function * add(data,next) {
  if ('POST' != this.method) return yield next;
  var expert = yield parse(this, {
    limit: '1kb'
  });
  var inserted = yield experts.insert(expert);
  if (!inserted) {
    this.throw(405, "The book couldn't be added.");
  }
  this.body = 'Done!';
};

module.exports.modify = function * modify(id,next) {
  if ('PUT' != this.method) return yield next;

  var data = yield parse(this, {
    limit: '1kb'
  });

  var expert = yield experts.find({}, {
    'skip': id - 1,
    'limit': 1
  });

  if (expert.length === 0) {
    this.throw(404, 'book with id = ' + id + ' was not found');
  }

  var updated = experts.update(expert[0], {
    $set: data
  });

  if (!updated) {
    this.throw(405, "Unable to update.");
  } else {
    this.body = "Done";
  }
};

module.exports.remove = function * remove(id,next) {
  if ('DELETE' != this.method) return yield next;

  var expert = yield experts.find({}, {
    'skip': id - 1,
    'limit': 1
  });

  if (expert.length === 0) {
    this.throw(404, 'book with id = ' + id + ' was not found');
  }

  var removed = experts.remove(expert[0]);

  if (!removed) {
    this.throw(405, "Unable to delete.");
  } else {
    this.body = "Done";
  }

};

module.exports.head = function *(){
  return;
};

module.exports.options = function *() {
  this.body = "Allow: HEAD,GET,PUT,DELETE,OPTIONS";
};

module.exports.trace = function *() {
  this.body = "Smart! But you can't trace.";
};

'use strict';
var views = require('co-views');
var parse = require('co-body');
var mongoose = require('mongoose');

var Expert = require('../model/expert');

module.exports.list = function * list(type, next) {
    if (type == 'recommend') {
        // this.response.header['Access-Control-Allow-Origin', '*'];
        this.response.set('Access-Control-Allow-Origin', '*');
        this.body =  yield Expert.find().populate('works');
    } else {
        this.body = {};
    }
};

module.exports.all = function * all(next) {
    if ('GET' != this.method) return yield next;
    this.body = yield Expert.find({}).populate('works');
};

'use strict';
var views = require('co-views');
var parse = require('co-body');
var mongoose = require('mongoose');

var Expert = require('../model/expert');

module.exports.list = function * list(type, next) {
    if (type == 'recommend') {
        // this.response.header['Access-Control-Allow-Origin', '*'];
        this.response.set('Access-Control-Allow-Origin', '*');
        this.body =  yield Expert.find({}).populate({path: 'works', match: {recommend: true}}).exec();
    } else {
        this.body = {};
    }
};

module.exports.all = function * all(next) {
    this.response.set('Access-Control-Allow-Origin', '*');
    if ('GET' != this.method) return yield next;
    this.body = yield Expert.find({}).populate('works');
};

module.exports.fetch = function * fetch(id, next) {
    this.response.set('Access-Control-Allow-Origin', '*');
    if ('GET' != this.method) return yield next;
    this.body = yield Expert.findById(id);
}

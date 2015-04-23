'use strict';
var views = require('co-views');
var parse = require('co-body');
var mongoose = require('mongoose');

var Work = require('../model/work');

module.exports.list = function * list(type, next) {
    if (type == 'recommend') {
        this.response.set('Access-Control-Allow-Origin', '*');
        this.body =  yield Work.find({}).populate('comments').exec();
    } else {
        this.body = {};
    }
};

module.exports.all = function * all(next) {
    this.response.set('Access-Control-Allow-Origin', '*');
    if ('GET' != this.method) return yield next;
    this.body = yield Work.find({}).populate('comments');
};

module.exports.fetch = function * fetch(id, next) {
    this.response.set('Access-Control-Allow-Origin', '*');
    if ('GET' != this.method) return yield next;
    this.body = yield Work.findById(id);
}

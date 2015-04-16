var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var expert = require('./expert');
var Schema = new mongoose.Schema({
    // 名称
    name: String,
    // 描述
    description: String
});

module.exports = mongoose.model('Work', Schema);
module.exports.Schema = Schema;

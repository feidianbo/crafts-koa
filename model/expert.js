var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var Work = require('./work');
var WorkSchema = require('./work').Schema;

var ExpertSchema = new mongoose.Schema({
    // 姓名
    name: String,
    // 年龄
    age: Number,
    // 出生日期
    birthday: Date,
    // 性别
    gender: String,
    // 作品
    works: [WorkSchema]
});

module.exports = mongoose.model('Expert', ExpertSchema);
module.exports.Schema = ExpertSchema;

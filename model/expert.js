var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var Work = require('./work');
// var WorkSchema = require('./work').Schema;

var ExpertSchema = new mongoose.Schema({
    // 姓名
    name: String,
    // 简介
    description: String,
    // 年龄
    age: Number,
    // 出生日期
    birthday: Date,
    // 性别
    gender: ['男', '女'],
    // 作品
    works: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Work'
    }]
});

module.exports = mongoose.model('Expert', ExpertSchema);
module.exports.Schema = ExpertSchema;

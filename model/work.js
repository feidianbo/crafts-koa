var mongoose = require('mongoose');

var Comment = require('./comment');

var Schema = new mongoose.Schema({
    // 名称
    name: String,
    // 描述
    description: String,
    // 喜欢数量
    likes: Number,
    // 评论
    comments: [Comment.Schema]
});

module.exports = mongoose.model('Work', Schema);
module.exports.Schema = Schema;

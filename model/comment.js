var mongoose = require('mongoose');

var User = require('./user');

var Schema = new mongoose.Schema({
    // 标题
    title: String,
    // 内容
    content: String,
    // 发帖人
    poster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', Schema);
module.exports.Schema = Schema;

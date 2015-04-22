var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    // 姓名
    name: String,
    // 密码
    password: String,
    // 头像
    avatar: String,
    // 手机
    mobile: String,
    // 邮箱
    email: String,
    // 描述
    description: String,
    // 角色
    roles: ['admin', 'user'],
    // 最后登录日期
    lastLogin: Date
});

module.exports = mongoose.model('User', Schema);
module.exports.Schema = Schema;

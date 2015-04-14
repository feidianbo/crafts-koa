var mongoose = require('mongoose');

var Schema = module.experts = new mongoose.Schema({name: String});

module.exports = mongoose.model('Expert', Schema);

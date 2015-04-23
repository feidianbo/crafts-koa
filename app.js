'use strict';

var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var mongoose = require('mongoose');
var app = module.exports = koa();

var expert = require('./controller/expert');
var work = require('./controller/work');
var comment = require('./controller/comment');

mongoose.connect('mongodb://localhost/crafts');

// Logger
app.use(logger());

// app.use(route.get('/', expert.home));
app.use(route.get('/experts/:type', expert.list));
app.use(route.get('/works', work.all));
app.use(route.get('/work/:id', work.fetch));
app.use(route.get('/experts/', expert.all));
app.use(route.get('/view/experts/', expert.list));
app.use(route.get('/expert/:id', expert.fetch));
app.use(route.post('/expert/', expert.add));
app.use(route.put('/expert/:id', expert.modify));
app.use(route.delete('/expert/:id', expert.remove));
app.use(route.options('/', expert.options));
app.use(route.trace('/', expert.trace));
app.use(route.head('/', expert.head));


app.use(route.get('/comments', comment.all));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
// app.use(compress());

if (!module.parent) {
    app.listen(3000);
    console.log('listening on port 3000');
}

'use strict';
var expert = require('./controller/expert');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

// Logger
app.use(logger());

app.use(route.get('/', expert.home));
app.use(route.get('/experts/', expert.all));
app.use(route.get('/view/experts/', expert.list));
app.use(route.get('/expert/:id', expert.fetch));
app.use(route.post('/expert/', expert.add));
app.use(route.put('/expert/:id', expert.modify));
app.use(route.delete('/expert/:id', expert.remove));
app.use(route.options('/', expert.options));
app.use(route.trace('/', expert.trace));
app.use(route.head('/', expert.head));

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
// app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
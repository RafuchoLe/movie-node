'use strict'
//Requires
const Koa = require('koa');
const Router = require('koa-router');
const respond = require('koa-respond');
const bodyParser = require('koa-bodyParser');
const Joi = require('joi');


//ejecutar Koa
const app = new Koa();
const router = new Router();
app.use(respond());
app.use(bodyParser());


require('./routes/movie')(router);

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
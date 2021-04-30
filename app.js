'use strict'
//Requires
const Koa = require('koa');
const Router = require('koa-router');
const respond = require('koa-respond');
const bodyParser = require('koa-bodyParser');
const body = require('koa-body');
const koaJoiValidator = require('koa-joi-validator-middleware');
const Joi = require('joi');


//ejecutar Koa
const app = new Koa();
const router = new Router();
app.use(respond());
app.use(bodyParser());
app.use(koaJoiValidator(schema, config));
//app.use(body({ multipart: true }));


require('./routes/movie')(router);

app.use(router.routes());
app.use(router.allowedMethods());
//exportar modulo

module.exports = app;
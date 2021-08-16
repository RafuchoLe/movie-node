'use strict'

const Joi = require('joi');

const schema = Joi.object({
    page: Joi.number(),
    year: Joi.number(),
    title: Joi.string(),
    movie: Joi.string(),
    find: Joi.string(),
    replace: Joi.string()
}).with('movie', 'find')
.with('replace', 'find')
.with('replace', 'movie');

module.exports = {
    validator: (ctx, next) => {

    const valPage = ctx.request.header.page;
    const valYear = ctx.request.header.year;
    
    const valTitle = ctx.request.params.title;

    const valMovie = ctx.request.body.movie;
    const valFind = ctx.request.body.find;
    const valReplace = ctx.request.body.replace;

    const { error, value } = schema.validate({page: valPage, year: valYear, title: valTitle, movie: valMovie, find: valFind, replace: valReplace});
    //console.log("El error: "+error);
        if (error === undefined) {
            return next();
        } else {
            return ctx.body = "error en la validacion "+error;
        }
    
    }
}
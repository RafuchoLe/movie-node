'use strict'

const Movie = require('../models/movie');
const omdb = new (require('omdbapi'))('a8164dff');
const readable = require('stream').Readable;
//const omdb = require('omdb');
const s = new readable;

class controller {
    
    static async getMovie(ctx) {

        function findMovie(filter, update) {
            return new Promise((resolve, reject) => {
                console.log(filter);

                const query = { 
                    title: filter
                };

                var movieToUpdate = {};
                movieToUpdate = Object.assign(movieToUpdate, update._doc);
                delete movieToUpdate._id;


                return Movie.findOneAndUpdate({title: filter}, movieToUpdate, {
                    new: true,
                    upsert: true 
                  }).exec().then(resolve, reject);
            });
        }
        
        function findOmdb(movieName, year = null) {
            return new Promise((resolve, reject) =>{
                return omdb.get({
                    title: movieName,   // optionnal (requires imdbid or title)
                    plot: 'full',               // optionnal (defaults to 'short')
                    year: year                // optionnal
                }).then(resolve, reject);
            })
        }
        

        const searchString = ctx.request.params.busqueda;
        const searchYear = ctx.request.header.year;
        const query = { title: {
            "$regex" : searchString,
            "$options": "i"
        }};

        return await findOmdb(searchString, searchYear).then(omdb => {
            console.log(searchYear)
            var movie = new Movie();
            movie.imdbId = omdb.imdbid;
            movie.title = omdb.title;
            movie.year = omdb.year;
            movie.released = omdb.released;
            movie.genre = omdb.genre;
            movie.director = omdb.director;
            movie.actors = omdb.actors;
            movie.plot = omdb.plot;
            movie.ratings = omdb.ratings;
            
            return findMovie(movie.title, movie).then(objectFound => {
                ctx.body = objectFound;
            }, ctx.badRequest);
        }, ctx.badRequest);
    }

    static list(ctx) {
        
        if (!ctx.request.header.page || ctx.request.header.page == 0 || ctx.request.header.page == "0" || ctx.request.header.page == null || ctx.request.header.page == undefined) {
            var page = 1;
        }else{
            var page = parseInt(ctx.request.header.page);
        }

        // opciones de paginacion 
        var options = {
            limit: 5,
            page: page
        };
        // paginado
        return Movie.paginate({}, options).then(result => {
            ctx.body = result;
        });
        
        
    }

    static async update(ctx) {
        function findMovie(query) {

            return new Promise((resolve, reject) => {
                return Movie.findOne(query).then(resolve, reject);
            })
        }

        function findAndUpdateMovie(query, update) {
            return new Promise((resolve, reject) => {
                const updateDoc = {
                    $set: {
                      plot:
                        update,
                    },
                  };
                return Movie.findOneAndUpdate(query, updateDoc, {
                    new: true,
                  }).exec().then(resolve, reject);
            });
        }
        let params = ctx.request.body;
        const query = { title: {
            "$regex" : params.movie,
            "$options": "i"
        }};
        return await findMovie(query).then(movieFound =>{
            let plot = movieFound.plot; 
            let newPlot = plot.replace(params.find, params.replace);
            
            return findAndUpdateMovie(params.movie, newPlot).then(modMovie => {
                ctx.body = modMovie;
            })
        }, ctx.badRequest);
    }
};

module.exports = controller;
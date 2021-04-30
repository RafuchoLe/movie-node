'use strict'

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = new mongoose.Schema({
    imdbId: String,
    title: String,
    year: String,
    released: String,
    genre: [],
    director: [],
    actors: [],
    plot: String,
    ratings: [],
});

Schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movie', Schema);
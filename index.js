'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/movie_node', {useNewUrlParser: true, useUnifiedTopology: true})
        .catch(error => console.log(error));

app.listen(port, () => {
    console.log('KOA esta funcionando');
});

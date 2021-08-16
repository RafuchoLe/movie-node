'use strict'

const MovieController = require('../controllers/movie');
const md_val = require('../middlewares/validator');

module.exports = router => {
    router
    .get('/search/:title', md_val.validator, MovieController.getMovie)
    .get('/list/:page?', md_val.validator, MovieController.list)
    .post('/update', md_val.validator, MovieController.update)
};
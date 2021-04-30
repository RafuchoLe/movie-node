'use strict'

const MovieController = require('../controllers/movie');
const md_val = require('../middlewares/validator');

module.exports = router => {
    router
    .get('/search/:busqueda', MovieController.getMovie)
    .get('/list/:page?', MovieController.list)
    .post('/update', MovieController.update)
};
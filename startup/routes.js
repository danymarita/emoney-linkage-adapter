const express = require('express');
const linkage = require('../routes/linkage');
const error = require('../middlewares/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/linkage', linkage);
    // Implement exception and logging using express error middleware
    app.use(error)
}
const express = require('express');
const routes = express.Router();
const apiController = require('../controller/apiController');

routes.get("/users", apiController.list)



routes.get("/users/:id", apiController.getOne)






module.exports = routes;
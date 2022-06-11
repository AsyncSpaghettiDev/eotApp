const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController.js');

router.get('/GetTables', apiController.getTables);

router.get('/GetEmployees', apiController.getEmployees);

router.get('/GetTableOrder', apiController.getTableOrder);

router.get('/GetCheck/:tableID', apiController.getCheck);

router.post('/InsertIntoOrder/:tableID', apiController.insertIntoOrder);

/* router.get('/home', (_, res) => {
    res.json({message: 'hello world!'});
}); */

module.exports = router;
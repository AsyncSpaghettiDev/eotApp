const fetch = require('node-fetch')
const controller = {};

controller.getTables = async (_, res) => {
    const response = await fetch('https://eatontime.azurewebsites.net/api/GetTables');
    const data = await response.json();
    const fData = JSON.parse(data);
    res.json(fData);
}

controller.getEmployees = async (_, res) => {
    const response = await fetch('https://eatontime.azurewebsites.net/api/GetEmployees ');
    const data = await response.json();
    const fData = JSON.parse(data);
    res.json(fData);
}

controller.getTableOrder = async (req, res) => {
    const { tableId } = req.query;
    const response = await fetch(`https://eatontime.azurewebsites.net/api/GetTableOrder?tableId=${tableId}`);
    const data = await response.json();
    const fData = JSON.parse(data);
    res.json(fData);
}

controller.getCheck = async (req, res) => {
    const { tableID } = req.params;
    const response = await fetch(`https://eatontime.azurewebsites.net/api/GetCheck/${tableID}`);
    const data = await response.json();
    const fData = JSON.parse(data);
    res.json(fData);
}

controller.insertIntoOrder = async (req, res) => {
    console.log(req.query);
    const { tableID } = req.params;
    console.log(tableID)
    const response = await fetch(`https://eatontime.azurewebsites.net/api/InsertIntoOrder/${tableID}?productCode={productCode}&qty={qty}`,{
        method: 'POST'
    });
    const data = await response.json();
    const fData = JSON.parse(data);
    res.json(fData);
}

module.exports = controller;

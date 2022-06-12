const controller = {};

controller.getTables = async (_, res) => {
    
    res.json(null);
}

controller.getEmployees = async (_, res) => {
    
    res.json(null);
}

controller.getTableOrder = async (req, res) => {
    const { tableId } = req.query;
    
    res.json(null);
}

controller.getCheck = async (req, res) => {
    const { tableID } = req.params;
    
    res.json(null);
}

controller.insertIntoOrder = async (req, res) => {
    console.log(req.query);
    
    res.json(null);
}

module.exports = controller;

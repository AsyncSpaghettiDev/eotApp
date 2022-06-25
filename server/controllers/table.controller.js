export const getTableOrder = async (req, res) => {
    const { tableId } = req.query;

    res.json(null);
}

export const getCheck = async (req, res) => {
    const { tableID } = req.params;

    res.json(null);
}

export const insertIntoOrder = async (req, res) => {
    console.log(req.query);

    res.json(null);
}
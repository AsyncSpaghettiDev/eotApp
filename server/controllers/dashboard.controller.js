import database from '../database/database.cjs';

export const getTables = async (_, res) => {
    const query = 'SELECT * FROM tables_info';
    const response = await database.db.promise().query(query);
    res.json(response[0]);
}

export const updateTable = async (req, res) => {
    const { tableId } = req.params;
    const query = `UPDATE tables_info SET ? WHERE table__id = ${tableId}`;
    const response = await database.db.promise().query(query, req.body);
    res.status(201).json({ message: response[0].info })
}

export const createActivity = async (req, res) => {
    const { tableId } = req.params;
    console.log(tableId);
    res.json({
        message: "Hello world!"
    });
}
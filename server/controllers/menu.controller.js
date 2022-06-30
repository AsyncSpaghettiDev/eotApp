import database from '../database/database.cjs';

export const getMenuPlates = async (req, res) => {
    const isAdmin = req.session.role !== undefined && req.session.role === 'ADMIN';
    const selectedColumns = isAdmin ? 'plates.*' : '*'
    const enabledQuery = 
        `SELECT ${selectedColumns}, categories.category__name as plate__category FROM plates 
        JOIN menus ON plates.plate__menu__id = menus.menu__id
        JOIN categories ON plates.plate__category__id = categories.category__id
        WHERE menus.menu__active = 1
        ORDER BY plate__category__id ASC, plate__name ASC;`
    const disabledQuery = 'SELECT * FROM plates JOIN menus ON plates.plate__menu__id = menus.menu__id WHERE menus.menu__active = 0;';
    const enabledMenus = await database.db.promise().query(enabledQuery);
    let disabledMenus = null;

    if (isAdmin)
        disabledMenus = await database.db.promise().query(disabledQuery);

    res.json({
        active: enabledMenus[0],
        inactive: isAdmin ? disabledMenus[0] : null
    });
}

export const updateMenuPlate = async (req, res) => {
    const { menuPlateId } = req.params;
    const query = `UPDATE plates SET ? WHERE plate__id = ${menuPlateId}`;
    const response = await database.db.promise().query(query, req.body);
    res.status(201).json({ message: response[0].info })
}

export const updateLinkedMenu = async (req, res) => {
    const { menuPlateId } = req.params;
    const query = `UPDATE plates SET ? WHERE plate__id = ${menuPlateId}`;
    const response = await database.db.promise().query(query, req.body);
    res.status(201).json({ message: response[0].info })
}

export const getMenus = async (_, res) => {
    const query = 'SELECT menu__id, menu__name FROM menus';
    const response = await database.db.promise().query(query);
    res.json(response[0]);
}

export const getCategories = async (_, res) => {
    const query = 'SELECT * FROM categories';
    const response = await database.db.promise().query(query);
    res.json(response[0]);
}

export const createPlate = async (req, res) => {
    const query = 'INSERT INTO plates SET ?';
    const response = await database.db.promise().query(query, req.body);
    res.status(201).json({ message: response[0] })
}

export const createMenu = async (req, res) => {
    const query = 'INSERT INTO menus SET ?';
    const response = await database.db.promise().query(query, req.body);
    res.status(201).json({ message: response[0] })
}

export const createCategory = async (req, res) => {
    const query = 'INSERT INTO categories SET ?';
    const response = await database.db.promise().query(query, req.body);
    res.status(201).json({ message: response[0] })
}
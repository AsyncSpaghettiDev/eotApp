import database from '../database.cjs';

export const getMenus = async (req, res) => {
    const isAdmin = req.session.role !== undefined && req.session.role === 'ADMIN';
    const enabledQuery = isAdmin ?
    'SELECT plates.* FROM plates JOIN menus ON plates.plate__menu__id = menus.menu__id WHERE menus.menu__active = 1;' :
    'SELECT * FROM plates JOIN menus ON plates.plate__menu__id = menus.menu__id WHERE menus.menu__active = 1;';
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
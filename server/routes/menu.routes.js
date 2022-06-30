import express from 'express';
const api = express.Router();

import {
    createCategory,
    createMenu,
    createPlate,
    getCategories,
    getMenuPlates,
    getMenus,
    updateLinkedMenu,
    updateMenuPlate
} from '../controllers/menu.controller.js';

api.get('/', getMenuPlates);

api.get('/getMenus', getMenus);

api.get('/getCategories', getCategories);

api.put('/updateLinkedMenu/:menuPlateId', updateLinkedMenu);

api.put('/:menuPlateId', updateMenuPlate);

api.post('/', createPlate);

api.post('/menu', createMenu);

api.post('/category', createCategory);

export default api;
import express from 'express';
const api = express.Router();

import { getCategories, getMenuPlates, getMenus, updateLinkedMenu, updateMenuPlate } from '../controllers/menu.controller.js';

api.get('/', getMenuPlates);

api.get('/getMenus', getMenus);

api.get('/getCategories', getCategories);

api.put('/updateLinkedMenu/:menuPlateId', updateLinkedMenu);

api.put('/:menuPlateId', updateMenuPlate);

api.post('/');

export default api;
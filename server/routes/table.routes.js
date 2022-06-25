import express from 'express';
const api = express.Router();

import { getCheck, getTableOrder, insertIntoOrder } from '../controllers/table.controller.js';

api.get('/getMenus', getTableOrder);
api.get('/getMenus', getCheck);
api.get('/getMenus', insertIntoOrder);

export default api;
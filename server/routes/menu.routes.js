import express from 'express';
const api = express.Router();

import { getMenus } from '../controllers/menu.controller.js';

api.get('/getMenus', getMenus);

export default api;
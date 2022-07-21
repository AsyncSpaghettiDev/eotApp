import express from 'express';
const api = express.Router();

import { createActivity, getTables, updateTable } from '../controllers/dashboard.controller.js';

api.get('/tables', getTables);

api.post('/table')

api.post('/tables/:tableId', createActivity);

api.put('/tables/:tableId', updateTable);

export default api;
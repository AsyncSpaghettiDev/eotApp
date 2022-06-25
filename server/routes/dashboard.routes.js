import express from 'express';
const api = express.Router();

import { getTables } from '../controllers/dashboard.controller.js';

api.get('/getTables', getTables);

export default api;
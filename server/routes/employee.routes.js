import express from 'express';
const api = express.Router();

import { getEmployees } from '../controllers/employee.controller.js';

api.get('/', getEmployees);

export default api;
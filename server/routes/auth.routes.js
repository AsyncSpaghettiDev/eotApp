import express from 'express';
const api = express.Router();

import { login, recoverSession, logout } from '../controllers/auth.controller.js';

api.post('/', login);

api.get('/', recoverSession);

api.delete('/', logout);

export default api;
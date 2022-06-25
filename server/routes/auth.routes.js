import express from 'express';
const api = express.Router();

import { login, recoverSession, logout } from '../controllers/auth.controller.js';

api.post('/login', login);

api.get('/recover', recoverSession);

api.delete('/logout', logout);

export default api;
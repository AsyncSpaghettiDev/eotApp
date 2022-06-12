import express from 'express';
const api = express.Router();

import apiController from '../controllers/apiController.js';

api.post('/login', apiController.login);

api.get('/recover', apiController.recoverSession);

api.get('/logout', apiController.logout);

export default api;
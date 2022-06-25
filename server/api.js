import express from 'express';
const api = express.Router();

// Routes
import authRouter from './routes/auth.routes.js';
import menuRouter from './routes/menu.routes.js';

// Api routes
api.use('/auth', authRouter);

api.use('/menu', menuRouter);

export default api;
import express from 'express';
import turmasRoutes from './routes.js';

const routes = express.Router();

routes.use('/turmas', turmasRoutes);

export default routes;

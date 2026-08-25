import express from 'express';
import alunosRoutes from './alunos/index.js';
import turmasRoutes from './turmas/index.js';

const routes = express.Router();

routes.use(alunosRoutes);
routes.use(turmasRoutes);

export default routes;

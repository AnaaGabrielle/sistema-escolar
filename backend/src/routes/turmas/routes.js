import { Router } from 'express';

import {
  criarTurma,
  listarTurmas,
  atualizarTurma,
  excluirTurma,
} from '../../controllers/turmaController.js';

const router = Router();

router.get('/', listarTurmas);

router.post('/', criarTurma);

router.put('/:id', atualizarTurma);

router.delete('/:id', excluirTurma);

export default router;
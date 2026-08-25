import { Router } from 'express';

const router = Router();

// Listar turmas
router.get('/', async (req, res) => {
  try {
    res.json([]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao listar turmas.',
    });
  }
});

// Cadastrar turma
router.post('/', async (req, res) => {
  try {
    const { nome, serie, anoLetivo, turno } =
      req.body;

    if (
      !nome ||
      !serie ||
      !anoLetivo ||
      !turno
    ) {
      return res.status(400).json({
        error: 'Preencha todos os campos da turma.',
      });
    }

    const turma = {
      id: Date.now(),
      nome,
      serie,
      anoLetivo,
      turno,
    };

    res.status(201).json(turma);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao cadastrar turma.',
    });
  }
});

// Atualizar turma
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nome,
      serie,
      anoLetivo,
      turno,
    } = req.body;

    res.json({
      id: Number(id),
      nome,
      serie,
      anoLetivo,
      turno,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao atualizar turma.',
    });
  }
});

// Excluir turma
router.delete('/:id', async (req, res) => {
  try {
    res.json({
      message: 'Turma excluída com sucesso.',
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Erro ao excluir turma.',
    });
  }
});

export default router;
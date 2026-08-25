import Turma from '../models/Turma.js';

export const criarTurma = async (req, res) => {
  try {
    const {
      nome,
      serie,
      anoLetivo,
      turno,
    } = req.body;

    if (
      !nome?.trim() ||
      !serie ||
      !anoLetivo ||
      !turno
    ) {
      return res.status(400).json({
        error:
          'Preencha nome, série, ano letivo e turno.',
      });
    }

    const turma = await Turma.create({
      nome: nome.trim(),
      serie,
      anoLetivo: Number(anoLetivo),
      turno,
    });

    return res.status(201).json(turma);
  } catch (error) {
    console.error(
      'Erro ao criar turma:',
      error
    );

    return res.status(500).json({
      error: 'Erro interno ao cadastrar a turma.',
    });
  }
};

export const listarTurmas = async (req, res) => {
  try {
    const turmas = await Turma.findAll({
      order: [['id', 'DESC']],
    });

    return res.status(200).json(turmas);
  } catch (error) {
    console.error(
      'Erro ao listar turmas:',
      error
    );

    return res.status(500).json({
      error: 'Erro ao buscar as turmas.',
    });
  }
};

export const atualizarTurma = async (
  req,
  res
) => {
  try {
    const turma = await Turma.findByPk(
      req.params.id
    );

    if (!turma) {
      return res.status(404).json({
        error: 'Turma não encontrada.',
      });
    }

    const {
      nome,
      serie,
      anoLetivo,
      turno,
    } = req.body;

    await turma.update({
      nome: nome?.trim() || turma.nome,
      serie: serie || turma.serie,
      anoLetivo: anoLetivo
        ? Number(anoLetivo)
        : turma.anoLetivo,
      turno: turno || turma.turno,
    });

    return res.status(200).json(turma);
  } catch (error) {
    console.error(
      'Erro ao atualizar turma:',
      error
    );

    return res.status(500).json({
      error: 'Erro ao atualizar a turma.',
    });
  }
};

export const excluirTurma = async (
  req,
  res
) => {
  try {
    const turma = await Turma.findByPk(
      req.params.id
    );

    if (!turma) {
      return res.status(404).json({
        error: 'Turma não encontrada.',
      });
    }

    await turma.destroy();

    return res.status(200).json({
      message: 'Turma excluída com sucesso.',
    });
  } catch (error) {
    console.error(
      'Erro ao excluir turma:',
      error
    );

    return res.status(500).json({
      error: 'Erro ao excluir a turma.',
    });
  }
};
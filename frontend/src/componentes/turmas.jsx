import { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

const formularioInicial = {
  nome: '',
  serie: '',
  anoLetivo: new Date().getFullYear(),
  turno: '',
};

const series = [
  '1º Ano',
  '2º Ano',
  '3º Ano',
  '4º Ano',
  '5º Ano',
  '6º Ano',
  '7º Ano',
  '8º Ano',
  '9º Ano',
  'Ensino Médio',
];

function Turmas() {
  const [form, setForm] =
    useState(formularioInicial);

  const [turmas, setTurmas] = useState([]);

  const [mensagem, setMensagem] =
    useState('');

  const [carregando, setCarregando] =
    useState(false);

  const [editandoId, setEditandoId] =
    useState(null);

  // ==========================================
  // CARREGAR TURMAS
  // ==========================================

  const carregarTurmas = async () => {
    try {
      const resposta = await fetch(
        '/api/turmas'
      );

      if (!resposta.ok) {
        throw new Error(
          'Não foi possível carregar as turmas.'
        );
      }

      const dados = await resposta.json();

      setTurmas(
        Array.isArray(dados)
          ? dados
          : []
      );
    } catch (erro) {
      console.error(erro);

      setMensagem(
        'Não foi possível conectar ao servidor.'
      );
    }
  };

  useEffect(() => {
    carregarTurmas();
  }, []);

  // ==========================================
  // ALTERAR CAMPO
  // ==========================================

  const alterarCampo = (
    campo,
    valor
  ) => {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  };

  // ==========================================
  // LIMPAR
  // ==========================================

  const limparFormulario = () => {
    setForm({
      ...formularioInicial,
      anoLetivo:
        new Date().getFullYear(),
    });

    setEditandoId(null);
    setMensagem('');
  };

  // ==========================================
  // SALVAR
  // ==========================================

  const salvarTurma = async (event) => {
    event.preventDefault();

    if (
      !form.nome.trim() ||
      !form.serie ||
      !form.anoLetivo ||
      !form.turno
    ) {
      setMensagem(
        'Preencha todos os campos.'
      );

      return;
    }

    setCarregando(true);

    const dados = {
      nome: form.nome.trim(),
      serie: form.serie,
      anoLetivo: Number(
        form.anoLetivo
      ),
      turno: form.turno,
    };

    try {
      const url = editandoId
        ? `/api/turmas/${editandoId}`
        : '/api/turmas';

      const metodo = editandoId
        ? 'PUT'
        : 'POST';

      const resposta = await fetch(
        url,
        {
          method: metodo,
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(dados),
        }
      );

      const resultado =
        await resposta
          .json()
          .catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          resultado.error ||
            'Erro ao salvar turma.'
        );
      }

      setMensagem(
        editandoId
          ? 'Turma atualizada com sucesso!'
          : 'Turma cadastrada com sucesso!'
      );

      limparFormulario();

      await carregarTurmas();
    } catch (erro) {
      console.error(erro);

      setMensagem(
        erro.message ||
          'Erro ao salvar turma.'
      );
    } finally {
      setCarregando(false);
    }
  };

  // ==========================================
  // EDITAR
  // ==========================================

  const editarTurma = (turma) => {
    setEditandoId(turma.id);

    setForm({
      nome: turma.nome || '',
      serie: turma.serie || '',
      anoLetivo:
        turma.anoLetivo ||
        new Date().getFullYear(),
      turno: turma.turno || '',
    });

    setMensagem('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ==========================================
  // EXCLUIR
  // ==========================================

  const excluirTurma = async (id) => {
    const confirmar =
      window.confirm(
        'Deseja realmente excluir esta turma?'
      );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `/api/turmas/${id}`,
        {
          method: 'DELETE',
        }
      );

      const resultado =
        await resposta
          .json()
          .catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          resultado.error ||
            'Erro ao excluir turma.'
        );
      }

      setMensagem(
        'Turma excluída com sucesso!'
      );

      await carregarTurmas();
    } catch (erro) {
      console.error(erro);

      setMensagem(
        erro.message ||
          'Erro ao excluir turma.'
      );
    }
  };

  // ==========================================
  // TELA
  // ==========================================

  return (
    <Box>
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        justifyContent="space-between"
        alignItems={{
          xs: 'flex-start',
          md: 'center',
        }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Cadastro de Turmas
          </Typography>

          <Typography
            color="text.secondary"
          >
            Cadastre e organize as turmas
            da escola.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          onClick={limparFormulario}
        >
          + Nova turma
        </Button>
      </Stack>

      {mensagem && (
        <Alert
          severity={
            mensagem.includes(
              'sucesso'
            )
              ? 'success'
              : 'error'
          }
          sx={{ mb: 3 }}
        >
          {mensagem}
        </Alert>
      )}

      {/* FORMULÁRIO */}

      <Paper
        variant="outlined"
        sx={{
          p: {
            xs: 2,
            md: 3,
          },
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 2 }}
        >
          {editandoId
            ? 'Editar turma'
            : 'Cadastrar nova turma'}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form
          onSubmit={salvarTurma}
        >
          <Box
            sx={{
              display: 'grid',

              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
              },

              gap: 2,
            }}
          >
            {/* NOME */}

            <TextField
              label="Nome da turma"
              placeholder="Ex.: Turma A"
              value={form.nome}
              onChange={(event) =>
                alterarCampo(
                  'nome',
                  event.target.value
                )
              }
              required
              fullWidth
            />

            {/* SÉRIE */}

            <TextField
              select
              label="Série"
              value={form.serie}
              onChange={(event) =>
                alterarCampo(
                  'serie',
                  event.target.value
                )
              }
              required
              fullWidth
            >
              <MenuItem value="">
                Selecione a série
              </MenuItem>

              {series.map(
                (serie) => (
                  <MenuItem
                    key={serie}
                    value={serie}
                  >
                    {serie}
                  </MenuItem>
                )
              )}
            </TextField>

            {/* ANO */}

            <TextField
              label="Ano letivo"
              type="number"
              value={form.anoLetivo}
              onChange={(event) =>
                alterarCampo(
                  'anoLetivo',
                  event.target.value
                )
              }
              required
              fullWidth
            />

            {/* TURNO */}

            <TextField
              select
              label="Turno"
              value={form.turno}
              onChange={(event) =>
                alterarCampo(
                  'turno',
                  event.target.value
                )
              }
              required
              fullWidth
            >
              <MenuItem value="">
                Selecione o turno
              </MenuItem>

              <MenuItem value="Manhã">
                Manhã
              </MenuItem>

              <MenuItem value="Tarde">
                Tarde
              </MenuItem>

              <MenuItem value="Noite">
                Noite
              </MenuItem>

              <MenuItem value="Integral">
                Integral
              </MenuItem>
            </TextField>
          </Box>

          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={2}
            sx={{ mt: 3 }}
          >
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={carregando}
            >
              {carregando
                ? 'Salvando...'
                : editandoId
                ? 'Atualizar turma'
                : 'Cadastrar turma'}
            </Button>

            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={
                limparFormulario
              }
            >
              Limpar
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* LISTA */}

      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        Turmas cadastradas
      </Typography>

      {turmas.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
          >
            Nenhuma turma cadastrada
          </Typography>

          <Typography
            color="text.secondary"
          >
            As turmas cadastradas
            aparecerão aqui.
          </Typography>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',

            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              xl: 'repeat(3, 1fr)',
            },

            gap: 2,
          }}
        >
          {turmas.map(
            (turma) => (
              <Card
                key={turma.id}
                variant="outlined"
                sx={{
                  borderRadius: 3,
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {turma.nome}
                  </Typography>

                  <Typography
                    color="text.secondary"
                  >
                    {turma.serie}
                  </Typography>

                  <Typography
                    sx={{ mt: 1 }}
                  >
                    <strong>
                      Ano:
                    </strong>{' '}
                    {turma.anoLetivo}
                  </Typography>

                  <Typography>
                    <strong>
                      Turno:
                    </strong>{' '}
                    {turma.turno}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 2 }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() =>
                        editarTurma(
                          turma
                        )
                      }
                    >
                      Editar
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() =>
                        excluirTurma(
                          turma.id
                        )
                      }
                    >
                      Excluir
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            )
          )}
        </Box>
      )}
    </Box>
  );
}

export default Turmas;
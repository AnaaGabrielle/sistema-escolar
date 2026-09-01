import { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";

import Dashboard from './Dashboard';
import Alunos from './Alunos';
import Turmas from './Turmas';

/* =========================================================
   COMPONENTE DE NOTAS
========================================================= */

function Notas({ alunos = [] }) {
  const [notas, setNotas] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('notas_escolares') || '[]'
      );
    } catch {
      return [];
    }
  });

  const [form, setForm] = useState({
    aluno: '',
    disciplina: '',
    nota: '',
    bimestre: '1º Bimestre',
  });

  const alterarCampo = (campo, valor) => {
    setForm((atual) => ({
      ...atual,
      [campo]: valor,
    }));
  };

  const salvarNota = (event) => {
    event.preventDefault();

    if (
      !form.aluno ||
      !form.disciplina.trim() ||
      form.nota === ''
    ) {
      return;
    }

    const novaNota = {
      id: Date.now(),
      aluno: form.aluno,
      disciplina: form.disciplina,
      nota: Number(form.nota),
      bimestre: form.bimestre,
    };

    const novasNotas = [...notas, novaNota];

    setNotas(novasNotas);

    localStorage.setItem(
      'notas_escolares',
      JSON.stringify(novasNotas)
    );

    setForm({
      aluno: '',
      disciplina: '',
      nota: '',
      bimestre: '1º Bimestre',
    });
  };

  const excluirNota = (id) => {
    const novasNotas = notas.filter(
      (nota) => nota.id !== id
    );

    setNotas(novasNotas);

    localStorage.setItem(
      'notas_escolares',
      JSON.stringify(novasNotas)
    );
  };

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ mb: 1 }}
      >
        Notas
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Cadastre e consulte as notas dos alunos.
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 2 }}
        >
          Cadastrar nota
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={salvarNota}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                select
                SelectProps={{
                  native: true,
                }}
                label="Aluno"
                value={form.aluno}
                onChange={(event) =>
                  alterarCampo(
                    'aluno',
                    event.target.value
                  )
                }
                fullWidth
                required
              >
                <option value="">
                  Selecione
                </option>

                {alunos.map((aluno) => (
                  <option
                    key={
                      aluno.id ||
                      aluno.email ||
                      aluno.nome
                    }
                    value={aluno.nome}
                  >
                    {aluno.nome}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Disciplina"
                value={form.disciplina}
                onChange={(event) =>
                  alterarCampo(
                    'disciplina',
                    event.target.value
                  )
                }
                placeholder="Ex.: Matemática"
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                label="Nota"
                type="number"
                inputProps={{
                  min: 0,
                  max: 10,
                  step: 0.1,
                }}
                value={form.nota}
                onChange={(event) =>
                  alterarCampo(
                    'nota',
                    event.target.value
                  )
                }
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <TextField
                select
                SelectProps={{
                  native: true,
                }}
                label="Bimestre"
                value={form.bimestre}
                onChange={(event) =>
                  alterarCampo(
                    'bimestre',
                    event.target.value
                  )
                }
                fullWidth
              >
                <option value="1º Bimestre">
                  1º Bimestre
                </option>

                <option value="2º Bimestre">
                  2º Bimestre
                </option>

                <option value="3º Bimestre">
                  3º Bimestre
                </option>

                <option value="4º Bimestre">
                  4º Bimestre
                </option>
              </TextField>
            </Grid>

            <Grid
              size={{ xs: 12, md: 2 }}
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
              >
                Salvar nota
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ mb: 2 }}
      >
        Notas cadastradas
      </Typography>

      {notas.length === 0 ? (
        <Paper
          variant="outlined"
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6">
            Nenhuma nota cadastrada
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            As notas cadastradas aparecerão aqui.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {notas.map((nota) => (
            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
              key={nota.id}
            >
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  height: '100%',
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {nota.aluno}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {nota.disciplina}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    <strong>Nota:</strong>{' '}
                    {nota.nota}
                  </Typography>

                  <Typography>
                    <strong>Bimestre:</strong>{' '}
                    {nota.bimestre}
                  </Typography>

                  <Button
                    color="error"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      excluirNota(nota.id)
                    }
                  >
                    Excluir
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

/* =========================================================
   APP PRINCIPAL
========================================================= */

function App() {
  const [pagina, setPagina] =
    useState('dashboard');

  /* =======================================================
     ALUNOS
  ======================================================= */

  const [alunos, setAlunos] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('alunos_escolares') || '[]'
      );
    } catch {
      return [];
    }
  });

  const [formAluno, setFormAluno] = useState({
    nome: '',
    email: '',
    data_nascimento: '',
    serie: '',
    cpf: '',
    telefone: '',
    endereco: '',
  });

  const [mensagemAluno, setMensagemAluno] =
    useState('');

  useEffect(() => {
    localStorage.setItem(
      'alunos_escolares',
      JSON.stringify(alunos)
    );
  }, [alunos]);

  const alterarAluno = (event) => {
    const { name, value } = event.target;

    setFormAluno((atual) => ({
      ...atual,
      [name]: value,
    }));
  };

  const cadastrarAluno = (event) => {
    event.preventDefault();

    if (!formAluno.nome.trim()) {
      setMensagemAluno(
        'Informe o nome do aluno.'
      );

      return;
    }

    const novoAluno = {
      ...formAluno,
      id: Date.now(),
    };

    setAlunos((atual) => [
      ...atual,
      novoAluno,
    ]);

    setFormAluno({
      nome: '',
      email: '',
      data_nascimento: '',
      serie: '',
      cpf: '',
      telefone: '',
      endereco: '',
    });

    setMensagemAluno(
      'Aluno cadastrado com sucesso!'
    );
  };

  const limparAluno = () => {
    setFormAluno({
      nome: '',
      email: '',
      data_nascimento: '',
      serie: '',
      cpf: '',
      telefone: '',
      endereco: '',
    });

    setMensagemAluno('');
  };

  /* =======================================================
     TURMAS - MISSÃO 002
  ======================================================= */

  const [turmas, setTurmas] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('turmas_escolares') || '[]'
      );
    } catch {
      return [];
    }
  });

  const [formTurma, setFormTurma] = useState({
    nome: '',
    serie: '',
    ano: '',
    professor: '',
    turmaSelecionada: '',
    alunoSelecionado: '',
  });

  const [mensagemTurma, setMensagemTurma] =
    useState('');

  /* Salvar turmas automaticamente */

  useEffect(() => {
    localStorage.setItem(
      'turmas_escolares',
      JSON.stringify(turmas)
    );
  }, [turmas]);

  /* Alterar campos da turma */

  const alterarTurma = (event) => {
    const { name, value } = event.target;

    setFormTurma((atual) => ({
      ...atual,
      [name]: value,
    }));
  };

  /* Cadastrar turma */

  const cadastrarTurma = (event) => {
    event.preventDefault();

    if (!formTurma.nome.trim()) {
      setMensagemTurma(
        'Informe o nome da turma.'
      );

      return;
    }

    if (!formTurma.serie.trim()) {
      setMensagemTurma(
        'Informe a série da turma.'
      );

      return;
    }

    if (!formTurma.ano) {
      setMensagemTurma(
        'Informe o ano letivo.'
      );

      return;
    }

    const novaTurma = {
      id: Date.now(),
      nome: formTurma.nome.trim(),
      serie: formTurma.serie.trim(),
      ano: Number(formTurma.ano),
      professor: formTurma.professor.trim(),
      alunos: [],
    };

    setTurmas((atual) => [
      ...atual,
      novaTurma,
    ]);

    setFormTurma({
      nome: '',
      serie: '',
      ano: '',
      professor: '',
      turmaSelecionada: '',
      alunoSelecionado: '',
    });

    setMensagemTurma(
      'Turma cadastrada com sucesso!'
    );
  };

  /* Limpar formulário da turma */

  const limparTurma = () => {
    setFormTurma({
      nome: '',
      serie: '',
      ano: '',
      professor: '',
      turmaSelecionada: '',
      alunoSelecionado: '',
    });

    setMensagemTurma('');
  };

  /* =======================================================
     VINCULAR ALUNO À TURMA
  ======================================================= */

  const vincularAluno = () => {
    const turmaId = Number(
      formTurma.turmaSelecionada
    );

    const alunoId = Number(
      formTurma.alunoSelecionado
    );

    if (!turmaId || !alunoId) {
      setMensagemTurma(
        'Selecione uma turma e um aluno.'
      );

      return;
    }

    const aluno = alunos.find(
      (item) => item.id === alunoId
    );

    if (!aluno) {
      setMensagemTurma(
        'Aluno não encontrado.'
      );

      return;
    }

    setTurmas((atuais) =>
      atuais.map((turma) => {
        if (turma.id !== turmaId) {
          return turma;
        }

        const alunosDaTurma =
          turma.alunos || [];

        const alunoJaVinculado =
          alunosDaTurma.some(
            (item) => item.id === aluno.id
          );

        if (alunoJaVinculado) {
          return turma;
        }

        return {
          ...turma,
          alunos: [
            ...alunosDaTurma,
            aluno,
          ],
        };
      })
    );

    setFormTurma((atual) => ({
      ...atual,
      alunoSelecionado: '',
    }));

    setMensagemTurma(
      'Aluno vinculado à turma com sucesso!'
    );
  };

  /* =======================================================
     MENU
  ======================================================= */

  const menu = [
    {
      id: 'dashboard',
      label: 'Dashboard',
    },
    {
      id: 'alunos',
      label: 'Alunos',
    },
    {
      id: 'turmas',
      label: 'Turmas',
    },
    {
      id: 'notas',
      label: 'Notas',
    },
  ];

  /* =======================================================
     PÁGINAS
  ======================================================= */

  const renderPagina = () => {
    switch (pagina) {
      case 'alunos':
        return (
          <Alunos
            form={formAluno}
            alunos={alunos}
            message={mensagemAluno}
            onChange={alterarAluno}
            onSubmit={cadastrarAluno}
            onClear={limparAluno}
          />
        );

      case 'turmas':
        return (
          <Turmas
            form={formTurma}
            turmas={turmas}
            alunos={alunos}
            message={mensagemTurma}
            onChange={alterarTurma}
            onSubmit={cadastrarTurma}
            onClear={limparTurma}
            onVincularAluno={vincularAluno}
          />
        );

      case 'notas':
        return (
          <Notas
            alunos={alunos}
          />
        );

      case 'dashboard':
      default:
        return (
          <Dashboard
            alunos={alunos}
          />
        );
    }
  };

  /* =======================================================
     TELA
  ======================================================= */

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f5f7fb',
        }}
      >
        <AppBar
          position="static"
          elevation={0}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              gap: 2,
              flexWrap: 'wrap',
              py: 1,
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
            >
              Sistema Escolar
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                overflowX: 'auto',
                maxWidth: '100%',
              }}
            >
 {menu.map((item) => (
  <Button
    key={item.id}
    onClick={() => setPagina(item.id)}
    sx={{
      color: 'white',
      fontWeight: pagina === item.id ? 700 : 400,
      backgroundColor:
        pagina === item.id
          ? 'rgba(255,255,255,0.18)'
          : 'transparent',
      '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.25)',
      },
    }}
  >
    {item.label}
  </Button>
))}
            </Stack>
          </Toolbar>
        </AppBar>
        

        <Container
          maxWidth="xl"
          sx={{
            py: 4,
          }}
        >
          {renderPagina()}
        </Container>
      </Box>
    </>
  );
}

export default App;
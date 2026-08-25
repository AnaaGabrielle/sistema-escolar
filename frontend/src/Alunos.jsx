import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Paper,
    Stack,
    TextField,
    Typography,
  } from '@mui/material';
  
  function Alunos({
    form = {},
    alunos = [],
    message = '',
    onChange,
    onSubmit,
    onClear,
  }) {
    return (
      <Box>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 1 }}
        >
          Cadastro de Alunos
        </Typography>
  
        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Cadastre e consulte os alunos da escola.
        </Typography>
  
        {message && (
          <Alert
            severity={
              message.includes('sucesso')
                ? 'success'
                : 'error'
            }
            sx={{ mb: 3 }}
          >
            {message}
          </Alert>
        )}
  
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
            Novo aluno
          </Typography>
  
          <Divider sx={{ mb: 3 }} />
  
          <form onSubmit={onSubmit}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)',
                },
                gap: 2,
              }}
            >
              <TextField
                label="Nome completo"
                name="nome"
                value={form.nome || ''}
                onChange={onChange}
                required
                fullWidth
              />
  
              <TextField
                label="E-mail"
                name="email"
                type="email"
                value={form.email || ''}
                onChange={onChange}
                fullWidth
              />
  
              <TextField
                label="Data de nascimento"
                name="data_nascimento"
                type="date"
                value={form.data_nascimento || ''}
                onChange={onChange}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
  
              <TextField
                label="Série"
                name="serie"
                value={form.serie || ''}
                onChange={onChange}
                placeholder="Ex.: 1º Ano"
                fullWidth
              />
  
              <TextField
                label="CPF"
                name="cpf"
                value={form.cpf || ''}
                onChange={onChange}
                fullWidth
              />
  
              <TextField
                label="Telefone"
                name="telefone"
                value={form.telefone || ''}
                onChange={onChange}
                fullWidth
              />
  
              <TextField
                label="Endereço"
                name="endereco"
                value={form.endereco || ''}
                onChange={onChange}
                fullWidth
                sx={{
                  gridColumn: {
                    md: 'span 2',
                  },
                }}
              />
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
              >
                Cadastrar aluno
              </Button>
  
              <Button
                type="button"
                variant="outlined"
                size="large"
                onClick={onClear}
              >
                Limpar
              </Button>
            </Stack>
          </form>
        </Paper>
  
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 2 }}
        >
          Alunos cadastrados
        </Typography>
  
        {alunos.length === 0 ? (
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
              Nenhum aluno cadastrado
            </Typography>
  
            <Typography color="text.secondary">
              Os alunos cadastrados aparecerão aqui.
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
            {alunos.map((aluno) => (
              <Card
                key={aluno.id || aluno.email}
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
                    {aluno.nome}
                  </Typography>
  
                  {aluno.email && (
                    <Typography
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {aluno.email}
                    </Typography>
                  )}
  
                  {aluno.serie && (
                    <Typography sx={{ mt: 1 }}>
                      <strong>Série:</strong>{' '}
                      {aluno.serie}
                    </Typography>
                  )}
  
                  {aluno.telefone && (
                    <Typography>
                      <strong>Telefone:</strong>{' '}
                      {aluno.telefone}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    );
  }
  
  export default Alunos;
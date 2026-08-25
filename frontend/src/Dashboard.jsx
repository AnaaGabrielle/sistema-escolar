import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
  } from '@mui/material';
  
  function Dashboard({ alunos = [] }) {
    return (
      <Box>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ mb: 1 }}
        >
          Dashboard
        </Typography>
  
        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Visão geral do Sistema Escolar
        </Typography>
  
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                height: '100%',
              }}
            >
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  Total de alunos
                </Typography>
  
                <Typography
                  variant="h3"
                  fontWeight={700}
                >
                  {alunos.length}
                </Typography>
  
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Alunos cadastrados
                </Typography>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={4}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                height: '100%',
              }}
            >
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  Turmas
                </Typography>
  
                <Typography
                  variant="h3"
                  fontWeight={700}
                >
                  —
                </Typography>
  
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Acesse Turmas para cadastrar
                </Typography>
              </CardContent>
            </Card>
          </Grid>
  
          <Grid item xs={12} sm={6} md={4}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                height: '100%',
              }}
            >
              <CardContent>
                <Typography
                  color="text.secondary"
                  gutterBottom
                >
                  Notas
                </Typography>
  
                <Typography
                  variant="h3"
                  fontWeight={700}
                >
                  —
                </Typography>
  
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Consulte o boletim dos alunos
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
  
        <Card
          variant="outlined"
          sx={{
            borderRadius: 3,
            mt: 3,
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              fontWeight={700}
              gutterBottom
            >
              Bem-vinda ao Sistema Escolar
            </Typography>
  
            <Typography color="text.secondary">
              Utilize o menu acima para acessar
              alunos, turmas, notas e os demais
              módulos do sistema.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }
  
  export default Dashboard;
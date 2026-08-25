import React, { useEffect, useState } from "react";

function Turmas() {
  const [turmas, setTurmas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarTurmas();
  }, []);

  async function carregarTurmas() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch("http://localhost:3000/turmas");

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar as turmas.");
      }

      const dados = await resposta.json();

      setTurmas(dados);
    } catch (error) {
      console.error(error);
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-turmas">

      <div className="cabecalho-turmas">
        <div>
          <h1>Turmas</h1>
          <p>Visualize as turmas cadastradas no sistema escolar.</p>
        </div>

        <button
          className="botao-atualizar"
          onClick={carregarTurmas}
        >
          Atualizar
        </button>
      </div>

      {carregando && (
        <div className="mensagem">
          Carregando turmas...
        </div>
      )}

      {erro && (
        <div className="mensagem erro">
          {erro}
        </div>
      )}

      {!carregando && !erro && turmas.length === 0 && (
        <div className="mensagem">
          Nenhuma turma cadastrada.
        </div>
      )}

      {!carregando && turmas.length > 0 && (
        <div className="tabela-container">

          <table className="tabela-turmas">

            <thead>
              <tr>
                <th>ID</th>
                <th>Turma</th>
                <th>Série</th>
                <th>Turno</th>
                <th>Professor</th>
              </tr>
            </thead>

            <tbody>
              {turmas.map((turma) => (
                <tr key={turma.id}>

                  <td>{turma.id}</td>

                  <td>
                    <strong>
                      {turma.nome}
                    </strong>
                  </td>

                  <td>
                    {turma.serie}
                  </td>

                  <td>
                    {turma.turno}
                  </td>

                  <td>
                    {turma.professor}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default Turmas;
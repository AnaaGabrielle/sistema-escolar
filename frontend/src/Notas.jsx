import { useEffect, useState } from "react";
import "./Notas.css";

function Notas() {
    const [notas, setNotas] = useState([]);

    const [aluno, setAluno] = useState("");
    const [disciplina, setDisciplina] = useState("");
    const [bimestre, setBimestre] = useState("");
    const [nota, setNota] = useState("");

    useEffect(() => {
        const notasSalvas = localStorage.getItem("notas");

        if (notasSalvas) {
            setNotas(JSON.parse(notasSalvas));
        }
    }, []);

    function cadastrarNota(e) {
        e.preventDefault();

        if (!aluno || !disciplina || !bimestre || nota === "") {
            alert("Preencha todos os campos!");
            return;
        }

        const novaNota = {
            id: Date.now(),
            aluno,
            disciplina,
            bimestre,
            nota: Number(nota)
        };

        const novasNotas = [...notas, novaNota];

        setNotas(novasNotas);

        localStorage.setItem(
            "notas",
            JSON.stringify(novasNotas)
        );

        setAluno("");
        setDisciplina("");
        setBimestre("");
        setNota("");

        alert("Nota cadastrada com sucesso!");
    }

    function excluirNota(id) {
        const confirmar = window.confirm(
            "Deseja excluir esta nota?"
        );

        if (!confirmar) {
            return;
        }

        const novasNotas = notas.filter(
            (item) => item.id !== id
        );

        setNotas(novasNotas);

        localStorage.setItem(
            "notas",
            JSON.stringify(novasNotas)
        );
    }

    return (
        <div className="notas-container">

            <div className="notas-header">
                <div>
                    <h2>Boletim Digital</h2>

                    <p>
                        Cadastre e consulte as notas dos alunos.
                    </p>
                </div>

                <div className="contador-notas">
                    {notas.length} nota
                    {notas.length !== 1 ? "s" : ""}
                </div>
            </div>

            <div className="cadastro-nota">

                <h3>📝 Cadastro de Notas</h3>

                <form onSubmit={cadastrarNota}>

                    <div className="campo-nota">
                        <label>Aluno</label>

                        <input
                            type="text"
                            placeholder="Nome do aluno"
                            value={aluno}
                            onChange={(e) =>
                                setAluno(e.target.value)
                            }
                        />
                    </div>

                    <div className="campo-nota">
                        <label>Disciplina</label>

                        <input
                            type="text"
                            placeholder="Ex: Matemática"
                            value={disciplina}
                            onChange={(e) =>
                                setDisciplina(e.target.value)
                            }
                        />
                    </div>

                    <div className="campo-nota">
                        <label>Bimestre</label>

                        <select
                            value={bimestre}
                            onChange={(e) =>
                                setBimestre(e.target.value)
                            }
                        >
                            <option value="">
                                Selecione
                            </option>

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
                        </select>
                    </div>

                    <div className="campo-nota">
                        <label>Nota</label>

                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            placeholder="Ex: 8.5"
                            value={nota}
                            onChange={(e) =>
                                setNota(e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-salvar-nota"
                    >
                        💾 Salvar Nota
                    </button>

                </form>
            </div>

            <div className="lista-notas">

                <h3>📋 Notas cadastradas</h3>

                {notas.length === 0 ? (

                    <div className="sem-notas">
                        <div>📝</div>

                        <p>
                            Nenhuma nota cadastrada.
                        </p>

                        <span>
                            Cadastre a primeira nota usando o formulário acima.
                        </span>
                    </div>

                ) : (

                    <div className="tabela-notas">

                        <div className="linha-tabela cabecalho">
                            <span>Aluno</span>
                            <span>Disciplina</span>
                            <span>Bimestre</span>
                            <span>Nota</span>
                            <span>Ação</span>
                        </div>

                        {notas.map((item) => (

                            <div
                                className="linha-tabela"
                                key={item.id}
                            >

                                <span>
                                    {item.aluno}
                                </span>

                                <span>
                                    {item.disciplina}
                                </span>

                                <span>
                                    {item.bimestre}
                                </span>

                                <span className="nota-valor">
                                    {item.nota.toFixed(1)}
                                </span>

                                <span>
                                    <button
                                        className="btn-excluir-nota"
                                        onClick={() =>
                                            excluirNota(item.id)
                                        }
                                    >
                                        🗑️
                                    </button>
                                </span>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Notas;
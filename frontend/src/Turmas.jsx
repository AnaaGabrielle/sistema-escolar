import { useEffect, useState } from "react";
import "./Turmas.css";

function Turmas() {
    const [turmas, setTurmas] = useState([]);

    const [nome, setNome] = useState("");
    const [serie, setSerie] = useState("");
    const [ano, setAno] = useState("");
    const [turno, setTurno] = useState("");

    // Carregar turmas salvas
    useEffect(() => {
        const turmasSalvas = localStorage.getItem("turmas");

        if (turmasSalvas) {
            setTurmas(JSON.parse(turmasSalvas));
        }
    }, []);

    // Cadastrar turma
    function cadastrarTurma(e) {
        e.preventDefault();

        if (!nome || !serie || !ano || !turno) {
            alert("Preencha todos os campos!");
            return;
        }

        const novaTurma = {
            id: Date.now(),
            nome,
            serie,
            ano,
            turno
        };

        const novasTurmas = [...turmas, novaTurma];

        setTurmas(novasTurmas);
        localStorage.setItem("turmas", JSON.stringify(novasTurmas));

        // Limpar formulário
        setNome("");
        setSerie("");
        setAno("");
        setTurno("");

        alert("Turma cadastrada com sucesso!");
    }

    // Excluir turma
    function excluirTurma(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir esta turma?"
        );

        if (!confirmar) return;

        const novasTurmas = turmas.filter((turma) => turma.id !== id);

        setTurmas(novasTurmas);
        localStorage.setItem("turmas", JSON.stringify(novasTurmas));
    }

    return (
        <div className="turmas-container">

            <div className="turmas-header">
                <div>
                    <h2>Turmas</h2>
                    <p>
                        Cadastre e gerencie as turmas do sistema escolar.
                    </p>
                </div>

                <span className="contador">
                    {turmas.length} turma{turmas.length !== 1 ? "s" : ""}
                </span>
            </div>

            {/* FORMULÁRIO */}
            <div className="cadastro-turma">

                <h3>➕ Cadastrar nova turma</h3>

                <form onSubmit={cadastrarTurma}>

                    <div className="campo">
                        <label>Nome da turma</label>
                        <input
                            type="text"
                            placeholder="Ex: 1º Desenvolvimento de Sistemas"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label>Série</label>
                        <select
                            value={serie}
                            onChange={(e) => setSerie(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="1º Ano">1º Ano</option>
                            <option value="2º Ano">2º Ano</option>
                            <option value="3º Ano">3º Ano</option>
                        </select>
                    </div>

                    <div className="campo">
                        <label>Ano letivo</label>
                        <input
                            type="number"
                            placeholder="Ex: 2026"
                            value={ano}
                            onChange={(e) => setAno(e.target.value)}
                        />
                    </div>

                    <div className="campo">
                        <label>Turno</label>
                        <select
                            value={turno}
                            onChange={(e) => setTurno(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="Manhã">Manhã</option>
                            <option value="Tarde">Tarde</option>
                            <option value="Noite">Noite</option>
                            <option value="Integral">Integral</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-cadastrar">
                        Cadastrar turma
                    </button>

                </form>
            </div>

            {/* LISTA */}
            <div className="lista-turmas">

                <h3>Turmas cadastradas</h3>

                {turmas.length === 0 ? (
                    <div className="sem-turmas">
                        <div className="icone">📚</div>
                        <p>Nenhuma turma cadastrada.</p>
                        <span>
                            Cadastre uma turma usando o formulário acima.
                        </span>
                    </div>
                ) : (

                    <div className="cards-turmas">

                        {turmas.map((turma) => (

                            <div className="card-turma" key={turma.id}>

                                <div className="card-topo">
                                    <div className="icone-turma">
                                        📚
                                    </div>

                                    <button
                                        className="btn-excluir"
                                        onClick={() =>
                                            excluirTurma(turma.id)
                                        }
                                    >
                                        🗑️
                                    </button>
                                </div>

                                <h4>{turma.nome}</h4>

                                <div className="informacoes">

                                    <span>
                                        🎓 {turma.serie}
                                    </span>

                                    <span>
                                        📅 {turma.ano}
                                    </span>

                                    <span>
                                        🕐 {turma.turno}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Turmas;
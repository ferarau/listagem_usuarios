import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import UserListComponent from "./components/UserListComponent";
import UserDetailsComponent from "./components/UserDetailsComponent";
import UserFormComponent from "./components/UserFormComponent";
import Modal from "./components/Modal";
import SuccessMessage from "./components/SuccessMessage";
import ErrorMessage from "./components/ErrorMessage";
import "./styles.css";

const filtrarUsuarioPorTexto = (termo) => (usuario) => {
  const termoLower = termo.toLowerCase();

  return (
    usuario.name.toLowerCase().includes(termoLower) ||
    usuario.username.toLowerCase().includes(termoLower) ||
    usuario.email.toLowerCase().includes(termoLower)
  );
};

function App() {
  const url = "https://jsonplaceholder.typicode.com";
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const usuariosFiltrados = usuarios.filter(filtrarUsuarioPorTexto(busca));

  const mostrarMensagemSucesso = (msg) => {
    setSucesso(msg);
    setTimeout(() => setSucesso(null), 4000);
  };

  const handleAdicionarUsuario = (novoUsuario) => {
    setUsuarios([novoUsuario, ...usuarios]);
    setIsModalOpen(false);
    mostrarMensagemSucesso("Usuário cadastrado com sucesso!");
  };

  async function buscarUsuario(id) {
    const usuarioExistente = usuarios.find((u) => u.id === id);
    if (usuarioExistente && typeof id === "number" && id > 10) {
      setUsuarioSelecionado(usuarioExistente);
      return;
    }

    try {
      setErro(null);
      const response = await axios.get(`${url}/users/${id}`);
      setUsuarioSelecionado(response.data);
    } catch (error) {
      setErro(`Não foi possível carregar os detalhes do usuário. ${error.message}`);
    }
  }

  async function buscarUsuarios() {
    try {
      setCarregando(true);
      setErro(null);
      const response = await axios.get(`${url}/users`);
      setUsuarios(response.data);
    } catch (error) {
      setErro(`Não foi possível carregar os usuários. Código: ${error.message}`);
      setUsuarios([]);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Catálogo de Usuários</h1>

      <SuccessMessage mensagem={sucesso} />
      <ErrorMessage mensagem={erro} />

      {!usuarioSelecionado && (
        <div className="header-actions">
          <button 
            className="add-button" 
            onClick={() => setIsModalOpen(true)}
          >
            + Novo Usuário
          </button>

          <input
            type="text"
            className="search-input"
            placeholder="Filtrar por nome, usuário ou e-mail..."
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
          />
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserFormComponent
          onAdicionarUsuario={handleAdicionarUsuario}
          onCancelar={() => setIsModalOpen(false)}
        />
      </Modal>

      {carregando && <Loading />}

      {!carregando && (
        <>
          {usuarioSelecionado ? (
            <UserDetailsComponent
              usuario={usuarioSelecionado}
              onSelecionarUsuario={() => setUsuarioSelecionado(null)}
            />
          ) : (
            <>
              <p className="user-count">
                {usuariosFiltrados.length} usuário(s) encontrado(s)
              </p>

              <UserListComponent
                usuarios={usuariosFiltrados}
                onSelecionarUsuario={(usuario) => buscarUsuario(usuario.id)}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;
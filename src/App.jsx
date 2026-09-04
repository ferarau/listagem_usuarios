import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import UserListComponent from "./components/UserListComponent";
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
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

  const usuariosFiltrados = usuarios.filter(filtrarUsuarioPorTexto(busca));

  async function buscarUsuarios() {
    try {
      setCarregando(true);
      const response = await axios.get(`${url}/users`);
      setUsuarios(response.data);
    } catch (error) {
      console.log("ERRO ao buscar usuários: ", error);
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

      <input
        type="text"
        className="search-input"
        placeholder="Filtrar por nome, usuário ou e-mail..."
        value={busca}
        onChange={(evento) => setBusca(evento.target.value)}
      />

      {carregando && <Loading />}

      {erro && <p className="error-message">{erro}</p>}

      {!carregando && !erro && (
        <>
          <p className="user-count">
            {usuariosFiltrados.length} usuário(s) encontrado(s)
          </p>
          <UserListComponent usuarios={usuariosFiltrados} />
        </>
      )}
    </div>
  );
}

export default App;
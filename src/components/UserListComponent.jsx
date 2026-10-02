import React from "react";

function UserListComponent({ usuarios, onSelecionarUsuario, onExcluirUsuario }) {
  if (usuarios.length === 0) {
    return <p className="no-results">Nenhum usuário encontrado.</p>;
  }

  return (
    <ul className="user-list">
      {usuarios.map((usuario) => (
        <li 
          key={usuario.id} 
          className="user-card"
          onClick={() => onSelecionarUsuario(usuario)} 
          style={{ cursor: 'pointer' }} 
        >
          <div className="user-info">
            <strong className="user-name">{usuario.name}</strong>
            <span className="user-username">@{usuario.username}</span>
            <span className="user-email">✉️ {usuario.email}</span>
          </div>

          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation(); // Impede que o clique no botão abra os detalhes do usuário
              onExcluirUsuario(usuario.id, e);
            }}
            title="Excluir Usuário"
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
}

export default UserListComponent;
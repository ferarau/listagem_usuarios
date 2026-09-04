import React from "react";

function UserListComponent({ usuarios }) {
  if (usuarios.length === 0) {
    return <p className="no-results">Nenhum usuário encontrado.</p>;
  }

  return (
    <ul className="user-list">
      {usuarios.map((usuario) => (
        <li key={usuario.id} className="user-card">
          <strong className="user-name">{usuario.name}</strong>
          <span className="user-username">@{usuario.username}</span>
          <span className="user-email">✉️ {usuario.email}</span>
        </li>
      ))}
    </ul>
  );
}

export default UserListComponent;
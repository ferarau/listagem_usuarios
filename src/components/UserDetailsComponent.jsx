import React from "react";

function UserDetailsComponent({ usuario, onSelecionarUsuario }) {
  if (!usuario) return null;

  return (
    <div className="user-details">
      <h2>Detalhes do usuário</h2>
      <p>
        <strong>Nome: </strong>{usuario.name}
      </p>
      <p>
        <strong>Email: </strong>{usuario.email}
      </p>
      <p>
        <strong>Cidade: </strong>{usuario.address.city}
      </p>
      <p>
        <strong>Telefone: </strong>{usuario.phone}
      </p>
      <p>
        <strong>Website: </strong>{usuario.website}
      </p>

      <button className="back-button" onClick={() => onSelecionarUsuario(null)}>
        Voltar para a lista
      </button>
    </div>
  );
}

export default UserDetailsComponent;
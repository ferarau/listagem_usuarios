function NovoUsuarioComponent({novoUsuario}){
    return(
        <div>
            <h2>Novo usuário cadastrado</h2>

            <p>
                <strong>Nome: </strong>{novoUsuario.name}
            </p>

            <p>
                <strong>Usuario: </strong>{novoUsuario.username}
            </p>

            <p>
                <strong>Email: </strong>{novoUsuario.email}
            </p>
        </div>
    )
}

export default NovoUsuarioComponent
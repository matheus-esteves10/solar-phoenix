package br.com.fiap.dao.usuario;

public final class UsuarioDaoFactory {
    private UsuarioDaoFactory() {
    }

    public static DaoUsuario create (){
        return new DaoUsuarioImpl();
    }
}

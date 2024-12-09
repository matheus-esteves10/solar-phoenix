package br.com.fiap.service.usuario;

public final class ServiceUsuarioFactory {
    private ServiceUsuarioFactory() {
    }

    public static ServiceUsuario create (){
        return new ServiceUsuarioImpl();
    }
}

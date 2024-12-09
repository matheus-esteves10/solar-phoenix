package br.com.fiap.service.compra;

public final class ServiceCompraFactory {

    private ServiceCompraFactory() {

    }

    public static ServiceCompra create() {
        return new ServiceCompraImpl();
    }
}

package br.com.fiap.service.produto;

public final class ServiceProdutoFactory {
    private ServiceProdutoFactory() {
    }

    public static ServiceProduto create() {
        return new ServiceProdutoImpl();
    }
}

package br.com.fiap.dao.produto;

public final class DaoProdutoFactory {

    private DaoProdutoFactory() {
    }

    public static DaoProduto create() {
        return new DaoProdutoImpl();
    }
}

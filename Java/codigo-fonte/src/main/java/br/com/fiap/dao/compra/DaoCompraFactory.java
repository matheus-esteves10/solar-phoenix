package br.com.fiap.dao.compra;

public final class DaoCompraFactory {

    private DaoCompraFactory() {
    }

    public static DaoCompra create() {
        return new DaoCompraImpl();
    }
}

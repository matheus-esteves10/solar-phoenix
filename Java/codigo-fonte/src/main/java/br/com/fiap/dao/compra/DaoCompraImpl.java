package br.com.fiap.dao.compra;

import br.com.fiap.config.DatabaseConnectionFactory;
import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.exceptions.NotSavedException;
import br.com.fiap.model.Compra;
import br.com.fiap.model.CompraProduto;
import br.com.fiap.model.Produto;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class DaoCompraImpl implements DaoCompra {

    private Connection connection;
    private final Logger logger = Logger.getLogger(this.getClass().getName());

    public DaoCompraImpl() {
    }
    public DaoCompraImpl(Connection connection) {
        this.connection = connection;
    }


    @Override
    public List<Produto> buscarValorProdutos(List<Long> idsProdutos) throws NotFoundException {
        List<Produto> valoresProduto = new ArrayList<>();
        Connection connection = null;
        PreparedStatement stmtValor = null;
        ResultSet rsValor = null;

        try {
            connection = DatabaseConnectionFactory.create().get();


            stmtValor = connection.prepareStatement("SELECT id_produto, valor_produto FROM t_sph_produtos WHERE id_produto = ?");

            for (Long idProduto : idsProdutos) {
                stmtValor.setLong(1, idProduto);
                rsValor = stmtValor.executeQuery();

                if (rsValor.next()) {
                    Produto produto = new Produto();
                    produto.setIdProduto(rsValor.getLong("id_produto"));
                    produto.setValorProduto(rsValor.getDouble("valor_produto"));

                    valoresProduto.add(produto);
                } else {
                    throw new NotFoundException();
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Erro ao buscar produtos por compra", e);
        } finally {
            try {
                if (rsValor != null) rsValor.close();
                if (stmtValor != null) stmtValor.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return valoresProduto;
    }

    @Override
    public Compra save(Compra compra, Connection connection) throws SQLException, NotSavedException {
        final String sqlCompra = "BEGIN INSERT INTO t_sph_compra (valor_compra, is_pago, T_SPH_USUARIO_ID_USUARIO, quant_parcelas, data_compra) VALUES (?, ?, ?, ?, ?) RETURNING ID_COMPRA INTO ?; END;";
        CallableStatement callableStatement = connection.prepareCall(sqlCompra);

        callableStatement.setDouble(1, compra.getValorCompra());
        callableStatement.setInt(2, compra.getIsPago());
        callableStatement.setLong(3, compra.getIdUsuario());
        callableStatement.setInt(4, compra.getNumeroParcelas());
        callableStatement.setDate(5, Date.valueOf(compra.getDataCompra()));
        callableStatement.registerOutParameter(6, Types.NUMERIC);
        callableStatement.execute();

        long idCompra = callableStatement.getLong(6);
        if (idCompra == 0) {
            throw new NotSavedException();
        }

        compra.setIdCompra(idCompra);

        // Inserção na tabela t_sph_compra_produto
        final String sqlCompraProduto = "INSERT INTO t_sph_compra_produto (t_sph_compra_id_compra, t_sph_produtos_id_produto, quantidade) VALUES (?, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sqlCompraProduto);

        for (CompraProduto produto : compra.getItensCompra()) {
            preparedStatement.setLong(1, idCompra);
            preparedStatement.setLong(2, produto.getIdProduto());
            preparedStatement.setInt(3, produto.getQuantidade());
            preparedStatement.addBatch();
        }

        preparedStatement.executeBatch();
        return compra;
    }
}

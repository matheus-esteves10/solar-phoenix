package br.com.fiap.service.compra;

import br.com.fiap.config.DatabaseConnectionFactory;
import br.com.fiap.dao.compra.DaoCompra;
import br.com.fiap.dao.compra.DaoCompraFactory;
import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.exceptions.NotSavedException;
import br.com.fiap.exceptions.UnsupportedServiceOperationException;
import br.com.fiap.model.Compra;
import br.com.fiap.model.CompraProduto;
import br.com.fiap.model.Produto;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ServiceCompraImpl implements ServiceCompra {

    private final DaoCompra dao = DaoCompraFactory.create();

    @Override
    public double calcularValorTotal(List<CompraProduto> produtos) throws NotFoundException {
        double valorTotal = 0.0;

        // Extrair todos os ids dos produtos para passar para a DAO
        List<Long> idsProdutos = new ArrayList<>();
        for (CompraProduto compraProduto : produtos) {
            Produto produto = compraProduto.getProduto();  // Produto já atribuído ao CompraProduto
            if (produto == null || produto.getIdProduto() == null) {
                throw new NotFoundException();
            }
            idsProdutos.add(produto.getIdProduto());
        }

        List<Produto> valoresProduto = dao.buscarValorProdutos(idsProdutos);

        Map<Long, Double> mapValoresProduto = new HashMap<>(); // Mapeando os valores dos produtos para facilitar o acesso
        for (Produto produto : valoresProduto) {
            mapValoresProduto.put(produto.getIdProduto(), produto.getValorProduto());
        }


        for (CompraProduto compraProduto : produtos) { // Mapear os valores dos produtos para facilitar o acesso
            Produto produto = compraProduto.getProduto();  // Produto com valor atribuído
            Long idProduto = produto.getIdProduto();
            Integer quantidade = compraProduto.getQuantidade();

            if (quantidade == null) {
                throw new NotFoundException();
            }

            // Obter o valor do produto a partir do map
            Double valorProduto = mapValoresProduto.get(idProduto);

            if (valorProduto == null) {
                throw new NotFoundException();
            }

            // Calcular o valor total e somar ao valor total
            valorTotal += valorProduto * quantidade;
        }

        return valorTotal;
    }

    @Override
    public Compra save(Compra compra) throws UnsupportedServiceOperationException, SQLException, NotSavedException {
        if (compra.getIdCompra() == null) {
            Connection connection = DatabaseConnectionFactory.create().get();
            try {
                compra = this.dao.save(compra, connection);
                connection.commit();
                return compra;
            } catch (SQLException | NotSavedException e) {
                connection.rollback();
                throw e;
            }
        } else {
            throw new UnsupportedServiceOperationException();
        }
    }
}


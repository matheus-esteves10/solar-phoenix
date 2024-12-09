package br.com.fiap.dao.compra;

import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.exceptions.NotSavedException;
import br.com.fiap.model.Compra;
import br.com.fiap.model.Produto;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface DaoCompra {

    List<Produto> buscarValorProdutos(List<Long> idsProdutos) throws NotFoundException;

    Compra save (Compra compra, Connection connection) throws SQLException, NotSavedException;


}

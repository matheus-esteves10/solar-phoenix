package br.com.fiap.service.produto;

import br.com.fiap.dao.produto.DaoProduto;
import br.com.fiap.dao.produto.DaoProdutoFactory;
import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.model.Produto;

import java.util.List;

public class ServiceProdutoImpl implements ServiceProduto{

    private final DaoProduto daoProduto = DaoProdutoFactory.create();
    @Override
    public List<Produto> findAll() {
        return this.daoProduto.readAll();
    }

    @Override
    public Produto findById(Long id) throws NotFoundException {
        return this.daoProduto.readById(id);
    }
}

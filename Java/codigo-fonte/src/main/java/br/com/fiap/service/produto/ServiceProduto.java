package br.com.fiap.service.produto;

import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.model.Produto;

import java.util.List;

public interface ServiceProduto {

    List<Produto> findAll();

    Produto findById(Long id) throws NotFoundException;
}

package br.com.fiap.dao.produto;

import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.model.Produto;

import java.util.List;

public interface DaoProduto {

    List<Produto> readAll();

    Produto readById(Long id) throws NotFoundException;
}

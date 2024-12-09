package br.com.fiap.service.usuario;

import br.com.fiap.dto.LoginDto2;
import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.exceptions.NotSavedException;
import br.com.fiap.exceptions.UnsupportedServiceOperationException;
import br.com.fiap.model.Usuario;

import java.sql.SQLException;

public interface ServiceUsuario {

    Usuario create (Usuario usuario) throws UnsupportedServiceOperationException, SQLException, NotSavedException;

    Usuario update (Usuario usuario) throws NotFoundException, SQLException;

    void deleteById (Long id) throws NotFoundException, SQLException;

    LoginDto2 realizarLogin(String login, String senha) throws NotFoundException;

}

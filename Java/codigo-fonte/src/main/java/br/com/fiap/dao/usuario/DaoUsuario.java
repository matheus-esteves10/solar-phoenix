package br.com.fiap.dao.usuario;

import br.com.fiap.dto.LoginDto2;
import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.exceptions.NotSavedException;
import br.com.fiap.model.Usuario;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public interface DaoUsuario {

    Usuario save (Usuario usuario, Connection connection) throws SQLException, NotSavedException;

    Usuario update(Usuario usuario, Connection connection) throws SQLException, NotFoundException;

    void deleteById (Long id, Connection connection) throws SQLException, NotFoundException;


    LoginDto2 checkLogin(String login, String senha) throws NotFoundException;
}

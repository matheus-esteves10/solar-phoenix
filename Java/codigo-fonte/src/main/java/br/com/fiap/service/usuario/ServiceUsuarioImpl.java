package br.com.fiap.service.usuario;

import br.com.fiap.config.DatabaseConnection;
import br.com.fiap.config.DatabaseConnectionFactory;
import br.com.fiap.dao.usuario.DaoUsuario;
import br.com.fiap.dao.usuario.UsuarioDaoFactory;
import br.com.fiap.dto.LoginDto2;
import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.exceptions.NotSavedException;
import br.com.fiap.exceptions.UnsupportedServiceOperationException;
import br.com.fiap.model.Usuario;

import java.sql.Connection;
import java.sql.SQLException;

public class ServiceUsuarioImpl implements ServiceUsuario {

    private final DaoUsuario dao = UsuarioDaoFactory.create();

    @Override
    public Usuario create(Usuario usuario) throws UnsupportedServiceOperationException, SQLException, NotSavedException {
        if (usuario.getId() == null){
            Connection connection = DatabaseConnectionFactory.create().get();
            try {
                usuario = this.dao.save(usuario, connection);
                connection.commit();
                return usuario;
            } catch (SQLException | NotSavedException e) {
                connection.rollback();
                throw e;
            }
        } else {
            throw new UnsupportedServiceOperationException();
        }
    }

    @Override
    public Usuario update(Usuario usuario) throws NotFoundException, SQLException {
        Connection connection = DatabaseConnectionFactory.create().get();
        usuario = this.dao.update(usuario, connection);
        connection.commit();
        return usuario;
    }

    @Override
    public void deleteById(Long id) throws NotFoundException, SQLException {
        Connection connection = DatabaseConnectionFactory.create().get();
        this.dao.deleteById(id, connection);
        connection.commit();
    }

    public LoginDto2 realizarLogin(String login, String senha) throws NotFoundException {
        return dao.checkLogin(login, senha);
    }
}

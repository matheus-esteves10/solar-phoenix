package br.com.fiap.dao.usuario;

import br.com.fiap.config.DatabaseConnectionFactory;
import br.com.fiap.dto.LoginDto2;
import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.exceptions.NotSavedException;
import br.com.fiap.model.Usuario;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class DaoUsuarioImpl implements DaoUsuario {

    private Connection connection;
    private final Logger logger = Logger.getLogger(this.getClass().getName());

    public DaoUsuarioImpl() {
    }

    public DaoUsuarioImpl(Connection connection) {
        this.connection = connection;
    }


    @Override
    public Usuario save(Usuario usuario, Connection connection) throws SQLException, NotSavedException {
        final String sql = "BEGIN INSERT INTO t_sph_usuario (nome, cpf, data_nasc, email,endereco, senha) VALUES (?, ?, ?, ?, ?, ?) RETURNING ID_USUARIO INTO ?; END;";
        CallableStatement callableStatement = connection.prepareCall(sql);
        callableStatement.setString(1, usuario.getNome());
        callableStatement.setString(2, usuario.getCpf());
        callableStatement.setDate(3, java.sql.Date.valueOf(usuario.getDataNacimento()));
        callableStatement.setString(4, usuario.getEmail());
        callableStatement.setString(5, usuario.getEndereco());
        callableStatement.setString(6, usuario.getSenha());

        callableStatement.registerOutParameter(7, Types.NUMERIC);
        callableStatement.execute();
        long id = callableStatement.getInt(7);
        if (id == 0) {
            throw new NotSavedException();
        }
        usuario.setId(id);
        return usuario;
    }

    @Override
    public Usuario update(Usuario usuario, Connection connection) throws SQLException, NotFoundException {
        final String sql = "UPDATE t_sph_usuario SET nome = ?, cpf = ?, data_nasc = ?, email = ?, endereco = ?, senha = ? WHERE id_usuario = ?";
        PreparedStatement stmt = connection.prepareStatement(sql);
        stmt.setString(1, usuario.getNome());
        stmt.setString(2, usuario.getCpf());
        stmt.setDate(3, java.sql.Date.valueOf(usuario.getDataNacimento()));
        stmt.setString(4, usuario.getEmail());
        stmt.setString(5, usuario.getEndereco());
        stmt.setString(6, usuario.getSenha());
        stmt.setLong(7, usuario.getId());
        stmt.executeUpdate();

        int linhasAlteradas = stmt.executeUpdate();
        if (linhasAlteradas == 0) {
            throw new NotFoundException();
        }

        return usuario;
    }

    @Override
    public void deleteById(Long id, Connection connection) throws SQLException, NotFoundException {
        final String sql = "DELETE FROM t_sph_usuario WHERE id_usuario = ?";
        PreparedStatement stmt = connection.prepareStatement(sql);
        stmt.setLong(1, id);
        int linhasAlteradas = stmt.executeUpdate();
        if (linhasAlteradas == 0) {
            throw new NotFoundException();
        }

    }

    @Override
    public LoginDto2 checkLogin(String login, String senha) {
        final String sql = "SELECT * FROM t_sph_usuario WHERE (EMAIL = ?  AND SENHA = ?) OR (CPF = ? AND SENHA = ?)";

        try (Connection connection = DatabaseConnectionFactory.create().get()) {
            PreparedStatement stmt = connection.prepareStatement(sql);

            stmt.setString(1, login);
            stmt.setString(2, senha);
            stmt.setString(3, login);
            stmt.setString(4, senha);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                LoginDto2 loginDto2 = new LoginDto2();
                loginDto2.setId(rs.getLong("ID_USUARIO"));
                loginDto2.setNome(rs.getString("NOME"));
//                usuario.setEmail(rs.getString("EMAIL"));
//                usuario.setCpf(rs.getString("CPF"));
//                usuario.setSenha(rs.getString("SENHA"));

                return loginDto2;
            }
        } catch (SQLException e) {
            e.printStackTrace();

        }

        return null;
    }

}


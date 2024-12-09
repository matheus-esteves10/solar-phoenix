package br.com.fiap.dao.produto;

import br.com.fiap.config.DatabaseConnectionFactory;
import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.model.Produto;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class DaoProdutoImpl implements DaoProduto{

    private Connection connection;
    private final Logger logger = Logger.getLogger(this.getClass().getName());
    @Override
    public List<Produto> readAll() {
        List<Produto> result = new ArrayList<>();
        final String sql = "SELECT * FROM t_sph_produtos";
        try(Connection connection = DatabaseConnectionFactory.create().get()){
            PreparedStatement pstm = connection.prepareStatement(sql);
            ResultSet rs = pstm.executeQuery();
            while(rs.next()){
                Long id = rs.getLong("id_produto");
                String nome = rs.getString("nome_produto");
                Double valor = rs.getDouble("valor_produto");
                String imagem = rs.getString("imagem_produto");
                String ds = rs.getString("ds_produto");
                float eficiencia = rs.getFloat("eficiencia_produto");
                int potencia = rs.getInt("potencia_produto");

                result.add(new Produto(id, nome, valor, imagem, ds, eficiencia, potencia));
            }
        } catch (SQLException e){
            logger.warning("não foi possível localizar nenhum registro dos produtos: "+e.getMessage());
        }
        return result;
    }

    @Override
    public Produto readById(Long id) throws NotFoundException {
        final String sql = "SELECT * FROM t_sph_produtos WHERE id_produto = ?";
        try(Connection connection = DatabaseConnectionFactory.create().get()){
            PreparedStatement pstm = connection.prepareStatement(sql);

            pstm.setLong(1, id);
            try(ResultSet rs = pstm.executeQuery()) {
                if(rs.next()) {
                    String nome = rs.getString("nome_produto");
                    Double valor = rs.getDouble("valor_produto");
                    String imagem = rs.getString("imagem_produto");
                    String ds = rs.getString("ds_produto");
                    float eficiencia = rs.getFloat("eficiencia_produto");
                    int potencia = rs.getInt("potencia_produto");
                    return new Produto(id, nome, valor, imagem, ds, eficiencia, potencia);
                } else {
                    throw new NotFoundException();
                }
            }
        } catch (SQLException e){
            logger.warning("não foi 가능 localizar nenhum registro do produto: "+e.getMessage());
            throw new RuntimeException("Erro de banco de dados ao buscar produto por ID.", e);
        }
    }
}

package br.com.fiap.dto;

public record ProdutoDto(Long id,
                         String nome,
                         Double valor,
                         String imagem,
                         String descricao,
                         float eficiencia,
                         int potencia) {
}

package br.com.fiap.model;

public class CompraProduto {
    private Long idCompraProduto;
    private Integer quantidade;
    private Long idCompra;
    private Long idProduto;
    private Produto produto;

    public CompraProduto() {
    }

    public CompraProduto(Long idCompraProduto, Integer quantidade, Long idCompra, Long idProduto) {
        this.idCompraProduto = idCompraProduto;
        this.quantidade = quantidade;
        this.idCompra = idCompra;
        this.idProduto = idProduto;
    }

    public Long getIdCompraProduto() {
        return idCompraProduto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public Long getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Long idCompra) {
        this.idCompra = idCompra;
    }

    public Long getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(Long idProduto) {
        this.idProduto = idProduto;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}

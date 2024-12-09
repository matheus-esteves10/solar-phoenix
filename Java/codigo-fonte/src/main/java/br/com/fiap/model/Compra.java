package br.com.fiap.model;

import java.time.LocalDate;
import java.util.List;

public class Compra {

    private Long idCompra;
    private Double valorCompra;
    private Integer isPago; // Altere para Integer para facilitar a compatibilidade com o banco de dados
    private int numeroParcelas;
    private Long idUsuario;
    private LocalDate dataCompra;
    private List<CompraProduto> itensCompra;

    public Compra() {
    }

    public Compra(Long idCompra, Double valorCompra, Boolean isPago, int numeroParcelas, Long idUsuario, LocalDate dataCompra, List<CompraProduto> itensCompra) {
        if (isPago != null && !isPago) {
            throw new IllegalArgumentException("A compra não pode ser construída com isPago = false.");
        }
        this.idCompra = idCompra;
        this.valorCompra = valorCompra;
        this.isPago = (isPago != null && isPago) ? 1 : 0;
        this.numeroParcelas = numeroParcelas;
        this.idUsuario = idUsuario;
        setDataCompra(dataCompra);
        this.itensCompra = itensCompra;
    }

    public Long getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(Long idCompra) {
        this.idCompra = idCompra;
    }

    public Double getValorCompra() {
        return valorCompra;
    }

    public Integer getIsPago() {
        return isPago;
    }

    public void setIsPago(Boolean pago) {
        this.isPago = (pago != null && pago) ? 1 : 0;
    }

    public int getNumeroParcelas() {
        return numeroParcelas;
    }

    public void setNumeroParcelas(int numeroParcelas) {
        this.numeroParcelas = numeroParcelas;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public LocalDate getDataCompra() {
        return dataCompra;
    }

    public void setDataCompra(LocalDate dataCompra) {
        this.dataCompra = LocalDate.now();
    }

    public List<CompraProduto> getItensCompra() {
        return itensCompra;
    }
}

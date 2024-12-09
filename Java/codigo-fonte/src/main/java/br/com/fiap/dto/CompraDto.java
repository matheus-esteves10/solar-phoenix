package br.com.fiap.dto;

import br.com.fiap.model.CompraProduto;

import java.time.LocalDate;
import java.util.List;

public record CompraDto(Long idCompra,
                        Double valorCompra,
                        Boolean isPago,
                        Long idUsuario,
                        int quantidadeParcelas,
                        LocalDate dataCompra,
                        List<CompraProduto>produtos
                        ) {
}

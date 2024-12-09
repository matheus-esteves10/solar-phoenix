package br.com.fiap.controller;

import br.com.fiap.dto.CompraDto;
import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.exceptions.NotSavedException;
import br.com.fiap.exceptions.UnsupportedServiceOperationException;
import br.com.fiap.model.Compra;
import br.com.fiap.model.CompraProduto;
import br.com.fiap.model.Produto;
import br.com.fiap.service.compra.ServiceCompra;
import br.com.fiap.service.compra.ServiceCompraFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Path("/compra")
public class CompraController {

    private final ServiceCompra compraService = ServiceCompraFactory.create();

    @POST
    @Path("/total")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response calcularValorTotal(List<CompraProduto> produtos) {
        try {

            double valorTotal = compraService.calcularValorTotal(produtos);

            // Retorna o valor total em formato JSON
            return Response.ok().entity("{\"valorTotal\": " + valorTotal + "}").build();

        } catch (NotFoundException e) {
            // Retorna um erro caso algum produto não seja encontrado
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"Produto não encontrado - " + e.getMessage() + "\"}")
                    .build();
        } catch (Exception e) {
            // Retorna um erro interno caso ocorra algum problema não esperado
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\": \"Erro interno: " + e.getMessage() + "\"}")
                    .build();
        }
    }

    @POST
    @Path("/salvaCompra")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response salvaCompra(CompraDto compraDto) throws UnsupportedServiceOperationException {
        if (compraDto.idCompra() == null) {
            try {
                Compra compra = new Compra(
                        null,
                        compraDto.valorCompra(),
                        compraDto.isPago(),
                        compraDto.quantidadeParcelas(),
                        compraDto.idUsuario(),
                        compraDto.dataCompra(),
                        compraDto.produtos()
                );

                compra = this.compraService.save(compra);
                return Response.status(Response.Status.CREATED)
                        .entity(compra)
                        .build();
            } catch (SQLException | NotSavedException e) {
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity(Map.of("mensagem", "Erro inesperado ao tentar inserir compra: " + e)).build();
            }
        } else {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(Map.of("mensagem", "Esse método só permite a criação de novas compras"))
                    .build();
        }
    }
}



package br.com.fiap.controller;

import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.service.produto.ServiceProduto;
import br.com.fiap.service.produto.ServiceProdutoFactory;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("produtos")
public class ProdutoController {

    private final ServiceProduto serviceProduto = ServiceProdutoFactory.create();

    @GET
    @Path("")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAll() {
        return Response.status(Response.Status.OK)
                .entity(this.serviceProduto.findAll()).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") Long id) {
        try {
            return Response.status(Response.Status.OK)
                    .entity(this.serviceProduto.findById(id)).build();
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }



}

package br.com.fiap.controller;

import br.com.fiap.dto.LoginDto;
import br.com.fiap.dto.LoginDto2;
import br.com.fiap.dto.UsuarioDto;
import br.com.fiap.exceptions.NotFoundException;
import br.com.fiap.exceptions.NotSavedException;
import br.com.fiap.exceptions.UnsupportedServiceOperationException;
import br.com.fiap.model.Usuario;
import br.com.fiap.service.usuario.ServiceUsuario;
import br.com.fiap.service.usuario.ServiceUsuarioFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.sql.SQLException;
import java.util.Map;

@Path("/usuario")
public class UsuarioController {
    private final ServiceUsuario serviceUsuario = ServiceUsuarioFactory.create();

    @POST
    @Path("")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response add(UsuarioDto usuarioDto) throws UnsupportedServiceOperationException {
        if (usuarioDto.id() == null) {
            try {
                Usuario usuario = this.serviceUsuario.create(new Usuario(null,usuarioDto.senha(), usuarioDto.endereco(), usuarioDto.email(), usuarioDto.dataNascimento(), usuarioDto.cpf(), usuarioDto.nome()));
                return Response.status(Response.Status.CREATED).
                        entity(usuario).
                        build();
            } catch (SQLException | NotSavedException e){
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity(Map.of("mensagem","erro inesperado ao tentar inserir usuario: " + e)).build();
            }
        } else {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(
                            Map.of(
                                    "mensagem",
                                    "esse método só permite a criação de novos usuarios"))
                    .build();
        }
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") Long id, UsuarioDto usuarioDto) {
        try {
            Usuario updated = this.serviceUsuario.update(new Usuario(id,usuarioDto.senha(), usuarioDto.endereco(), usuarioDto.email(), usuarioDto.dataNascimento(), usuarioDto.cpf(), usuarioDto.nome()));
            return Response.status(Response.Status.OK).entity(updated).build();
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        } catch (SQLException s) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("mensagem","erro inesperado ao tentar atualizar usuario")).build();
        }
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") Long id) {
        try {
            this.serviceUsuario.deleteById(id);
            return Response.status(Response.Status.NO_CONTENT).build();
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).build();
        } catch (SQLException s) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(s.getMessage()).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(LoginDto loginDto) {

        LoginDto2 usuario = null;
        try {
            usuario = serviceUsuario.realizarLogin(loginDto.login(), loginDto.senha());
        } catch (NotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Usuário não encontrado").build();
        }

        if (usuario != null) {
            return Response.ok(usuario).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Credenciais inválidas").build();
        }
    }


}

package br.com.fiap.dto;

import java.time.LocalDate;

public record UsuarioDto(Long id,
                         String nome,
                         String cpf,
                         LocalDate dataNascimento,
                         String email,
                         String endereco,
                         String senha) {
}

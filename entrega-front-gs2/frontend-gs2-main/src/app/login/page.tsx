"use client";

import styles from "./page.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Interface para os dados de login e cadastro
interface LoginData {
  login: string;
  senha: string;
}

interface SignupData {
  nome: string;
  cpf: string;
  dataNascimento: [number, number, number];
  email: string;
  endereco: string;
  senha: string;
}

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false); // Para alternar entre login e cadastro
  const [loginData, setLoginData] = useState<LoginData>({ login: "", senha: "" });
  const [signupData, setSignupData] = useState<SignupData>({
    nome: "",
    cpf: "",
    dataNascimento: [0, 0, 0],
    email: "",
    endereco: "",
    senha: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  // Função para alternar entre login e cadastro
  const toggleForm = () => {
    setIsSignup(!isSignup);
    setErrorMessage(""); // Limpar mensagem de erro ao alternar
  };

  // Função para fazer o login
  const handleLogin = async () => {
    try {
      console.log(loginData);
      const response = await axios.post("http://localhost:8080/gs_2sem_war/api/usuario/login", loginData);

      if (response.status === 200) {
        const { id, nome } = response.data;

        // Armazenando no localStorage de forma segura
        if (typeof window !== "undefined") {
          localStorage.setItem("idUsuario", id);
          localStorage.setItem("nomeUsuario", nome);
        }

        router.push("/comprar"); // Redireciona para a página de compras
      }
    } catch (error) {
      setErrorMessage("Login ou senha inválido(s).");
      console.log(error);
    }
  };

  // Função para fazer o cadastro
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:8080/gs_2sem_war/api/usuario", signupData);

      if (response.status === 201) {
        setIsSignup(false); // Após o cadastro, alterna para a tela de login
      }
    } catch (error) {
      setErrorMessage("Erro ao cadastrar. Tente novamente.");
      console.log(error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="text-center mb-6">
          <button
            onClick={() => router.push('/')}
            className="text-[#FB902D] hover:text-yellow-800 text-md mb-3 font-bold"
          >
            Voltar para a Home
          </button>
        </div>
        
        <h2 className="text-3xl font-bold mb-6 text-[#333] text-center">
          {isSignup ? "Cadastro" : "Login"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isSignup) {
              handleSignup();
            } else {
              handleLogin();
            }
          }}
          className="space-y-4"
        >
          {isSignup ? (
            <>
              <input
                type="text"
                placeholder="Nome"
                value={signupData.nome}
                onChange={(e) => setSignupData({ ...signupData, nome: e.target.value })}
                className="w-full p-3 border border-[#aaa] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-[#fff]"
                required
              />
              <input
                type="text"
                placeholder="CPF"
                value={signupData.cpf}
                onChange={(e) => setSignupData({ ...signupData, cpf: e.target.value })}
                className="w-full p-3 border border-[#aaa] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-[#fff]"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                className="w-full p-3 border border-[#aaa] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-[#fff]"
                required
              />
              <input
                type="text"
                placeholder="Endereço"
                value={signupData.endereco}
                onChange={(e) => setSignupData({ ...signupData, endereco: e.target.value })}
                className="w-full p-3 border border-[#aaa] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-[#fff]"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={signupData.senha}
                onChange={(e) => setSignupData({ ...signupData, senha: e.target.value })}
                className="w-full p-3 border border-[#aaa] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-[#fff]"
                required
              />
              <p className="text-gray-400">
                Data de Nascimento
              </p>
              <div className={`${styles.divInputNum} flex space-x-2 items-center`}>
                <label>Dia</label>
                <input
                  type="number"
                  placeholder="Dia"
                  value={signupData.dataNascimento[2]}
                  onChange={(e) => setSignupData({ ...signupData, dataNascimento: [signupData.dataNascimento[0], signupData.dataNascimento[1], parseInt(e.target.value)] })}
                  className="w-12 p-3 border border-[#aaa] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-[#fff]"
                  required
                />
                <label>Mês</label>
                <input
                  type="number"
                  placeholder="Mês"
                  value={signupData.dataNascimento[1]}
                  onChange={(e) => setSignupData({ ...signupData, dataNascimento: [signupData.dataNascimento[0], parseInt(e.target.value), signupData.dataNascimento[2]] })}
                  className="w-12 p-3 border border-[#aaa] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-[#fff]"
                  required
                />
                <label>Ano</label>
                <input
                  type="number"
                  placeholder="Ano"
                  value={signupData.dataNascimento[0]}
                  onChange={(e) => setSignupData({ ...signupData, dataNascimento: [parseInt(e.target.value), signupData.dataNascimento[1], signupData.dataNascimento[2]] })}
                  className="w-16 p-3 border border-[#aaa] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-[#fff]"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Login (CPF ou E-mail)"
                value={loginData.login}
                onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
                className="w-full p-3 border border-[#aaa] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-[#fff]"
                required
              />
              <input
                type="password"
                placeholder="Senha"
                value={loginData.senha}
                onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
                className="w-full p-3 border border-[#aaa] rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-[#fff]"
                required
              />
            </>
          )}

          <div className="text-center">
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full p-3 bg-[#FB902D] text-white rounded-md hover:bg-yellow-700"
            >
              {isSignup ? "Cadastrar" : "Entrar"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={toggleForm}
            className="text-[#FB902D] hover:text-yellow-800 text-md font-extrabold"
          >
            {isSignup ? "Já tem uma conta? Faça login" : "Não tem uma conta? Cadastre-se"}
          </button>
        </div>
      </div>
    </section>
  );
}

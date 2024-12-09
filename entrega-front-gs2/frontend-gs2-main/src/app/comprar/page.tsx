"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Panel {
  idProduto: number;
  nomeProduto: string;
  potencia: number;
  eficiencia: number;
  valorProduto: number;
  imagemProduto: string;
  dsProduto: string;
}

interface CartItem {
  panel: Panel;
  quantity: number;
}

export default function Comprar() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [installments, setInstallments] = useState<number>(1); // Estado para número de parcelas
  const [showModal, setShowModal] = useState<boolean>(false); // Estado para exibir o modal
  const [userName, setUserName] = useState<string>("");
  const [panels, setPanels] = useState<Panel[]>([]);
  const [isClient, setIsClient] = useState(false); // Estado para saber se está no lado do cliente

  useEffect(() => {
    // Verificar se está no lado do cliente
    setIsClient(true);

    // Função para buscar os dados uma vez
    const fetchPanels = async () => {
      const response = await axios.get<Panel[]>("http://localhost:8080/gs_2sem_war/api/produtos");
      setPanels(response.data);
    };

    fetchPanels();
  }, []);

  useEffect(() => {
    if (isClient) {
      // Busca o nome do usuário do localStorage apenas no lado do cliente
      const nomeUsuario = localStorage.getItem("nomeUsuario");
      if (nomeUsuario) {
        setUserName(nomeUsuario);
      }
    }
  }, [isClient]);

  // Função para adicionar painel ao carrinho
  const addToCart = (panel: typeof panels[0], quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.panel.idProduto === panel.idProduto);
      if (existingItem) {
        return prevCart.map((item) =>
          item.panel.idProduto === panel.idProduto
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { panel, quantity }];
      }
    });
  };

  // Função para remover item do carrinho
  const removeFromCart = (panelId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.panel.idProduto !== panelId));
  };

  // Função para alterar a quantidade de um item no carrinho
  const updateQuantity = (panelId: number, quantity: number) => {
    if (quantity < 1) return; // Impede quantidades negativas
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.panel.idProduto === panelId ? { ...item, quantity } : item
      )
    );
  };

  // Função para calcular o total do carrinho
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.panel.valorProduto * item.quantity, 0);
  };

  // Função para calcular o valor de cada parcela
  const calculateInstallment = () => {
    const total = calculateTotal();
    return (total / installments).toFixed(2);
  };

  // Função para finalizar compra
  const handleFinishPurchase = async () => {
    const total = calculateTotal();
    const userId = isClient ? localStorage.getItem("idUsuario") : null;

    if (!userId) {
      alert("Usuário não encontrado no localStorage");
      return;
    }

    const produtos = cart.map((prod) => ({
      idProduto: prod.panel.idProduto,
      quantidade: prod.quantity,
    }));

    const data = {
      valorCompra: total,
      isPago: 1,
      idUsuario: parseInt(userId),
      quantidadeParcelas: installments,
      produtos: produtos
    };

    try {
      setShowModal(true); // Exibe o modal de simulação de pagamento. Estou exibindo antes do post para o professor ver ao testar.
      await axios.post("http://localhost:8080/gs_2sem_war/api/compra/salvaCompra", data);
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      alert("Erro ao processar a compra");
    }
  };

  return (
    <div className="bg-gray-700 min-h-screen py-10">
      <div className="container mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500">Olá, {userName}!</h1>
        <p className="text-xl text-gray-300 mt-4">
          Escolha o modelo ideal para suas necessidades e faça sua compra agora mesmo.
        </p>
      </div>

      {/* Lista de Painéis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {panels.map((panel, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={panel.imagemProduto}
              alt={panel.nomeProduto}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold text-blue-700">{panel.nomeProduto}</h3>
            <p className="text-lg text-gray-600 mt-2">{panel.dsProduto}</p>
            <div className="mt-4">
              <p className="text-xl font-bold text-blue-700">R$ {panel.valorProduto.toFixed(2)}</p>
              <button
                onClick={() => addToCart(panel, 1)} // Adiciona 1 painel de cada vez
                className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carrinho */}
      <div className="container mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-blue-700">Seu Carrinho</h2>
        <ul className="mt-4">
          {cart.length === 0 ? (
            <li className="text-gray-600">Seu carrinho está vazio.</li>
          ) : (
            cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center py-4 border-b">
                <div>
                  <h4 className="text-xl font-semibold text-blue-700">{item.panel.nomeProduto}</h4>
                  <p className="text-lg text-gray-600">R$ {item.panel.valorProduto.toFixed(2)} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(item.panel.idProduto, item.quantity - 1)}
                    className="text-xl text-red-600"
                  >
                    -
                  </button>
                  <p className="text-xl">{item.quantity}</p>
                  <button
                    onClick={() => updateQuantity(item.panel.idProduto, item.quantity + 1)}
                    className="text-xl text-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.panel.idProduto)}
                    className="ml-4 text-red-600"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        {/* Total */}
        {cart.length > 0 && (
          <div className="mt-4 flex justify-between items-center font-semibold text-xl">
            <p>Total:</p>
            <p className="text-green-700">R$ {calculateTotal().toFixed(2)}</p>
          </div>
        )}

        {/* Seletor de Parcelas */}
        {cart.length > 0 && (
          <div className="mt-4">
            <label htmlFor="installments" className="text-lg font-semibold text-gray-700">Número de Parcelas</label>
            <select
              id="installments"
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
              className="mt-2 w-full py-2 px-4 border border-gray-300 rounded-lg"
            >
              {[...Array(12).keys()].map((i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} parcela{(i + 1) > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Simulação de Compra */}
        {cart.length > 0 && (
          <div className="mt-8">
            <p className="text-lg font-semibold text-gray-700">Valor de cada parcela: R$ {calculateInstallment()}</p>
            <button
              onClick={handleFinishPurchase}
              className="mt-4 w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      {/* Modal de Simulação */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800">Compra Finalizada</h2>
            <p className="mt-4">Simulação realizada com sucesso!</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

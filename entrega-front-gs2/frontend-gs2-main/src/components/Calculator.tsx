"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

// Tipos para as placas solares e os resultados
interface Panel {
  idProduto: number;
  nomeProduto: string;
  potencia: number;
  eficiencia: number;
  valorProduto: number;
  imagemProduto: string;
  dsProduto: string;
}

interface PanelResult extends Panel {
  savings?: string;
  generatedEnergy: string;
  quantity: number;
}

export default function Calculator() {
  const [results, setResults] = useState<PanelResult[]>([]);
  const [consumption, setConsumption] = useState<string>("");
  const [panels, setPanels] = useState<Panel[]>([]);
  const [redirectComprar, setRedirectComprar] = useState<string>("/login");

  useEffect(() => {
    // Verifica se o localStorage está disponível (somente no cliente)
    if (typeof window !== "undefined") {
      const nomeUsuario = localStorage.getItem("nomeUsuario");
      setRedirectComprar(nomeUsuario ? "/comprar" : "/login");
    }

    // Função para buscar os dados uma vez
    const fetchPanels = async () => {
      const response = await axios.get<Panel[]>("http://localhost:8080/gs_2sem_war/api/produtos");
      setPanels(response.data);
    };

    fetchPanels();
  }, []);

  // Função para calcular a economia
  const handleCalculate = async () => {
    const consumoMensal = parseFloat(consumption);
    if (!consumoMensal || consumoMensal <= 0) return;

    // Cálculos para as placas solares
    const newResults: PanelResult[] = panels.map((panel: Panel) => {
      const generatedEnergy = ((panel.potencia * panel.eficiencia * 5 * 30) / 1000).toFixed(2); // Energia gerada mensalmente
      const savings = ((parseFloat(generatedEnergy) / consumoMensal) * 100).toFixed(2); // Porcentagem de economia
      return {
        ...panel,
        savings,
        generatedEnergy,
        quantity: 1, // Valor inicial padrão
      };
    });

    setResults(newResults);
  };

  // Função para atualizar a quantidade de placas e recalcular a economia
  const handleQuantityChange = async (idProduto: number, quantity: number) => {
    const consumoMensal = parseFloat(consumption);
    if (!consumoMensal || consumoMensal <= 0) return;

    const updatedResults = results.map((panel) => {
      if (panel.idProduto === idProduto) {
        const totalGeneratedEnergy = ((panel.potencia * panel.eficiencia * 5 * 30 * quantity) / 1000).toFixed(2);
        const savings = ((parseFloat(totalGeneratedEnergy) / consumoMensal) * 100).toFixed(2);
        return {
          ...panel,
          generatedEnergy: totalGeneratedEnergy,
          savings,
          quantity,
        };
      }
      return panel;
    });

    setResults(updatedResults);
  };

  return (
    <section id="calculator" className="py-16 bg-gray-700 text-center">
      <h2 className="text-4xl font-bold mb-8 text-gray-300">Calculadora de Economia</h2>

      {/* Formulário */}
      <form
        className="flex flex-col gap-4 p-4 max-w-sm mx-auto bg-gray-100 rounded-lg shadow-md shadow-blue-900"
        onSubmit={(e) => {
          e.preventDefault();
          handleCalculate();
        }}
      >
        <label htmlFor="energy-consumption" className="text-lg font-medium text-gray-700">
          Digite o seu consumo mensal de energia elétrica (kWh)
        </label>
        <input
          id="energy-consumption"
          type="number"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
          placeholder="Ex: 250"
          className="p-3 border-2 border-gray-400 rounded-md focus:border-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          min="0"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
        >
          Calcular Economia
        </button>
      </form>

      {/* Informações das Placas Solares */}
      {panels.length > 0 ? <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {panels.map((panel) => {
          const panelResult = results.find((res) => res.idProduto === panel.idProduto);
          const quantity = panelResult?.quantity ?? 1;

          return (
            <div key={panel.idProduto} className="flex flex-col items-center bg-gray-400 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{panel.nomeProduto}</h3>
              <img src={panel.imagemProduto} alt={panel.nomeProduto} className="w-32 h-32 object-cover mb-4" />
              <p className="text-sm text-gray-600 mb-2">{panel.dsProduto}</p>
              <p className="text-sm text-gray-500 mb-2">Preço: <span className="font-semibold">R${panel.valorProduto.toFixed(2)}</span></p> {/* Preço exibido aqui */}
              <p className="text-sm text-gray-500">
                Energia Gerada: <span className="font-semibold">{panelResult?.generatedEnergy || ((panel.potencia * panel.eficiencia * 5 * 30) / 1000).toFixed(2)} kWh/mês</span>
              </p>

              {/* Input para selecionar a quantidade de placas */}
              <div className="flex items-center gap-2 mb-2">
                <label htmlFor={`quantity-${panel.idProduto}`} className="text-sm font-medium mt-4 text-gray-700">
                  Quantidade:
                </label>
                <input
                  id={`quantity-${panel.idProduto}`}
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(panel.idProduto, Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-16 p-1 mt-4 border rounded-md text-center"
                />
              </div>

              {/* Mostra a economia apenas após o cálculo */}
              {results.length > 0 && panelResult?.savings && (
                <div>
                  <p className="text-lg font-medium">
                  Economia: <span className="text-blue-600">{Number(panelResult.savings).toFixed(2)}%</span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      : 
      <div>
        <p className="text-red-600 text-4xl mt-10">Erro ao carregar os painéis disponíveis.<br/>Desculpe, o problema logo será resolvido.</p>
      </div>
      }

      <div className="mt-16">
        <Link
          href={redirectComprar}
          className="bg-blue-800 text-white py-6 px-10 rounded-lg font-semibold border-2 border-blue-400 hover:bg-blue-700 transition-colors"
        >
          Quero Comprar
        </Link>
      </div>
    </section>
  );
}

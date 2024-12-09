export default function Benefits() {
    return (
      <section id="benefits" className="py-16 bg-gray-700 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-100">Por que Escolher Energia Solar?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 pb-8 bg-gray-700 border-b-4 text-gray-300 border-blue-600">
            <h3 className="text-2xl font-semibold mb-2">Redução de Custos</h3>
            <p className="text-lg">Economize até 90% na sua conta de luz.</p>
          </div>
          <div className="p-4 pb-8 bg-gray-700 border-b-4 text-gray-300 border-green-600">
            <h3 className="text-2xl font-semibold mb-2">Sustentabilidade</h3>
            <p className="text-lg">Energia limpa e renovável, ajudando o planeta.</p>
          </div>
          <div className="p-4 pb-8 bg-gray-700 border-b-4 text-gray-300 border-cyan-500">
            <h3 className="text-2xl font-semibold mb-2">Retorno do Investimento</h3>
            <p className="text-lg">Recupere seu investimento em até 5 anos.</p>
          </div>
        </div>
      </section>
    );
  }
  
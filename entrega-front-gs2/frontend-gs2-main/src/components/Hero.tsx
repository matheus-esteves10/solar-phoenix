export default function Hero() {
    return (
      <section className="bg-cover bg-center h-screen text-center text-black flex items-center justify-center" style={{ backgroundImage: "url('/assets/img/paineis-solares.jpg')" }}>
        <div className="max-w-xl backdrop-blur-xl p-10 rounded-2xl">
          <h1 className="text-4xl font-bold">Economize com Energia Solar</h1>
          <p className="mt-4 text-lg">Calcule agora mesmo quanto você pode economizar com placas solares.</p>
          <a href="#calculator" className="mt-8 inline-block bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-800">Faça o Cálculo Agora</a>
        </div>
      </section>
    );
  }
  
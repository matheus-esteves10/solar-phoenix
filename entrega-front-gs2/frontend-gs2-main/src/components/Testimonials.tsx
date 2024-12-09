export default function Testimonials() {
    return (
      <section id="testimonials" className="py-16 bg-gray-700 text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-100">O que nossos clientes dizem</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="italic">&quot;Economizei muito na minha conta de luz! O investimento valeu cada centavo.&quot;</p>
            <h3 className="mt-4 font-semibold">João Silva</h3>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="italic">&quot;Além de economizar, sinto que estou ajudando o meio ambiente com energia limpa.&quot;</p>
            <h3 className="mt-4 font-semibold">Maria Oliveira</h3>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="italic">&quot;Serviço de alta qualidade e instalação rápida. Recomendo para todos!&quot;</p>
            <h3 className="mt-4 font-semibold">Carlos Pereira</h3>
          </div>
        </div>
      </section>
    );
  }
  
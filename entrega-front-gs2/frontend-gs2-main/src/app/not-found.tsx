import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-4">Oops! Página não encontrada.</p>
        <p className="text-lg mb-8">
          Parece que você se perdeu no caminho. Não se preocupe, temos outras páginas legais para você explorar!
        </p>
        <Link href="/" className="text-lg font-semibold text-blue-400 hover:text-blue-600 transition-colors">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}

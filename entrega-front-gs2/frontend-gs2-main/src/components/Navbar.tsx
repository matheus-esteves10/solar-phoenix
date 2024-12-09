"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [redirectComprar, setRedirectComprar] = useState<string>("/login");

    // Verifica se o usuário está logado após o componente ser montado no lado do cliente
    useEffect(() => {
        const nomeUsuario = localStorage.getItem("nomeUsuario");
        setRedirectComprar(nomeUsuario ? "/comprar" : "/login");
    }, []);

    return (
        <nav className="flex flex-row bg-gray-600 text-white py-4 h-16 md:h-24 w-full fixed z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Solar Phoenix</h1>
                <ul className="flex gap-6">
                    <li>
                        <a
                            href="#calculator"
                            className="hover:text-blue-300 transition-colors"
                        >
                            Calculadora
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className="hover:text-blue-300 transition-colors"
                        >
                            Contato
                        </a>
                    </li>
                    <li>
                        <Link 
                            href="/login"
                            className="hover:text-blue-300 transition-colors"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={redirectComprar}
                            className="bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                        >
                            Comprar
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

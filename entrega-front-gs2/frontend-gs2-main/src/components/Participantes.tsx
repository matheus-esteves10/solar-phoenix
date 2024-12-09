export default function Participantes() {
    const integrantes = [
        {
            nome: "Gabriel Falanga",
            rm: "555061",
            turma: "1TDSPZ",
            github: "https://github.com/gabrielfalanga",
            linkedin: "https://www.linkedin.com/in/gabrielfalanga/",
            foto: "https://github.com/gabrielfalanga.png",
        },
        {
            nome: "Matheus Esteves",
            rm: "554769",
            turma: "1TDSPZ",
            github: "https://github.com/matheus-esteves10",
            linkedin: "https://www.linkedin.com/in/matheus-esteves-410772292/",
            foto: "https://github.com/matheus-esteves10.png",
        },
        {
            nome: "Caio Henrique",
            rm: "554600",
            turma: "1TDSPJ",
            github: "https://github.com/caiohc28",
            linkedin: "https://www.linkedin.com/in/caio-carnetti/",
            foto: "https://github.com/caiohc28.png",
        }
    ];

    return (
        <>
            <main className="flex flex-col items-center gap-6 px-4 bg-gray-700">
                <h1 className="text-center mt-14 mb-8 text-gray-100 text-4xl font-bold">Os Integrantes</h1>
                {integrantes.map((integrante, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border-4 border-white text-xl md:text-2xl lg:text-3xl w-full max-w-xl p-4 flex flex-col md:flex-row items-center justify-center text-center gap-4 bg-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-600"
                    >
                        <img
                            className="rounded-full w-24 h-24 md:w-32 md:h-32"
                            src={integrante.foto}
                            alt={`Foto do ${integrante.nome}`}
                        />
                        <div className="flex flex-col items-center">
                            <p>{integrante.nome}</p>
                            <p>RM: {integrante.rm}</p>
                            <p>Turma: {integrante.turma}</p>
                            <div className="flex gap-10">
                                <a href={integrante.github} target="_blank" rel="noopener noreferrer">
                                    <img
                                        className="w-8 h-8 md:w-10 md:h-10 mt-4"
                                        src="/assets/img/github.png"
                                        alt="Logo do GitHub"
                                    />
                                </a>
                                <a href={integrante.linkedin} target="_blank" rel="noopener noreferrer">
                                    <img 
                                        className="w-8 h-8 md:w-10 md:h-10 mt-4"
                                        src="/assets/img/linkedin.png" 
                                        alt="Logo do LinkedIn" 
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
                <a
                    href="https://github.com/gabrielfalanga/frontend-gs2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full max-w-xl"
                >
                    <div className="rounded-2xl border-4 border-white text-xl md:text-2xl lg:text-3xl p-4 flex items-center justify-center bg-blue-700 transition-all duration-300 ease-in-out hover:bg-blue-600 text-white">
                        <p>Repositório no GitHub</p>
                    </div>
                </a>
            </main>
        </>
    );
}

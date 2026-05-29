"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const BANDEIRAS = ["BR", "AR", "FR", "DE", "ES"];

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center min-h-[100dvh] bg-copa-yellow overflow-x-hidden">
      <section className="flex flex-col items-center w-full px-5 py-6 sm:py-8 text-center max-w-lg mx-auto">
        
        {/* Título */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl uppercase leading-[0.95] mb-4 tracking-wide text-copa-blue"
          style={{ fontFamily: "var(--font-titulo)", textShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
        >
          Transforme seu filho em uma <br/>
          figurinha personalizada da <br/>
          Copa do Mundo
        </h1>

        {/* Figurinhas animadas (Sobrepostas) */}
        <div className="relative w-full max-w-[320px] aspect-[4/3] mb-6 mt-2 flex justify-center">

          {/* Figurinha esquerda (Arthur) */}
          <div
            className="absolute left-4 top-8 w-32 sm:w-40 aspect-[2.5/3.5] rounded-xl overflow-hidden shadow-xl z-10"
            style={{ transform: "rotate(-5deg)", animation: "wiggle 4s ease-in-out infinite" }}
          >
            <div className="relative w-full h-full">
              <Image src="/figurinha-arthur.webp" alt="Arthur" fill className="object-cover" sizes="(max-width: 640px) 128px, 160px" priority />
              <div className="absolute inset-0 shine-effect" />
            </div>
          </div>

          {/* Figurinha direita (Helena) */}
          <div
            className="absolute right-4 top-8 w-32 sm:w-40 aspect-[2.5/3.5] rounded-xl overflow-hidden shadow-xl z-10"
            style={{ transform: "rotate(5deg)", animation: "wiggleRight 4s ease-in-out infinite 1s" }}
          >
            <div className="relative w-full h-full">
              <Image src="/figurinha-helena.webp" alt="Helena" fill className="object-cover" sizes="(max-width: 640px) 128px, 160px" priority />
              <div className="absolute inset-0 shine-effect" style={{ animationDelay: "2s" }} />
            </div>
          </div>

          {/* Figurinha central (Miguel) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-40 sm:w-48 aspect-[2.5/3.5] rounded-xl overflow-hidden shadow-2xl z-30"
            style={{ animation: "wiggleCenter 4s ease-in-out infinite 0.5s" }}
          >
            <div className="relative w-full h-full">
              <Image src="/figurinha-miguel.webp" alt="Miguel" fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" priority />
              <div className="absolute inset-0 shine-effect" style={{ animationDelay: "1s" }} />
            </div>
          </div>

        </div>

        {/* Subtítulo */}
        <p
          className="text-lg md:text-xl text-copa-blue mb-6 leading-relaxed px-2 font-bold"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Responda algumas perguntas rápidas e veja como criar uma figurinha exclusiva, com o nome, foto e estilo do seu pequeno craque.
        </p>

        {/* Botão CTA */}
        <button
          id="btn-iniciar"
          className="w-full text-white text-3xl py-4 rounded-2xl shadow-lg transition-transform duration-200 cursor-pointer tracking-wider hover:scale-[1.02] active:scale-95"
          style={{
            fontFamily: "var(--font-titulo)",
            background: "var(--copa-blue)",
          }}
          onClick={() => router.push("/quiz")}
        >
          INICIAR
        </button>

        {/* Prova social */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex -space-x-1">
            {BANDEIRAS.map((flag, i) => (
              <span
                key={i}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-xs font-bold text-copa-blue border border-gray-200"
                style={{ fontFamily: "var(--font-titulo)", zIndex: 5 - i }}
              >
                {flag}
              </span>
            ))}
          </div>
          <p
            className="text-sm font-bold text-copa-blue"
            style={{ fontFamily: "var(--font-titulo)", letterSpacing: "0.05em" }}
          >
            +2.500 figurinhas já criadas!
          </p>
        </div>

      </section>
    </main>
  );
}

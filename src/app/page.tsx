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
          className="text-[44px] leading-[0.95] mb-2 tracking-wide text-copa-blue uppercase"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          Transforme seu filho em uma <br/>
          <span className="text-copa-blue">figurinha personalizada</span> da <br/>
          Copa do Mundo
        </h1>

        {/* Figurinhas animadas (Sobrepostas) */}
        <div className="relative w-full max-w-[320px] aspect-[4/3] mb-6 mt-4 flex justify-center">

          {/* Figurinha esquerda (Arthur) */}
          <div
            className="absolute left-2 top-8 w-[130px] aspect-[2.5/3.5] rounded-xl overflow-hidden shadow-xl z-10"
            style={{ transform: "rotate(-8deg)", animation: "wiggle 4s ease-in-out infinite" }}
          >
            <div className="relative w-full h-full">
              <Image src="/figurinha-arthur.webp" alt="Arthur" fill className="object-cover" sizes="130px" priority />
              <div className="absolute inset-0 shine-effect" />
            </div>
          </div>

          {/* Figurinha direita (Helena) */}
          <div
            className="absolute right-2 top-8 w-[130px] aspect-[2.5/3.5] rounded-xl overflow-hidden shadow-xl z-10"
            style={{ transform: "rotate(8deg)", animation: "wiggleRight 4s ease-in-out infinite 1s" }}
          >
            <div className="relative w-full h-full">
              <Image src="/figurinha-helena.webp" alt="Helena" fill className="object-cover" sizes="130px" priority />
              <div className="absolute inset-0 shine-effect" style={{ animationDelay: "2s" }} />
            </div>
          </div>

          {/* Figurinha central (Miguel) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[150px] aspect-[2.5/3.5] rounded-xl overflow-hidden shadow-2xl z-30"
            style={{ animation: "wiggleCenter 4s ease-in-out infinite 0.5s" }}
          >
            <div className="relative w-full h-full">
              <Image src="/figurinha-miguel.webp" alt="Miguel" fill className="object-cover" sizes="150px" priority />
              <div className="absolute inset-0 shine-effect" style={{ animationDelay: "1s" }} />
            </div>
          </div>

        </div>

        {/* Subtítulo */}
        <p
          className="text-[17px] text-gray-800 mb-6 leading-snug px-2"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Responda algumas perguntas rápidas e veja como criar uma figurinha exclusiva, com o nome, foto e estilo do seu pequeno craque.
        </p>

        {/* Botão CTA */}
        <button
          id="btn-iniciar"
          className="w-full text-white text-[28px] py-[18px] rounded-[14px] shadow-lg transition-transform duration-200 cursor-pointer hover:scale-[1.02] active:scale-95"
          style={{
            fontFamily: "var(--font-titulo)",
            background: "var(--copa-blue)",
            letterSpacing: "0.05em"
          }}
          onClick={() => router.push("/quiz")}
        >
          INICIAR
        </button>

        {/* Prova social */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex -space-x-1.5">
            {BANDEIRAS.map((flag, i) => (
              <span
                key={i}
                className="w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center text-[10px] text-copa-blue border border-gray-200 shadow-sm"
                style={{ fontFamily: "var(--font-titulo)", zIndex: 5 - i }}
              >
                {flag}
              </span>
            ))}
          </div>
          <p
            className="text-[13px] text-gray-800"
            style={{ fontFamily: "var(--font-body)" }}
          >
            +2.500 figurinhas já criadas!
          </p>
        </div>

      </section>
    </main>
  );
}

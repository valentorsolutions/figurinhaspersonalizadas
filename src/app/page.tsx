"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const FIGURINHAS = [
  {
    id: "helena",
    alt: "Figurinha Helena",
    src: "/figurinha-helena.webp",
    rotate: "-8deg",
    animDelay: "0s",
    zIndex: 10,
    size: "sm",
  },
  {
    id: "miguel",
    alt: "Figurinha Miguel",
    src: "/figurinha-miguel.webp",
    rotate: "0deg",
    animDelay: "0.5s",
    zIndex: 30,
    size: "lg",
  },
  {
    id: "arthur",
    alt: "Figurinha Arthur",
    src: "/figurinha-arthur.webp",
    rotate: "8deg",
    animDelay: "1s",
    zIndex: 10,
    size: "sm",
  },
];

const BANDEIRAS = ["🇧🇷", "🇦🇷", "🇫🇷", "🇩🇪", "🇪🇸"];

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center min-h-screen bg-copa-yellow">
      <section className="flex flex-col items-center min-h-[100dvh] w-full px-5 py-8 text-center overflow-hidden justify-between">

        {/* Título */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-4 max-w-2xl"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          Transforme seu filho em uma{" "}
          <span style={{ color: "var(--copa-blue)" }}>figurinha personalizada</span>{" "}
          da Copa do Mundo
        </h1>

        {/* Figurinhas animadas */}
        <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-[400px] mb-2">

          {/* Figurinha esquerda */}
          <div
            className="absolute left-0 top-6 md:top-8 w-36 h-52 md:w-48 md:h-72 rounded-xl overflow-hidden shadow-xl z-10"
            style={{
              transform: "rotate(-8deg)",
              animation: "wiggle 4s ease-in-out infinite",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/figurinha-helena.webp"
                alt="Figurinha Helena"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 144px, 192px"
                priority
              />
              <div className="absolute inset-0 shine-effect" />
            </div>
          </div>

          {/* Figurinha central (maior) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-44 h-64 md:w-60 md:h-[340px] rounded-xl overflow-hidden shadow-2xl z-30"
            style={{
              animation: "wiggleCenter 4s ease-in-out infinite 0.5s",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/figurinha-miguel.webp"
                alt="Figurinha Miguel"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 176px, 240px"
                priority
              />
              <div className="absolute inset-0 shine-effect" style={{ animationDelay: "1s" }} />
            </div>
          </div>

          {/* Figurinha direita */}
          <div
            className="absolute right-0 top-6 md:top-8 w-36 h-52 md:w-48 md:h-72 rounded-xl overflow-hidden shadow-xl z-10"
            style={{
              transform: "rotate(8deg)",
              animation: "wiggleRight 4s ease-in-out infinite 1s",
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src="/figurinha-arthur.webp"
                alt="Figurinha Arthur"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 144px, 192px"
                priority
              />
              <div className="absolute inset-0 shine-effect" style={{ animationDelay: "2s" }} />
            </div>
          </div>
        </div>

        {/* Subtítulo */}
        <p
          className="text-lg md:text-xl max-w-md mb-4 leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Responda algumas perguntas rápidas e veja como criar uma figurinha exclusiva,
          com o nome, foto e estilo do seu pequeno craque.
        </p>

        {/* Botão CTA */}
        <button
          id="btn-iniciar"
          className="w-full max-w-md text-white font-black text-2xl md:text-3xl py-5 rounded-2xl shadow-lg transition-all duration-200 cursor-pointer tracking-[0.15em]"
          style={{
            fontFamily: "var(--font-titulo)",
            background: "var(--copa-blue)",
            animation: "pulseGlow 2.5s ease-in-out infinite",
          }}
          onClick={() => router.push("/quiz")}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--copa-blue-light)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--copa-blue)")}
        >
          INICIAR
        </button>

        {/* Prova social */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex -space-x-2">
            {BANDEIRAS.map((flag, i) => (
              <span
                key={i}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl border-2"
                style={{ borderColor: "var(--copa-yellow)", zIndex: 5 - i }}
              >
                {flag}
              </span>
            ))}
          </div>
          <p
            className="text-sm font-bold"
            style={{ fontFamily: "var(--font-body)" }}
          >
            +2.500 figurinhas já criadas!
          </p>
        </div>

      </section>
    </main>
  );
}

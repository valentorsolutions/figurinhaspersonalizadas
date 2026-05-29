"use client";

import { useRouter } from "next/navigation";
import { QuizProvider } from "./context/QuizContext";

const FIGURINHAS_DEMO = [
  {
    id: "helena",
    nome: "HELENA",
    numero: "10",
    time: "Brasil",
    posicao: "Atacante",
    gradient: "from-[#003087] to-[#0046C8]",
    bgColor: "#003087",
  },
  {
    id: "miguel",
    nome: "MIGUEL",
    numero: "9",
    time: "Argentina",
    posicao: "Artilheiro",
    gradient: "from-[#74ACDF] to-[#4B8FD4]",
    bgColor: "#74ACDF",
  },
  {
    id: "arthur",
    nome: "ARTHUR",
    numero: "7",
    time: "Brasil",
    posicao: "Meia",
    gradient: "from-[#009c3b] to-[#007A2F]",
    bgColor: "#009c3b",
  },
];

function FigurinhaCard({
  card,
  size,
  rotate,
  animDelay,
  zIndex,
}: {
  card: (typeof FIGURINHAS_DEMO)[0];
  size: "sm" | "lg";
  rotate: string;
  animDelay: string;
  zIndex: number;
}) {
  const isLg = size === "lg";
  return (
    <div
      className="figurinha-card absolute"
      style={{
        width: isLg ? "clamp(140px, 22vw, 195px)" : "clamp(110px, 18vw, 155px)",
        height: isLg ? "clamp(200px, 32vw, 280px)" : "clamp(160px, 25vw, 220px)",
        transform: rotate,
        animation: `${isLg ? "wiggleCenter" : rotate.includes("-") ? "wiggle" : "wiggleRight"} 4s ease-in-out infinite ${animDelay}`,
        zIndex,
        left: isLg ? "50%" : undefined,
      }}
    >
      {/* Fundo degradê */}
      <div
        className="w-full h-full flex flex-col"
        style={{ background: `linear-gradient(160deg, ${card.bgColor}ee, ${card.bgColor}99)` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-2 pt-2 pb-1">
          <span style={{ fontSize: "clamp(6px, 1.2vw, 9px)", color: "#FFD700", fontFamily: "var(--font-titulo)", fontWeight: 900, letterSpacing: "0.05em" }}>
            COPA 2026
          </span>
          <span style={{ fontSize: "clamp(6px, 1.2vw, 9px)", color: "#FFD700", fontFamily: "var(--font-titulo)", fontWeight: 900 }}>
            🏆
          </span>
        </div>

        {/* Foto placeholder */}
        <div className="flex-1 flex items-end justify-center px-2 pb-1">
          <div
            className="w-full rounded-lg flex items-center justify-center overflow-hidden"
            style={{
              height: "65%",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,215,0,0.3)",
            }}
          >
            <span style={{ fontSize: isLg ? "3.5rem" : "2.8rem" }}>
              {card.posicao === "Atacante" || card.posicao === "Artilheiro" ? "⚽" : card.posicao === "Meia" ? "🎯" : "🧤"}
            </span>
          </div>
        </div>

        {/* Info footer */}
        <div
          className="mx-2 mb-2 rounded-lg px-2 py-1 flex flex-col items-center"
          style={{ background: "rgba(255,215,0,0.9)" }}
        >
          <span style={{ fontSize: "clamp(8px, 1.5vw, 11px)", fontFamily: "var(--font-titulo)", fontWeight: 900, color: "#003087", letterSpacing: "0.05em" }}>
            {card.nome}
          </span>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "clamp(7px, 1.2vw, 10px)", color: "#003087", fontWeight: 700 }}>{card.posicao}</span>
            <span style={{ fontSize: "clamp(7px, 1.2vw, 10px)", color: "#003087" }}>•</span>
            <span style={{ fontSize: "clamp(8px, 1.4vw, 12px)", fontFamily: "var(--font-titulo)", fontWeight: 900, color: "#003087" }}>#{card.numero}</span>
          </div>
        </div>
      </div>

      {/* Shine overlay */}
      <div className="absolute inset-0 shine-effect rounded-xl" />
    </div>
  );
}

function HeroSection() {
  const router = useRouter();

  return (
    <section
      className="flex flex-col items-center min-h-[100dvh] w-full text-center overflow-hidden justify-between"
      style={{ background: "linear-gradient(180deg, #FFD700 0%, #FFE44D 60%, #FFD700 100%)", padding: "clamp(24px, 5vw, 48px) 20px" }}
    >
      {/* Badge topo */}
      <div
        className="animate-fadeInUp"
        style={{
          background: "rgba(0,48,135,0.1)",
          border: "1px solid rgba(0,48,135,0.2)",
          borderRadius: "99px",
          padding: "6px 18px",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontFamily: "var(--font-titulo)", fontWeight: 700, fontSize: "clamp(10px, 2.5vw, 13px)", color: "#003087", letterSpacing: "0.08em" }}>
          🏆 COPA DO MUNDO 2026 🏆
        </span>
      </div>

      {/* Título */}
      <h1
        className="animate-fadeInUp"
        style={{
          fontFamily: "var(--font-titulo)",
          fontWeight: 900,
          fontSize: "clamp(28px, 7vw, 64px)",
          lineHeight: "1.1",
          color: "#1a1a1a",
          maxWidth: "620px",
          animationDelay: "0.1s",
          opacity: 0,
        }}
      >
        Transforme seu filho em uma{" "}
        <span style={{ color: "#003087" }}>figurinha personalizada</span> da Copa do Mundo
      </h1>

      {/* Figurinhas animadas */}
      <div
        className="relative"
        style={{
          width: "clamp(280px, 60vw, 420px)",
          height: "clamp(220px, 40vw, 320px)",
          margin: "8px 0",
        }}
      >
        {/* Figurinha esquerda */}
        <FigurinhaCard
          card={FIGURINHAS_DEMO[0]}
          size="sm"
          rotate="rotate(-8deg)"
          animDelay="0s"
          zIndex={10}
        />

        {/* Figurinha central (maior) */}
        <FigurinhaCard
          card={FIGURINHAS_DEMO[1]}
          size="lg"
          rotate="translateX(-50%)"
          animDelay="0.5s"
          zIndex={30}
        />

        {/* Figurinha direita */}
        <div
          className="figurinha-card absolute right-0 top-4"
          style={{
            width: "clamp(110px, 18vw, 155px)",
            height: "clamp(160px, 25vw, 220px)",
            animation: "wiggleRight 4s ease-in-out infinite 1s",
            zIndex: 10,
          }}
        >
          <div
            className="w-full h-full flex flex-col"
            style={{ background: `linear-gradient(160deg, #009c3bee, #007A2F99)` }}
          >
            <div className="flex items-center justify-between px-2 pt-2 pb-1">
              <span style={{ fontSize: "clamp(6px, 1.2vw, 9px)", color: "#FFD700", fontFamily: "var(--font-titulo)", fontWeight: 900 }}>COPA 2026</span>
              <span style={{ fontSize: "clamp(6px, 1.2vw, 9px)", color: "#FFD700", fontFamily: "var(--font-titulo)", fontWeight: 900 }}>🏆</span>
            </div>
            <div className="flex-1 flex items-end justify-center px-2 pb-1">
              <div className="w-full rounded-lg flex items-center justify-center" style={{ height: "65%", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,215,0,0.3)" }}>
                <span style={{ fontSize: "2.8rem" }}>🎯</span>
              </div>
            </div>
            <div className="mx-2 mb-2 rounded-lg px-2 py-1 flex flex-col items-center" style={{ background: "rgba(255,215,0,0.9)" }}>
              <span style={{ fontSize: "clamp(8px, 1.5vw, 11px)", fontFamily: "var(--font-titulo)", fontWeight: 900, color: "#003087" }}>ARTHUR</span>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: "clamp(7px, 1.2vw, 10px)", color: "#003087", fontWeight: 700 }}>Meia</span>
                <span style={{ fontSize: "clamp(7px, 1.2vw, 10px)", color: "#003087" }}>•</span>
                <span style={{ fontSize: "clamp(8px, 1.4vw, 12px)", fontFamily: "var(--font-titulo)", fontWeight: 900, color: "#003087" }}>#7</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 shine-effect rounded-xl" style={{ animationDelay: "2s" }} />
        </div>
      </div>

      {/* Subtítulo */}
      <p
        className="animate-fadeInUp"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(15px, 3.5vw, 19px)",
          color: "#1a1a1a",
          maxWidth: "480px",
          lineHeight: "1.5",
          marginBottom: "8px",
          animationDelay: "0.3s",
          opacity: 0,
        }}
      >
        Responda algumas perguntas rápidas e veja como criar uma figurinha exclusiva,
        com o nome, foto e estilo do seu pequeno craque.
      </p>

      {/* Botão CTA */}
      <button
        id="btn-iniciar"
        className="btn-primary animate-fadeInUp"
        style={{
          width: "100%",
          maxWidth: "420px",
          fontSize: "clamp(20px, 5vw, 28px)",
          padding: "clamp(16px, 4vw, 22px) 24px",
          animationDelay: "0.4s",
          opacity: 0,
        }}
        onClick={() => router.push("/quiz")}
      >
        🚀 INICIAR AGORA
      </button>

      {/* Prova social */}
      <div className="flex flex-col items-center gap-2 mt-2 animate-fadeInUp" style={{ animationDelay: "0.5s", opacity: 0 }}>
        <div className="flex" style={{ gap: "-8px" }}>
          {["🇧🇷", "🇦🇷", "🇫🇷", "🇩🇪", "🇪🇸"].map((flag, i) => (
            <div
              key={i}
              className="social-avatar"
              style={{ marginLeft: i === 0 ? 0 : "-8px", fontSize: "1.1rem", zIndex: 5 - i }}
            >
              {flag}
            </div>
          ))}
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "clamp(12px, 3vw, 14px)", color: "#1a1a1a" }}>
          +2.500 figurinhas já criadas! 🎉
        </p>
      </div>

      {/* Preço */}
      <div
        className="animate-fadeInUp"
        style={{
          marginTop: "4px",
          padding: "10px 24px",
          background: "rgba(0,48,135,0.12)",
          borderRadius: "12px",
          border: "1px solid rgba(0,48,135,0.15)",
          animationDelay: "0.6s",
          opacity: 0,
        }}
      >
        <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(12px, 2.5vw, 14px)", color: "#003087", fontWeight: 700 }}>
          ✅ Impressão profissional por apenas{" "}
          <strong style={{ fontSize: "clamp(15px, 3.5vw, 18px)" }}>R$12,90</strong>
        </span>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <QuizProvider>
      <main className="flex flex-col items-center min-h-screen">
        <HeroSection />
      </main>
    </QuizProvider>
  );
}

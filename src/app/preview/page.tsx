"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizProvider, useQuiz } from "../context/QuizContext";

const TIME_CORES: Record<string, { bg: string; text: string; border: string }> = {
  Brasil: { bg: "#009c3b", text: "#FFD700", border: "#009c3b" },
  Argentina: { bg: "#74ACDF", text: "#FFFFFF", border: "#74ACDF" },
  Portugal: { bg: "#006600", text: "#FFD700", border: "#006600" },
  França: { bg: "#002395", text: "#FFFFFF", border: "#002395" },
  Espanha: { bg: "#AA151B", text: "#FFD700", border: "#AA151B" },
  Alemanha: { bg: "#1a1a1a", text: "#FFFFFF", border: "#1a1a1a" },
  Inglaterra: { bg: "#CF0000", text: "#FFFFFF", border: "#CF0000" },
  Itália: { bg: "#009246", text: "#FFFFFF", border: "#009246" },
};

const POSICAO_EMOJI: Record<string, string> = {
  Goleiro: "🧤",
  Defensor: "🛡️",
  Meia: "🎯",
  Atacante: "⚽",
};

function FigurinhaPreview({ nome, time, posicao, numero, foto }: {
  nome: string; time: string; posicao: string; numero: string; foto?: string;
}) {
  const cores = TIME_CORES[time] || { bg: "#003087", text: "#FFD700", border: "#003087" };

  return (
    <div
      id="figurinha-preview-card"
      className="relative animate-bounceIn"
      style={{
        width: "clamp(200px, 55vw, 280px)",
        height: "clamp(280px, 77vw, 390px)",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2)",
        border: `3px solid ${cores.border}`,
        background: `linear-gradient(160deg, ${cores.bg}ff, ${cores.bg}cc)`,
        flexShrink: 0,
      }}
    >
      {/* Header da figurinha */}
      <div
        style={{
          background: "rgba(0,0,0,0.25)",
          padding: "10px 12px 8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ color: cores.text, fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "clamp(7px, 2.2vw, 11px)", letterSpacing: "0.1em" }}>
            COPA DO MUNDO
          </div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(6px, 1.8vw, 9px)", fontFamily: "var(--font-body)", fontWeight: 600 }}>
            2026 • USA • CAN • MEX
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: cores.text, fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "clamp(18px, 6vw, 30px)", lineHeight: 1 }}>
            {numero || "10"}
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(6px, 1.5vw, 8px)", fontFamily: "var(--font-body)" }}>
            {posicao?.toUpperCase() || "ATACANTE"}
          </div>
        </div>
      </div>

      {/* Foto area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "clamp(130px, 40vw, 200px)",
          background: "rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={foto}
            alt="Foto do craque"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              opacity: 0.7,
            }}
          >
            <span style={{ fontSize: "clamp(3rem, 12vw, 5rem)" }}>
              {POSICAO_EMOJI[posicao] || "⚽"}
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(10px, 2.5vw, 12px)", fontFamily: "var(--font-body)" }}>
              Sua foto aqui
            </span>
          </div>
        )}

        {/* Holographic overlay */}
        <div className="holo-effect absolute inset-0" style={{ opacity: 0.3 }} />
      </div>

      {/* Faixa do nome */}
      <div
        style={{
          background: cores.text === "#FFD700" ? "rgba(255, 215, 0, 0.95)" : "rgba(255,255,255,0.95)",
          padding: "clamp(6px, 2vw, 10px) 12px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-titulo)",
            fontWeight: 900,
            fontSize: "clamp(14px, 4vw, 20px)",
            color: "#003087",
            letterSpacing: "0.08em",
          }}
        >
          {nome?.toUpperCase() || "SEU NOME"}
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "clamp(9px, 2.5vw, 11px)",
            color: "#444",
            letterSpacing: "0.05em",
          }}
        >
          {time?.toUpperCase() || "BRASIL"}
        </div>
      </div>

      {/* Shine effect */}
      <div className="shine-effect absolute inset-0 pointer-events-none" />
    </div>
  );
}

function PreviewContent() {
  const { data } = useQuiz();
  const router = useRouter();
  const [revealed, setRevealed] = useState(false);
  const [showBlur, setShowBlur] = useState(true);

  useEffect(() => {
    // Simular "revelação" da figurinha
    const t1 = setTimeout(() => setRevealed(true), 800);
    const t2 = setTimeout(() => setShowBlur(false), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const nome = data.nome || "CRAQUE";

  return (
    <main
      className="flex flex-col min-h-[100dvh] w-full items-center"
      style={{ background: "linear-gradient(160deg, #001a6b 0%, #003087 50%, #001a6b 100%)" }}
    >
      <div className="flex flex-col items-center w-full max-w-lg mx-auto px-5 py-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4 self-start">
          <span style={{ fontSize: "1.4rem" }}>🏆</span>
          <span style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "15px", color: "#FFD700", letterSpacing: "0.05em" }}>
            FIGURINHA COPA 2026
          </span>
        </div>

        {/* Título */}
        <div className="text-center mb-6 animate-fadeInUp">
          <h1
            style={{
              fontFamily: "var(--font-titulo)",
              fontWeight: 900,
              fontSize: "clamp(22px, 5vw, 30px)",
              color: "#FFD700",
              marginBottom: "8px",
            }}
          >
            🎉 Sua figurinha está pronta!
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.8)", fontSize: "15px" }}>
            Veja como ficou incrível, {nome.split(" ")[0]}!
          </p>
        </div>

        {/* Preview da figurinha */}
        <div className="relative mb-6" style={{ filter: showBlur ? "blur(12px)" : "none", transition: "filter 0.8s ease" }}>
          <FigurinhaPreview
            nome={data.nome}
            time={data.time}
            posicao={data.posicao}
            numero={data.numero}
            foto={data.fotoPreview}
          />

          {/* Glow atrás */}
          <div
            style={{
              position: "absolute",
              inset: "-20px",
              background: "radial-gradient(ellipse, rgba(255,215,0,0.4) 0%, transparent 70%)",
              zIndex: -1,
              borderRadius: "50%",
              animation: "pulseGlow 2.5s ease-in-out infinite",
            }}
          />
        </div>

        {showBlur && (
          <div className="text-center mb-4 animate-fadeInUp">
            <div style={{ width: "40px", height: "40px", border: "4px solid #FFD700", borderTopColor: "transparent", borderRadius: "50%", animation: "starSpin 0.8s linear infinite", margin: "0 auto 8px" }} />
            <p style={{ color: "#FFD700", fontFamily: "var(--font-body)", fontWeight: 700 }}>
              Gerando sua figurinha...
            </p>
          </div>
        )}

        {!showBlur && (
          <>
            {/* Aviso preview */}
            <div
              className="animate-fadeInUp"
              style={{
                background: "rgba(255,215,0,0.15)",
                border: "1px solid rgba(255,215,0,0.4)",
                borderRadius: "12px",
                padding: "12px 16px",
                marginBottom: "16px",
                width: "100%",
              }}
            >
              <p style={{ color: "#FFD700", fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, textAlign: "center" }}>
                🔒 Esta é apenas uma pré-visualização. <br />
                A versão final será feita com a sua foto real e impressa profissionalmente!
              </p>
            </div>

            {/* Info do craque */}
            <div
              className="animate-fadeInUp w-full"
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "16px",
                marginBottom: "20px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              {[
                { label: "Nome", value: data.nome || "—", emoji: "👤" },
                { label: "Time", value: data.time || "—", emoji: "🏆" },
                { label: "Posição", value: data.posicao || "—", emoji: "🎽" },
                { label: "Número", value: `#${data.numero || "—"}`, emoji: "🔢" },
              ].map((item) => (
                <div key={item.label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "10px", padding: "10px 12px" }}>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontFamily: "var(--font-body)", marginBottom: "2px" }}>
                    {item.emoji} {item.label}
                  </div>
                  <div style={{ color: "#FFD700", fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "15px" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <button
              id="btn-quero-figurinha"
              className="btn-primary w-full animate-fadeInUp"
              style={{ fontSize: "clamp(18px, 4vw, 22px)", padding: "18px", marginBottom: "12px" }}
              onClick={() => router.push("/checkout")}
            >
              🛒 QUERO MINHA FIGURINHA!
            </button>

            <button
              id="btn-refazer-quiz"
              onClick={() => router.push("/quiz")}
              style={{
                width: "100%",
                padding: "14px",
                border: "2px solid rgba(255,255,255,0.3)",
                borderRadius: "12px",
                background: "transparent",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              ← Refazer quiz
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default function PreviewPage() {
  return (
    <QuizProvider>
      <PreviewContent />
    </QuizProvider>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const CONFETTI_COLORS = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"];

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  shape: "rect" | "circle";
}

function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: Math.random() * 10 + 6,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));
    setPieces(newPieces);
    const t = setTimeout(() => setPieces([]), 8000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            width: p.shape === "rect" ? `${p.size}px` : `${p.size}px`,
            height: p.shape === "rect" ? `${p.size * 0.4}px` : `${p.size}px`,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

const STEPS = [
  { emoji: "✅", titulo: "Pedido confirmado", desc: "Seu pedido foi recebido com sucesso!" },
  { emoji: "🎨", titulo: "Criando sua figurinha", desc: "Nossa equipe vai criar a arte personalizada" },
  { emoji: "🖨️", titulo: "Impressão profissional", desc: "Impressão em alta qualidade" },
  { emoji: "📦", titulo: "Enviando para você", desc: "Entrega em 7-10 dias úteis" },
];

export default function ObrigadoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= STEPS.length - 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return s;
        }
        return s + 1;
      });
    }, 1500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <main
      className="flex flex-col items-center min-h-[100dvh] w-full"
      style={{ background: "linear-gradient(160deg, #001a6b 0%, #003087 100%)" }}
    >
      <Confetti />

      <div className="flex flex-col items-center w-full max-w-lg mx-auto px-5 py-12 text-center">
        {/* Ícone de sucesso */}
        <div
          className="animate-bounceIn"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FFD700, #FFA500)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3.5rem",
            marginBottom: "24px",
            boxShadow: "0 0 40px rgba(255,215,0,0.5)",
          }}
        >
          🏆
        </div>

        <h1
          className="animate-fadeInUp"
          style={{
            fontFamily: "var(--font-titulo)",
            fontWeight: 900,
            fontSize: "clamp(26px, 6vw, 36px)",
            color: "#FFD700",
            marginBottom: "12px",
            lineHeight: "1.2",
          }}
        >
          Pedido Confirmado!
        </h1>

        <p
          className="animate-fadeInUp"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.85)",
            fontSize: "clamp(15px, 3.5vw, 18px)",
            marginBottom: "32px",
            lineHeight: "1.5",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          Sua figurinha personalizada da Copa 2026 está sendo produzida! 🎉
          Você receberá atualizações por e-mail e WhatsApp.
        </p>

        {/* Steps de progresso */}
        <div
          className="w-full mb-8 animate-fadeInUp"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          <h2 style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, color: "white", fontSize: "16px", marginBottom: "16px", letterSpacing: "0.05em" }}>
            ACOMPANHE SEU PEDIDO
          </h2>
          <div className="flex flex-col gap-3">
            {STEPS.map((step, i) => {
              const isDone = i <= currentStep;
              const isActive = i === currentStep;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 16px",
                    borderRadius: "14px",
                    background: isDone
                      ? "rgba(255,215,0,0.15)"
                      : "rgba(255,255,255,0.05)",
                    border: isActive
                      ? "2px solid #FFD700"
                      : isDone
                      ? "2px solid rgba(255,215,0,0.4)"
                      : "2px solid rgba(255,255,255,0.1)",
                    transition: "all 0.5s ease",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <span style={{ fontSize: "1.8rem", opacity: isDone ? 1 : 0.4, transition: "opacity 0.5s" }}>
                    {step.emoji}
                  </span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, color: isDone ? "#FFD700" : "rgba(255,255,255,0.4)", fontSize: "15px", transition: "color 0.5s" }}>
                      {step.titulo}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", color: isDone ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)", fontSize: "13px", transition: "color 0.5s" }}>
                      {step.desc}
                    </div>
                  </div>
                  {isDone && i < currentStep && (
                    <div style={{ marginLeft: "auto", width: "24px", height: "24px", borderRadius: "50%", background: "#FFD700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#003087", fontWeight: 900, fontSize: "14px" }}>
                      ✓
                    </div>
                  )}
                  {isActive && (
                    <div style={{ marginLeft: "auto", width: "24px", height: "24px", border: "3px solid #FFD700", borderTopColor: "transparent", borderRadius: "50%", animation: "starSpin 0.8s linear infinite", flexShrink: 0 }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <div
          className="w-full animate-fadeInUp"
          style={{
            background: "rgba(37, 211, 102, 0.15)",
            border: "2px solid rgba(37, 211, 102, 0.4)",
            borderRadius: "16px",
            padding: "20px",
            marginBottom: "20px",
            animationDelay: "0.6s",
            opacity: 0,
          }}
        >
          <p style={{ fontFamily: "var(--font-body)", color: "white", fontWeight: 700, fontSize: "15px", marginBottom: "12px" }}>
            📱 Tem alguma dúvida? Fale conosco!
          </p>
          <a
            id="btn-whatsapp"
            href="https://wa.me/5511999999999?text=Olá!%20Acabei%20de%20fazer%20meu%20pedido%20da%20figurinha%20Copa%202026!"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              background: "#25D366",
              color: "white",
              fontFamily: "var(--font-titulo)",
              fontWeight: 900,
              fontSize: "18px",
              padding: "14px",
              borderRadius: "12px",
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>💬</span>
            FALAR NO WHATSAPP
          </a>
        </div>

        {/* Compartilhar */}
        <div
          className="w-full animate-fadeInUp"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "12px" }}>
            Compartilhe e indique para seus amigos! 🎉
          </p>

          <button
            id="btn-compartilhar"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Figurinha da Copa 2026",
                  text: "Criei minha figurinha personalizada da Copa do Mundo 2026! Crie a sua também!",
                  url: window.location.origin,
                });
              }
            }}
            style={{
              width: "100%",
              padding: "14px",
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: "12px",
              background: "transparent",
              color: "white",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "15px",
              marginBottom: "12px",
            }}
          >
            🔗 Compartilhar com amigos
          </button>

          <button
            id="btn-nova-figurinha"
            onClick={() => router.push("/")}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ← Criar nova figurinha
          </button>
        </div>
      </div>
    </main>
  );
}

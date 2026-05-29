"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuizProvider, useQuiz } from "../context/QuizContext";

const TIMES = [
  { nome: "Brasil", emoji: "🇧🇷", cor: "#009c3b" },
  { nome: "Argentina", emoji: "🇦🇷", cor: "#74ACDF" },
  { nome: "Portugal", emoji: "🇵🇹", cor: "#006600" },
  { nome: "França", emoji: "🇫🇷", cor: "#002395" },
  { nome: "Espanha", emoji: "🇪🇸", cor: "#AA151B" },
  { nome: "Alemanha", emoji: "🇩🇪", cor: "#1a1a1a" },
  { nome: "Inglaterra", emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", cor: "#CF0000" },
  { nome: "Itália", emoji: "🇮🇹", cor: "#009246" },
];

const POSICOES = [
  { nome: "Goleiro", emoji: "🧤", descricao: "O guardião do gol" },
  { nome: "Defensor", emoji: "🛡️", descricao: "A muralha da defesa" },
  { nome: "Meia", emoji: "🎯", descricao: "O maestro do meio" },
  { nome: "Atacante", emoji: "⚽", descricao: "O artilheiro temido" },
];

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round(((step) / total) * 100);
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#003087", fontWeight: 700 }}>
          Etapa {step} de {total}
        </span>
        <span style={{ fontFamily: "var(--font-titulo)", fontSize: "13px", color: "#003087", fontWeight: 900 }}>
          {pct}%
        </span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StepNome({ onNext }: { onNext: () => void }) {
  const { data, setData } = useQuiz();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!data.nome.trim()) {
      setError("Por favor, insira o nome da criança");
      return;
    }
    onNext();
  };

  return (
    <div className="animate-fadeInUp w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div style={{ fontSize: "4rem", marginBottom: "12px" }}>👶</div>
        <h2
          style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "clamp(22px, 5vw, 30px)", color: "#003087", marginBottom: "8px" }}
        >
          Qual o nome do seu craque?
        </h2>
        <p style={{ fontFamily: "var(--font-body)", color: "#555", fontSize: "15px" }}>
          O nome vai aparecer na figurinha personalizada
        </p>
      </div>

      <div className="mb-4">
        <input
          id="input-nome"
          className="input-field"
          type="text"
          placeholder="Ex: Miguel, Sofia, Gabriel..."
          value={data.nome}
          maxLength={20}
          onChange={(e) => {
            setData({ nome: e.target.value.toUpperCase() });
            setError("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleNext()}
          autoFocus
        />
        {error && (
          <p style={{ color: "#e53e3e", fontSize: "13px", marginTop: "6px", fontWeight: 600 }}>{error}</p>
        )}
        <p style={{ color: "#999", fontSize: "12px", marginTop: "6px", textAlign: "right" }}>
          {data.nome.length}/20 caracteres
        </p>
      </div>

      <button
        id="btn-proximo-nome"
        className="btn-primary w-full"
        style={{ fontSize: "18px", padding: "16px" }}
        onClick={handleNext}
      >
        Próximo →
      </button>
    </div>
  );
}

function StepTime({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, setData } = useQuiz();

  return (
    <div className="animate-fadeInUp w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div style={{ fontSize: "4rem", marginBottom: "12px" }}>🏆</div>
        <h2 style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "clamp(22px, 5vw, 30px)", color: "#003087", marginBottom: "8px" }}>
          Qual o time do {data.nome || "coração"}?
        </h2>
        <p style={{ fontFamily: "var(--font-body)", color: "#555", fontSize: "15px" }}>
          Escolha o clube que vai aparecer na figurinha
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {TIMES.map((time) => (
          <button
            key={time.nome}
            id={`btn-time-${time.nome.toLowerCase()}`}
            className={`quiz-option ${data.time === time.nome ? "selected" : ""}`}
            style={{ padding: "16px", display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}
            onClick={() => setData({ time: time.nome })}
          >
            <span style={{ fontSize: "1.8rem" }}>{time.emoji}</span>
            <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, color: "#1a1a1a", fontSize: "15px" }}>
              {time.nome}
            </span>
            {data.time === time.nome && (
              <span style={{ marginLeft: "auto", color: "#003087", fontSize: "1.2rem" }}>✓</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          id="btn-voltar-time"
          onClick={onBack}
          style={{
            flex: "0 0 auto",
            padding: "14px 20px",
            border: "2px solid #003087",
            borderRadius: "12px",
            background: "transparent",
            color: "#003087",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          ← Voltar
        </button>
        <button
          id="btn-proximo-time"
          className="btn-primary"
          style={{ flex: 1, fontSize: "16px", padding: "14px", animation: data.time ? "pulseGlow 2.5s ease-in-out infinite" : "none", opacity: data.time ? 1 : 0.5 }}
          onClick={() => data.time && onNext()}
          disabled={!data.time}
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}

function StepPosicao({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, setData } = useQuiz();

  return (
    <div className="animate-fadeInUp w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div style={{ fontSize: "4rem", marginBottom: "12px" }}>🎽</div>
        <h2 style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "clamp(22px, 5vw, 30px)", color: "#003087", marginBottom: "8px" }}>
          Qual a posição favorita?
        </h2>
        <p style={{ fontFamily: "var(--font-body)", color: "#555", fontSize: "15px" }}>
          Onde {data.nome || "o craque"} brilha em campo?
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {POSICOES.map((pos) => (
          <button
            key={pos.nome}
            id={`btn-posicao-${pos.nome.toLowerCase()}`}
            className={`quiz-option ${data.posicao === pos.nome ? "selected" : ""}`}
            style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: "14px", textAlign: "left" }}
            onClick={() => setData({ posicao: pos.nome })}
          >
            <span style={{ fontSize: "2rem" }}>{pos.emoji}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, color: "#003087", fontSize: "16px", display: "block" }}>
                {pos.nome}
              </span>
              <span style={{ fontFamily: "var(--font-body)", color: "#777", fontSize: "13px" }}>
                {pos.descricao}
              </span>
            </div>
            {data.posicao === pos.nome && (
              <span style={{ color: "#003087", fontSize: "1.4rem" }}>✓</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          id="btn-voltar-posicao"
          onClick={onBack}
          style={{ flex: "0 0 auto", padding: "14px 20px", border: "2px solid #003087", borderRadius: "12px", background: "transparent", color: "#003087", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" }}
        >
          ← Voltar
        </button>
        <button
          id="btn-proximo-posicao"
          className="btn-primary"
          style={{ flex: 1, fontSize: "16px", padding: "14px", opacity: data.posicao ? 1 : 0.5 }}
          onClick={() => data.posicao && onNext()}
          disabled={!data.posicao}
        >
          Próximo →
        </button>
      </div>
    </div>
  );
}

function StepNumero({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, setData } = useQuiz();
  const numeros = Array.from({ length: 23 }, (_, i) => i + 1);

  return (
    <div className="animate-fadeInUp w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <div style={{ fontSize: "4rem", marginBottom: "12px" }}>🔢</div>
        <h2 style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "clamp(22px, 5vw, 30px)", color: "#003087", marginBottom: "8px" }}>
          Qual o número da camisa?
        </h2>
        <p style={{ fontFamily: "var(--font-body)", color: "#555", fontSize: "15px" }}>
          O número que vai aparecer na sua figurinha
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-6">
        {numeros.map((n) => (
          <button
            key={n}
            id={`btn-numero-${n}`}
            onClick={() => setData({ numero: String(n) })}
            style={{
              padding: "12px 0",
              borderRadius: "12px",
              border: data.numero === String(n) ? "3px solid #003087" : "2px solid rgba(0,48,135,0.2)",
              background: data.numero === String(n) ? "#003087" : "white",
              color: data.numero === String(n) ? "white" : "#1a1a1a",
              fontFamily: "var(--font-titulo)",
              fontWeight: 900,
              fontSize: "18px",
              cursor: "pointer",
              transition: "all 0.15s ease",
              transform: data.numero === String(n) ? "scale(1.1)" : "scale(1)",
              boxShadow: data.numero === String(n) ? "0 4px 16px rgba(0,48,135,0.4)" : "none",
            }}
          >
            {n}
          </button>
        ))}
        {/* Número personalizado */}
        <div
          style={{
            gridColumn: "span 5",
            marginTop: "8px",
          }}
        >
          <input
            id="input-numero-custom"
            className="input-field"
            type="text"
            placeholder="Ou digite seu número (ex: 99, 77...)"
            value={numeros.includes(Number(data.numero)) ? "" : data.numero}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 2);
              setData({ numero: val });
            }}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button id="btn-voltar-numero" onClick={onBack} style={{ flex: "0 0 auto", padding: "14px 20px", border: "2px solid #003087", borderRadius: "12px", background: "transparent", color: "#003087", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" }}>
          ← Voltar
        </button>
        <button
          id="btn-ver-figurinha"
          className="btn-primary"
          style={{ flex: 1, fontSize: "16px", padding: "14px", opacity: data.numero ? 1 : 0.5 }}
          onClick={() => data.numero && onNext()}
          disabled={!data.numero}
        >
          Ver minha figurinha! 🎉
        </button>
      </div>
    </div>
  );
}

function QuizFlow() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const TOTAL = 4;

  const next = () => {
    if (step < TOTAL) setStep(step + 1);
    else router.push("/preview");
  };
  const back = () => {
    if (step > 1) setStep(step - 1);
    else router.push("/");
  };

  return (
    <main
      className="flex flex-col min-h-[100dvh] w-full"
      style={{ background: "linear-gradient(180deg, #FFD700 0%, #FFE44D 40%, #FFF8CC 100%)" }}
    >
      <div className="flex-1 flex flex-col px-5 py-8 max-w-xl mx-auto w-full">
        {/* Logo topo */}
        <div className="flex items-center gap-2 mb-6">
          <span style={{ fontSize: "1.5rem" }}>🏆</span>
          <span
            style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "16px", color: "#003087", letterSpacing: "0.05em" }}
          >
            FIGURINHA COPA 2026
          </span>
        </div>

        <ProgressBar step={step} total={TOTAL} />

        <div className="flex-1 flex flex-col justify-center">
          {step === 1 && <StepNome onNext={next} />}
          {step === 2 && <StepTime onNext={next} onBack={back} />}
          {step === 3 && <StepPosicao onNext={next} onBack={back} />}
          {step === 4 && <StepNumero onNext={next} onBack={back} />}
        </div>
      </div>
    </main>
  );
}

export default function QuizPage() {
  return (
    <QuizProvider>
      <QuizFlow />
    </QuizProvider>
  );
}

"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { QuizProvider, useQuiz } from "../context/QuizContext";

const PACOTES = [
  {
    id: 1,
    nome: "1 Figurinha",
    emoji: "⭐",
    preco: "R$12,90",
    precoNum: 12.90,
    items: ["1 figurinha impressa", "Qualidade premium", "Entrega em 7-10 dias"],
    destaque: false,
    cor: "#003087",
  },
  {
    id: 2,
    nome: "3 Figurinhas",
    emoji: "🌟",
    preco: "R$29,90",
    precoNum: 29.90,
    items: ["3 figurinhas impressas", "Economize R$8,80", "Qualidade premium", "Entrega em 7-10 dias"],
    destaque: true,
    cor: "#003087",
    badge: "MAIS VENDIDO",
  },
  {
    id: 3,
    nome: "Álbum Completo",
    emoji: "🏆",
    preco: "R$49,90",
    precoNum: 49.90,
    items: ["10 figurinhas impressas", "Álbum personalizado", "Economize R$79,10", "Envio prioritário", "Embalagem especial"],
    destaque: false,
    cor: "#003087",
    badge: "MELHOR VALOR",
  },
];

function PacoteCard({ pacote, selected, onSelect }: { pacote: typeof PACOTES[0]; selected: boolean; onSelect: () => void }) {
  return (
    <div
      id={`btn-pacote-${pacote.id}`}
      className={`pacote-card ${selected ? "selected" : ""} ${pacote.destaque ? "destaque" : ""}`}
      onClick={onSelect}
      style={{
        background: selected
          ? "linear-gradient(135deg, #003087, #0046C8)"
          : "rgba(255,255,255,0.05)",
        padding: "20px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {pacote.badge && (
        <div
          style={{
            position: "absolute",
            top: "-12px",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          <span className="badge-vendido">{pacote.badge}</span>
        </div>
      )}

      <div className="flex items-start gap-3">
        <span style={{ fontSize: "2rem", flexShrink: 0 }}>{pacote.emoji}</span>
        <div style={{ flex: 1 }}>
          <div className="flex items-center justify-between mb-1">
            <span
              style={{
                fontFamily: "var(--font-titulo)",
                fontWeight: 900,
                fontSize: "18px",
                color: selected ? "white" : "#FFD700",
              }}
            >
              {pacote.nome}
            </span>
            <span
              style={{
                fontFamily: "var(--font-titulo)",
                fontWeight: 900,
                fontSize: "22px",
                color: selected ? "#FFD700" : "white",
              }}
            >
              {pacote.preco}
            </span>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {pacote.items.map((item, i) => (
              <li
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: selected ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "2px",
                }}
              >
                <span style={{ color: "#FFD700" }}>✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {selected && (
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#FFD700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#003087",
              fontWeight: 900,
              fontSize: "16px",
            }}
          >
            ✓
          </div>
        )}
      </div>
    </div>
  );
}

function CheckoutContent() {
  const { data, setData, pacote, setPacote } = useQuiz();
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", cep: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const pacoteAtual = PACOTES.find((p) => p.id === pacote) || PACOTES[1];

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setData({ foto: e.target?.result as string });
    reader.readAsDataURL(file);
  }, [setData]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome obrigatório";
    if (!form.email.includes("@")) errs.email = "E-mail inválido";
    if (form.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido";
    if (!data.foto) errs.foto = "Envie a foto do seu craque";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    // Simular processamento
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    router.push("/obrigado");
  };

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  return (
    <main
      className="flex flex-col min-h-[100dvh] w-full"
      style={{ background: "linear-gradient(160deg, #001a6b 0%, #003087 100%)" }}
    >
      <div className="w-full max-w-lg mx-auto px-5 py-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <span style={{ fontSize: "1.4rem" }}>🏆</span>
          <span style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "15px", color: "#FFD700" }}>
            FIGURINHA COPA 2026
          </span>
        </div>

        <h1
          className="animate-fadeInUp"
          style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "clamp(22px, 5vw, 28px)", color: "#FFD700", marginBottom: "6px" }}
        >
          🛒 Finalize seu pedido
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: "14px", marginBottom: "24px" }}>
          Escolha seu pacote e envie a foto do craque!
        </p>

        {/* PACOTES */}
        <section className="mb-8">
          <h2 style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, color: "white", fontSize: "16px", marginBottom: "16px", letterSpacing: "0.05em" }}>
            1. ESCOLHA SEU PACOTE
          </h2>
          <div className="flex flex-col gap-4">
            {PACOTES.map((p) => (
              <PacoteCard
                key={p.id}
                pacote={p}
                selected={pacote === p.id}
                onSelect={() => setPacote(p.id)}
              />
            ))}
          </div>
        </section>

        {/* UPLOAD FOTO */}
        <section className="mb-8">
          <h2 style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, color: "white", fontSize: "16px", marginBottom: "16px", letterSpacing: "0.05em" }}>
            2. ENVIE A FOTO DO CRAQUE
          </h2>

          <div
            id="upload-area"
            className={`upload-area ${dragOver ? "active" : ""}`}
            style={{ padding: "28px 20px", textAlign: "center" }}
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            {data.foto ? (
              <div className="flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.foto}
                  alt="Preview"
                  style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "12px", border: "3px solid #FFD700" }}
                />
                <p style={{ color: "#FFD700", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "14px" }}>
                  ✅ Foto enviada! Clique para trocar
                </p>
              </div>
            ) : (
              <>
                <div style={{ fontSize: "3rem", marginBottom: "12px" }}>📸</div>
                <p style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, color: "#003087", fontSize: "16px", marginBottom: "6px" }}>
                  Clique ou arraste a foto aqui
                </p>
                <p style={{ fontFamily: "var(--font-body)", color: "#666", fontSize: "13px" }}>
                  JPG, PNG ou HEIC • Máx. 10MB
                </p>
                <p style={{ fontFamily: "var(--font-body)", color: "#888", fontSize: "12px", marginTop: "6px" }}>
                  💡 Use uma foto com rosto bem visível e boa iluminação
                </p>
              </>
            )}
          </div>
          {errors.foto && <p style={{ color: "#FF6B6B", fontSize: "13px", marginTop: "6px", fontWeight: 600 }}>{errors.foto}</p>}

          <input
            id="input-foto"
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          />
        </section>

        {/* DADOS PESSOAIS */}
        <section className="mb-8">
          <h2 style={{ fontFamily: "var(--font-titulo)", fontWeight: 900, color: "white", fontSize: "16px", marginBottom: "16px", letterSpacing: "0.05em" }}>
            3. SEUS DADOS
          </h2>

          <div className="flex flex-col gap-3">
            <div>
              <input
                id="input-nome-comprador"
                className="input-field"
                type="text"
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={(e) => { setForm((f) => ({ ...f, nome: e.target.value })); setErrors((e2) => ({ ...e2, nome: "" })); }}
              />
              {errors.nome && <p style={{ color: "#FF6B6B", fontSize: "13px", marginTop: "4px" }}>{errors.nome}</p>}
            </div>

            <div>
              <input
                id="input-email"
                className="input-field"
                type="email"
                placeholder="Seu e-mail (para confirmação)"
                value={form.email}
                onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((e2) => ({ ...e2, email: "" })); }}
              />
              {errors.email && <p style={{ color: "#FF6B6B", fontSize: "13px", marginTop: "4px" }}>{errors.email}</p>}
            </div>

            <div>
              <input
                id="input-telefone"
                className="input-field"
                type="tel"
                placeholder="Seu WhatsApp"
                value={form.telefone}
                onChange={(e) => {
                  setForm((f) => ({ ...f, telefone: formatPhone(e.target.value) }));
                  setErrors((e2) => ({ ...e2, telefone: "" }));
                }}
              />
              {errors.telefone && <p style={{ color: "#FF6B6B", fontSize: "13px", marginTop: "4px" }}>{errors.telefone}</p>}
            </div>

            <input
              id="input-cep"
              className="input-field"
              type="text"
              placeholder="CEP para entrega"
              maxLength={9}
              value={form.cep}
              onChange={(e) => {
                const d = e.target.value.replace(/\D/g, "").slice(0, 8);
                setForm((f) => ({ ...f, cep: d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d }));
              }}
            />
          </div>
        </section>

        {/* RESUMO E CHECKOUT */}
        <section>
          <div
            style={{
              background: "rgba(255,215,0,0.1)",
              border: "1px solid rgba(255,215,0,0.3)",
              borderRadius: "16px",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: "14px" }}>Pacote:</span>
              <span style={{ color: "white", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "14px" }}>{pacoteAtual.nome}</span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: "14px" }}>Total:</span>
              <span style={{ color: "#FFD700", fontFamily: "var(--font-titulo)", fontWeight: 900, fontSize: "22px" }}>{pacoteAtual.preco}</span>
            </div>
          </div>

          <button
            id="btn-finalizar-pedido"
            className="btn-primary w-full"
            style={{
              fontSize: "clamp(18px, 4vw, 22px)",
              padding: "20px",
              opacity: submitting ? 0.8 : 1,
            }}
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-3">
                <span style={{ display: "inline-block", width: "20px", height: "20px", border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "starSpin 0.8s linear infinite" }} />
                Processando...
              </span>
            ) : (
              "💳 FINALIZAR PEDIDO"
            )}
          </button>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>🔒</span>
            <span style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>
              Pagamento 100% seguro • Seus dados protegidos
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <QuizProvider>
      <CheckoutContent />
    </QuizProvider>
  );
}

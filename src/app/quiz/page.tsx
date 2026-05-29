"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuizProvider, useQuiz } from "../context/QuizContext";

/* ───── BARRA DE PROGRESSO ───── */
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-1 px-1">
        <span style={{ fontFamily: "var(--font-titulo)", fontSize: "16px", color: "var(--copa-blue)" }}>
          Passo {step} de {total}
        </span>
        <span style={{ fontFamily: "var(--font-titulo)", fontSize: "16px", color: "var(--copa-blue)" }}>
          {pct}%
        </span>
      </div>
      <div className="h-3 bg-white rounded-full overflow-hidden border-2 border-white" style={{ boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)" }}>
        <div className="h-full bg-copa-blue rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ───── PAGINAÇÃO DOTS ───── */
function PaginationDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i + 1 === step ? "bg-copa-blue scale-110" : "bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}

/* ───── MODAL AVISO ───── */
function ModalAviso({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-bounceIn">
        <div className="p-5 text-center">
          <h3 className="text-copa-blue text-3xl mb-4" style={{ fontFamily: "var(--font-titulo)" }}>AVISO</h3>
          <div className="relative w-full aspect-square bg-copa-blue rounded-2xl overflow-hidden mb-4 border-4 border-copa-blue">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/aviso.png" alt="Aviso Foto" className="w-full h-full object-cover" />
          </div>
          <p className="text-[#333] text-sm leading-relaxed font-bold px-2 mb-5" style={{ fontFamily: "var(--font-body)" }}>
            A foto precisa ser <span className="text-copa-blue">somente da pessoa</span>, sem outras pessoas no enquadramento.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-copa-blue text-white text-2xl py-3 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all"
            style={{ fontFamily: "var(--font-titulo)" }}
          >
            ENTENDI
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───── MODAL FAKE LOADING ───── */
function ModalLoadingFoto({ isOpen, onComplete }: { isOpen: boolean; onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }
    
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(onComplete, 500); // delay before closing
      }
      setProgress(current);
    }, 300);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl">
        <h3 className="text-copa-blue text-2xl mb-4" style={{ fontFamily: "var(--font-titulo)" }}>CARREGANDO FOTO</h3>
        <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/aviso.png" alt="Loading" className="w-full h-full object-cover opacity-80" />
        </div>
        <p className="text-sm font-bold text-[#444] mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Esse tem cara de jogador caro hein
        </p>
        <div className="w-full">
          <div className="flex justify-between text-xs text-copa-blue font-bold mb-1">
            <span>Carregando...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-copa-blue transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── STEP 1: NOME + FOTO ───── */
function StepNomeFoto({ onNext }: { onNext: () => void }) {
  const { data, setData } = useQuiz();
  const fileRef = useRef<HTMLInputElement>(null);
  const [showAviso, setShowAviso] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileClick = () => {
    // Show aviso modal first
    setShowAviso(true);
  };

  const onAvisoClose = () => {
    setShowAviso(false);
    // After they understand, open file picker
    setTimeout(() => fileRef.current?.click(), 300);
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setData({ foto: file, fotoPreview: e.target?.result as string });
      // Show fake loading screen
      setShowLoading(true);
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    if (!data.nome.trim()) { setError("Digite o nome"); return; }
    if (!data.fotoPreview) { setError("Envie a foto"); return; }
    onNext();
  };

  return (
    <div className="animate-fadeIn w-full flex flex-col items-center">
      <div className="text-4xl mb-1">✍️</div>
      <h2 className="text-copa-blue text-3xl uppercase text-center mb-1" style={{ fontFamily: "var(--font-titulo)" }}>
        Qual o nome do craque?
      </h2>
      <p className="text-[#666] text-sm text-center mb-5" style={{ fontFamily: "var(--font-body)" }}>
        O nome que vai aparecer na figurinha
      </p>

      <input
        type="text"
        className="w-full border-2 border-gray-100 rounded-2xl px-4 py-3 text-[#333] mb-5 focus:border-copa-blue focus:outline-none transition-colors"
        placeholder="Nome e sobrenome"
        style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
        value={data.nome}
        onChange={(e) => { setData({ nome: e.target.value }); setError(""); }}
      />

      <div className="w-full mb-6">
        <h3 className="text-copa-blue text-xs uppercase mb-2 ml-1" style={{ fontFamily: "var(--font-titulo)" }}>FOTO DO CRAQUE</h3>
        
        {data.fotoPreview ? (
          <div className="w-full border-2 border-copa-blue rounded-2xl p-4 flex flex-col items-center justify-center bg-blue-50/50 cursor-pointer" onClick={() => fileRef.current?.click()}>
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-copa-blue mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.fotoPreview} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <span className="text-copa-blue text-xs font-bold" style={{ fontFamily: "var(--font-titulo)" }}>Toque para trocar a foto</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50" onClick={handleFileClick}>
              <span className="text-3xl mb-2">🖼️</span>
              <span className="text-xs text-center font-bold text-[#333]" style={{ fontFamily: "var(--font-body)" }}>Enviar foto<br/>DO ROSTO,<br/>não de corpo</span>
            </div>
            <div className="border border-dashed border-gray-300 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50" onClick={() => fileRef.current?.click()}>
              <span className="text-3xl mb-2">📸</span>
              <span className="text-sm font-bold text-[#333]" style={{ fontFamily: "var(--font-body)" }}>Câmera</span>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm font-bold mb-3">{error}</p>}

      <button
        onClick={handleNext}
        className="w-full bg-copa-blue text-white text-2xl py-4 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all"
        style={{ fontFamily: "var(--font-titulo)" }}
      >
        PRÓXIMO &rarr;
      </button>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])} />
      
      <ModalAviso isOpen={showAviso} onClose={onAvisoClose} />
      <ModalLoadingFoto isOpen={showLoading} onComplete={() => setShowLoading(false)} />
    </div>
  );
}

/* ───── STEP 2: NASCIMENTO + EMAIL ───── */
function StepNascimento({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, setData } = useQuiz();
  const [error, setError] = useState("");

  const dias = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const meses = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const anos = Array.from({ length: 20 }, (_, i) => String(new Date().getFullYear() - i));

  const handleNext = () => {
    if (!data.nascimento_dia || !data.nascimento_mes || !data.nascimento_ano) { setError("Preencha a data"); return; }
    if (!data.email.includes("@")) { setError("E-mail inválido"); return; }
    onNext();
  };

  return (
    <div className="animate-fadeIn w-full flex flex-col items-center">
      <div className="text-4xl mb-1">🎂</div>
      <h2 className="text-copa-blue text-3xl uppercase text-center mb-1" style={{ fontFamily: "var(--font-titulo)" }}>
        DATA DE NASCIMENTO
      </h2>
      <p className="text-[#666] text-sm text-center mb-6" style={{ fontFamily: "var(--font-body)" }}>
        Pra calcular a idade na figurinha
      </p>

      <div className="w-full mb-5">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-copa-blue text-[10px] uppercase ml-1 block mb-1" style={{ fontFamily: "var(--font-titulo)" }}>DIA</label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-[#333] bg-white focus:outline-none"
              value={data.nascimento_dia}
              onChange={(e) => { setData({ nascimento_dia: e.target.value }); setError(""); }}
            >
              <option value="">--</option>
              {dias.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-copa-blue text-[10px] uppercase ml-1 block mb-1" style={{ fontFamily: "var(--font-titulo)" }}>MÊS</label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-[#333] bg-white focus:outline-none"
              value={data.nascimento_mes}
              onChange={(e) => { setData({ nascimento_mes: e.target.value }); setError(""); }}
            >
              <option value="">--</option>
              {meses.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-copa-blue text-[10px] uppercase ml-1 block mb-1" style={{ fontFamily: "var(--font-titulo)" }}>ANO</label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-[#333] bg-white focus:outline-none"
              value={data.nascimento_ano}
              onChange={(e) => { setData({ nascimento_ano: e.target.value }); setError(""); }}
            >
              <option value="">--</option>
              {anos.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="w-full mb-6">
        <label className="text-copa-blue text-[10px] uppercase ml-1 block mb-1" style={{ fontFamily: "var(--font-titulo)" }}>SEU MELHOR E-MAIL</label>
        <input
          type="email"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#333] focus:border-copa-blue focus:outline-none transition-colors"
          placeholder="exemplo@email.com"
          style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
          value={data.email}
          onChange={(e) => { setData({ email: e.target.value }); setError(""); }}
        />
      </div>

      {error && <p className="text-red-500 text-sm font-bold mb-3">{error}</p>}

      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          onClick={onBack}
          className="w-full border border-copa-blue text-copa-blue text-xl py-3 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          VOLTAR
        </button>
        <button
          onClick={handleNext}
          className="w-full bg-copa-blue text-white text-xl py-3 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          PRÓXIMO &rarr;
        </button>
      </div>
    </div>
  );
}

/* ───── STEP 3: CLUBE + MEDIDAS ───── */
function StepClubeMedidas({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data, setData } = useQuiz();
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!data.clube.trim() || !data.peso.trim() || !data.altura.trim()) { setError("Preencha todos os campos"); return; }
    onNext();
  };

  return (
    <div className="animate-fadeIn w-full flex flex-col items-center">
      <div className="text-4xl mb-1">⭐</div>
      <h2 className="text-copa-blue text-3xl uppercase text-center mb-1" style={{ fontFamily: "var(--font-titulo)" }}>
        CLUBE E DADOS
      </h2>
      <p className="text-[#666] text-sm text-center mb-6" style={{ fontFamily: "var(--font-body)" }}>
        O clube do coração e os dados pra figurinha
      </p>

      <div className="w-full mb-4">
        <label className="text-copa-blue text-[10px] uppercase ml-1 block mb-1" style={{ fontFamily: "var(--font-titulo)" }}>CLUBE DO CORAÇÃO</label>
        <input
          type="text"
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#333] focus:border-copa-blue focus:outline-none transition-colors"
          placeholder="Digite o nome do clube..."
          style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
          value={data.clube}
          onChange={(e) => { setData({ clube: e.target.value }); setError(""); }}
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="text-copa-blue text-[10px] uppercase ml-1 block mb-1" style={{ fontFamily: "var(--font-titulo)" }}>PESO (KG)</label>
          <input
            type="number"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#333] focus:border-copa-blue focus:outline-none transition-colors"
            placeholder="ex: 25"
            style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
            value={data.peso}
            onChange={(e) => { setData({ peso: e.target.value }); setError(""); }}
          />
        </div>
        <div>
          <label className="text-copa-blue text-[10px] uppercase ml-1 block mb-1" style={{ fontFamily: "var(--font-titulo)" }}>ALTURA (CM)</label>
          <input
            type="number"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[#333] focus:border-copa-blue focus:outline-none transition-colors"
            placeholder="ex: 120"
            style={{ fontFamily: "var(--font-body)", fontWeight: 700 }}
            value={data.altura}
            onChange={(e) => { setData({ altura: e.target.value }); setError(""); }}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm font-bold mb-3">{error}</p>}

      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          onClick={onBack}
          className="w-full border border-copa-blue text-copa-blue text-xl py-3 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          VOLTAR
        </button>
        <button
          onClick={handleNext}
          className="w-full bg-copa-blue text-white text-xl py-3 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          PRÓXIMO &rarr;
        </button>
      </div>
    </div>
  );
}

/* ───── STEP 4: CONFIRMAR DADOS ───── */
function StepConfirmacao({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const { data } = useQuiz();

  return (
    <div className="animate-fadeIn w-full flex flex-col items-center">
      <div className="text-4xl mb-1">⚠️</div>
      <h2 className="text-copa-blue text-3xl uppercase text-center mb-1" style={{ fontFamily: "var(--font-titulo)" }}>
        CONFIRA SEUS DADOS
      </h2>
      <p className="text-[#666] text-xs text-center mb-2 px-2" style={{ fontFamily: "var(--font-body)" }}>
        A figurinha será gerada em breve. Revise os dados abaixo com atenção.
      </p>
      <p className="text-copa-blue text-xs text-center mb-5 font-bold" style={{ fontFamily: "var(--font-body)" }}>
        Não fazemos alterações após a aprovação e pagamento.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full border-2 border-copa-blue overflow-hidden flex-shrink-0 shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {data.fotoPreview && <img src={data.fotoPreview} alt="Rosto" className="w-full h-full object-cover" />}
        </div>
        <p className="text-xs font-bold text-[#555] uppercase" style={{ fontFamily: "var(--font-body)", maxWidth: "120px" }}>
          VERIFIQUE SE O ROSTO ESTÁ PRÓXIMO
        </p>
      </div>

      <div className="w-full bg-gray-50 rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-copa-blue text-xs" style={{ fontFamily: "var(--font-titulo)" }}>NOME</span>
          <span className="text-[#333] text-sm font-bold" style={{ fontFamily: "var(--font-body)" }}>{data.nome}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-copa-blue text-xs" style={{ fontFamily: "var(--font-titulo)" }}>PESO</span>
          <span className="text-[#333] text-sm font-bold" style={{ fontFamily: "var(--font-body)" }}>{data.peso} kg</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <span className="text-copa-blue text-xs" style={{ fontFamily: "var(--font-titulo)" }}>ALTURA</span>
          <span className="text-[#333] text-sm font-bold" style={{ fontFamily: "var(--font-body)" }}>{data.altura} cm</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-copa-blue text-xs" style={{ fontFamily: "var(--font-titulo)" }}>CLUBE</span>
          <span className="text-[#333] text-sm font-bold" style={{ fontFamily: "var(--font-body)" }}>{data.clube}</span>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-copa-blue text-white text-xl py-4 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"
        style={{ fontFamily: "var(--font-titulo)" }}
      >
        ENTENDI, GERAR FIGURINHA ⚽
      </button>

      <button
        onClick={onBack}
        className="w-full border border-gray-300 text-[#555] text-sm py-3 rounded-xl hover:bg-gray-50 active:scale-95 transition-all"
        style={{ fontFamily: "var(--font-titulo)" }}
      >
        CORRIGIR DADOS
      </button>
    </div>
  );
}

/* ───── STEP 5: VSL / GERANDO FIGURINHA ───── */
function StepVSLLoading() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Aumenta devagar o progresso, simulando geração. Tempo total ~30s para efeito de teste.
    // Num cenário real, dura o tempo do pitch de vendas do vídeo (ex: 2 min).
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push("/checkout"), 500); // Manda para oferta final
          return 100;
        }
        return next;
      });
    }, 200); // 1% a cada 200ms = 20s total

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="animate-fadeIn w-full flex flex-col items-center pt-2">
      <h2 className="text-copa-blue text-3xl uppercase text-center mb-1" style={{ fontFamily: "var(--font-titulo)" }}>
        GERANDO SUA FIGURINHA
      </h2>
      <p className="text-[#333] text-sm text-center font-bold mb-6" style={{ fontFamily: "var(--font-body)" }}>
        Não saia dessa tela, leva até 2 minutos.
      </p>

      {/* Placeholder de Vídeo */}
      <div className="w-full aspect-[9/16] max-w-[280px] bg-purple-600 rounded-xl flex flex-col items-center justify-center text-white mb-6 p-4 text-center shadow-lg">
        <p className="font-bold mb-4" style={{ fontFamily: "var(--font-body)" }}>Você já começou a assistir esse vídeo</p>
        <button className="flex items-center gap-2 border border-white/50 px-4 py-2 rounded-full text-sm mb-2 hover:bg-white/10">
          ▶️ Continuar assistindo?
        </button>
        <button className="flex items-center gap-2 border border-white/50 px-4 py-2 rounded-full text-sm hover:bg-white/10">
          🔄 Assistir do início?
        </button>
      </div>

      <p className="text-copa-blue font-bold text-center mb-1" style={{ fontFamily: "var(--font-titulo)", fontSize: "18px" }}>
        Adquira sua figurinha HOJE e concorra a
      </p>
      <p className="text-green-600 font-bold text-center text-3xl mb-1" style={{ fontFamily: "var(--font-titulo)" }}>
        MIL REAIS
      </p>
      <p className="text-copa-blue font-bold text-center text-sm mb-6" style={{ fontFamily: "var(--font-titulo)" }}>
        no dia 11/06/2026 início dos jogos.
      </p>

      {/* Progress Footer */}
      <div className="w-full mt-auto">
        <div className="flex justify-between text-copa-blue text-xs font-bold mb-1" style={{ fontFamily: "var(--font-titulo)" }}>
          <span>{Math.floor((progress / 100) * 120)}s</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-copa-blue transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

/* ───── FLUXO PRINCIPAL ───── */
function QuizFlow() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const TOTAL = 4; // VSL is not counted in progress dots

  const next = () => {
    if (step < 5) setStep(step + 1); // step 5 is VSL
  };
  const back = () => {
    if (step > 1) setStep(step - 1);
    else router.push("/");
  };

  return (
    <main className="flex flex-col min-h-[100dvh] w-full bg-copa-yellow p-4 sm:p-6 pb-8">
      <div className="w-full max-w-md mx-auto flex flex-col h-full items-center">
        
        {step <= 4 && <ProgressBar step={step} total={TOTAL} />}

        {/* White Card */}
        <div className="w-full bg-white rounded-[32px] p-6 shadow-2xl mt-2 relative min-h-[400px] flex flex-col">
          {step === 1 && <StepNomeFoto onNext={next} />}
          {step === 2 && <StepNascimento onNext={next} onBack={back} />}
          {step === 3 && <StepClubeMedidas onNext={next} onBack={back} />}
          {step === 4 && <StepConfirmacao onNext={next} onBack={back} />}
          {step === 5 && <StepVSLLoading />}
        </div>

        {step <= 4 && <PaginationDots step={step} total={TOTAL} />}
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

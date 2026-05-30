"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuizProvider, useQuiz } from "../context/QuizContext";

/* ───── BARRA DE PROGRESSO COLADA NO TOPO ───── */
function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="w-full px-4 pt-4 pb-2">
      <div className="flex justify-between items-center mb-1">
        <span style={{ fontFamily: "var(--font-titulo)", fontSize: "18px", color: "var(--copa-blue)" }}>
          Passo {step} de {total}
        </span>
        <span style={{ fontFamily: "var(--font-titulo)", fontSize: "18px", color: "var(--copa-blue)" }}>
          {pct}%
        </span>
      </div>
      <div className="h-3 bg-white rounded-full overflow-hidden border border-white/50 shadow-inner">
        <div className="h-full bg-copa-blue rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ───── PAGINAÇÃO DOTS ───── */
function PaginationDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex justify-center gap-2 mt-4 pb-6">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            i + 1 === step ? "bg-copa-blue scale-125" : "bg-white/40"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-slide-up">
        <div className="p-6 text-center">
          <h3 className="text-copa-blue text-4xl mb-4" style={{ fontFamily: "var(--font-titulo)", letterSpacing: "0.05em" }}>AVISO</h3>
          <div className="relative w-full aspect-square bg-copa-blue rounded-2xl overflow-hidden mb-4 border-[6px] border-copa-blue shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/aviso.png" alt="Aviso Foto" className="w-full h-full object-cover" />
          </div>
          <p className="text-gray-600 text-[17px] leading-snug px-2 mb-6" style={{ fontFamily: "var(--font-body)" }}>
            A foto precisa ser <span className="text-copa-blue font-black">somente da pessoa</span>, sem outras pessoas no enquadramento.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-copa-blue text-white text-3xl py-4 rounded-[14px] hover:bg-copa-blue/90 active:scale-95 transition-all shadow-md"
            style={{ fontFamily: "var(--font-titulo)", letterSpacing: "0.05em" }}
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
        setTimeout(onComplete, 600); // delay before closing
      }
      setProgress(current);
    }, 250);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl animate-slide-up">
        <h3 className="text-copa-blue text-3xl mb-4 tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>CARREGANDO FOTO</h3>
        <div className="relative w-40 h-40 mx-auto rounded-2xl overflow-hidden mb-4 shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/giphy.gif" alt="Loading" className="w-full h-full object-cover opacity-80" />
        </div>
        <p className="text-gray-600 text-lg mb-6" style={{ fontFamily: "var(--font-body)" }}>
          Esse tem cara de jogador caro hein
        </p>
        <div className="w-full">
          <div className="flex justify-between text-sm text-copa-blue mb-1" style={{ fontFamily: "var(--font-titulo)" }}>
            <span>Carregando...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
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
    setShowAviso(true);
  };

  const onAvisoClose = () => {
    setShowAviso(false);
    setTimeout(() => fileRef.current?.click(), 300);
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setData({ foto: file, fotoPreview: e.target?.result as string });
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
    <div className="animate-fadeIn w-full flex flex-col items-center flex-1 min-h-0">
      <div className="text-[40px] mb-1 animate-float-gentle">✍️</div>
      <h2 className="text-copa-blue text-[32px] sm:text-4xl text-center mb-0 tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>
        QUAL O NOME DO CRAQUE?
      </h2>
      <p className="text-gray-500 text-[15px] text-center mb-6" style={{ fontFamily: "var(--font-body)" }}>
        O nome que vai aparecer na figurinha
      </p>

      <input
        type="text"
        className="w-full border-[1.5px] border-gray-200 rounded-[12px] px-4 py-3.5 text-gray-700 text-lg mb-5 focus:border-copa-blue focus:ring-2 focus:ring-copa-blue/20 outline-none transition-all placeholder:text-gray-400"
        placeholder="Nome e sobrenome"
        style={{ fontFamily: "var(--font-body)" }}
        value={data.nome}
        onChange={(e) => { setData({ nome: e.target.value }); setError(""); }}
      />

      <div className="w-full mb-6">
        <h3 className="text-copa-blue text-sm mb-2 ml-1 tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>FOTO DO CRAQUE</h3>
        
        {data.fotoPreview ? (
          <div className="w-full border-2 border-copa-blue rounded-2xl p-4 flex flex-col items-center justify-center bg-blue-50/50 cursor-pointer shadow-sm" onClick={() => fileRef.current?.click()}>
            <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-copa-blue mb-2 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.fotoPreview} alt="Preview" className="w-full h-full object-cover" />
            </div>
            <span className="text-copa-blue text-sm" style={{ fontFamily: "var(--font-titulo)" }}>Toque para trocar a foto</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="border-[1.5px] border-dashed border-gray-300 rounded-[16px] p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors" onClick={handleFileClick}>
              <span className="text-3xl mb-1">🖼️</span>
              <span className="text-[13px] text-center text-gray-700 leading-tight" style={{ fontFamily: "var(--font-body)" }}>Enviar foto<br/>DO ROSTO,<br/>não de corpo</span>
            </div>
            <div className="border-[1.5px] border-dashed border-gray-300 rounded-[16px] p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors" onClick={() => fileRef.current?.click()}>
              <span className="text-3xl mb-1">📸</span>
              <span className="text-[15px] text-gray-700" style={{ fontFamily: "var(--font-body)" }}>Câmera</span>
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-base mb-4" style={{ fontFamily: "var(--font-body)" }}>{error}</p>}

      <div className="mt-auto w-full pt-4">
        <button
          onClick={handleNext}
          className="w-full bg-copa-blue text-white text-[28px] py-[18px] rounded-[14px] hover:bg-copa-blue/90 active:scale-[0.98] transition-all shadow-lg flex justify-center items-center gap-2"
          style={{ fontFamily: "var(--font-titulo)", letterSpacing: "0.05em" }}
        >
          PRÓXIMO &rarr;
        </button>
      </div>

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
  
  // ATUALIZAÇÃO DOS ANOS (ATÉ 1920)
  const anoAtual = new Date().getFullYear();
  const anos = Array.from({ length: anoAtual - 1920 + 1 }, (_, i) => String(anoAtual - i));

  const handleNext = () => {
    if (!data.nascimento_dia || !data.nascimento_mes || !data.nascimento_ano) { setError("Preencha a data"); return; }
    if (!data.email.includes("@")) { setError("E-mail inválido"); return; }
    onNext();
  };

  return (
    <div className="animate-fadeIn w-full flex flex-col items-center flex-1 min-h-0">
      <div className="text-[40px] mb-1 animate-float-gentle">🎂</div>
      <h2 className="text-copa-blue text-[32px] sm:text-4xl text-center mb-0 tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>
        DATA DE NASCIMENTO
      </h2>
      <p className="text-gray-500 text-[15px] text-center mb-6" style={{ fontFamily: "var(--font-body)" }}>
        Pra calcular a idade na figurinha
      </p>

      <div className="w-full mb-5">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-copa-blue text-xs ml-1 block mb-1 tracking-wider" style={{ fontFamily: "var(--font-titulo)" }}>DIA</label>
            <select
              className="w-full border-[1.5px] border-gray-200 rounded-[12px] px-3 py-3.5 text-gray-700 bg-white focus:border-copa-blue focus:ring-2 focus:ring-copa-blue/20 outline-none appearance-none"
              style={{ fontFamily: "var(--font-body)" }}
              value={data.nascimento_dia}
              onChange={(e) => { setData({ nascimento_dia: e.target.value }); setError(""); }}
            >
              <option value="">--</option>
              {dias.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-copa-blue text-xs ml-1 block mb-1 tracking-wider" style={{ fontFamily: "var(--font-titulo)" }}>MÊS</label>
            <select
              className="w-full border-[1.5px] border-gray-200 rounded-[12px] px-3 py-3.5 text-gray-700 bg-white focus:border-copa-blue focus:ring-2 focus:ring-copa-blue/20 outline-none appearance-none"
              style={{ fontFamily: "var(--font-body)" }}
              value={data.nascimento_mes}
              onChange={(e) => { setData({ nascimento_mes: e.target.value }); setError(""); }}
            >
              <option value="">--</option>
              {meses.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div>
            <label className="text-copa-blue text-xs ml-1 block mb-1 tracking-wider" style={{ fontFamily: "var(--font-titulo)" }}>ANO</label>
            <select
              className="w-full border-[1.5px] border-gray-200 rounded-[12px] px-3 py-3.5 text-gray-700 bg-white focus:border-copa-blue focus:ring-2 focus:ring-copa-blue/20 outline-none appearance-none"
              style={{ fontFamily: "var(--font-body)" }}
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
        <label className="text-copa-blue text-xs ml-1 block mb-1 tracking-wider" style={{ fontFamily: "var(--font-titulo)" }}>SEU MELHOR E-MAIL</label>
        <input
          type="email"
          className="w-full border-[1.5px] border-gray-200 rounded-[12px] px-4 py-3.5 text-gray-700 focus:border-copa-blue focus:ring-2 focus:ring-copa-blue/20 outline-none transition-colors placeholder:text-gray-400"
          placeholder="exemplo@email.com"
          style={{ fontFamily: "var(--font-body)" }}
          value={data.email}
          onChange={(e) => { setData({ email: e.target.value }); setError(""); }}
        />
      </div>

      {error && <p className="text-red-500 text-base mb-4" style={{ fontFamily: "var(--font-body)" }}>{error}</p>}

      <div className="mt-auto w-full pt-4 grid grid-cols-2 gap-3">
        <button
          onClick={onBack}
          className="w-full border-[2px] border-copa-blue text-copa-blue text-[24px] py-[16px] rounded-[14px] hover:bg-gray-50 active:scale-[0.98] transition-all"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          VOLTAR
        </button>
        <button
          onClick={handleNext}
          className="w-full bg-copa-blue text-white text-[24px] py-[16px] rounded-[14px] hover:bg-copa-blue/90 active:scale-[0.98] transition-all shadow-md flex justify-center items-center gap-2"
          style={{ fontFamily: "var(--font-titulo)", letterSpacing: "0.05em" }}
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

  const TIMES_BRASILEIROS = [
    "Flamengo",
    "Corinthians",
    "São Paulo",
    "Palmeiras",
    "Vasco da Gama",
    "Cruzeiro",
    "Grêmio",
    "Internacional",
    "Atlético Mineiro",
    "Botafogo",
    "Fluminense",
    "Santos",
    "Bahia",
    "Sport Recife",
    "Vitória",
    "Athletico Paranaense",
    "Coritiba",
    "Outro"
  ];

  const handleNext = () => {
    if (!data.clube.trim() || !data.peso.trim() || !data.altura.trim()) { setError("Preencha todos os campos"); return; }
    onNext();
  };

  return (
    <div className="animate-fadeIn w-full flex flex-col items-center flex-1 min-h-0">
      <div className="text-[40px] mb-1 animate-float-gentle">⭐</div>
      <h2 className="text-copa-blue text-[32px] sm:text-4xl text-center mb-0 tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>
        CLUBE E DADOS
      </h2>
      <p className="text-gray-500 text-[15px] text-center mb-6" style={{ fontFamily: "var(--font-body)" }}>
        O clube do coração e os dados pra figurinha
      </p>

      <div className="w-full mb-4">
        <label className="text-copa-blue text-xs ml-1 block mb-1 tracking-wider" style={{ fontFamily: "var(--font-titulo)" }}>CLUBE DO CORAÇÃO</label>
        {/* SELECT PARA TIMES */}
        <select
          className="w-full border-[1.5px] border-gray-200 rounded-[12px] px-4 py-3.5 text-gray-700 bg-white focus:border-copa-blue focus:ring-2 focus:ring-copa-blue/20 outline-none transition-colors appearance-none"
          style={{ fontFamily: "var(--font-body)" }}
          value={data.clube}
          onChange={(e) => { setData({ clube: e.target.value }); setError(""); }}
        >
          <option value="">Selecione o clube...</option>
          {TIMES_BRASILEIROS.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
        
        {/* CASO 'Outro', mostra input de texto */}
        {data.clube === "Outro" && (
          <input
            type="text"
            className="w-full border-[1.5px] border-gray-200 rounded-[12px] px-4 py-3.5 mt-2 text-gray-700 focus:border-copa-blue focus:ring-2 focus:ring-copa-blue/20 outline-none transition-colors placeholder:text-gray-400"
            placeholder="Digite o nome do clube..."
            style={{ fontFamily: "var(--font-body)" }}
            onChange={(e) => { setData({ clubeCustom: e.target.value }); setError(""); }}
          />
        )}
      </div>

      <div className="w-full grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="text-copa-blue text-xs ml-1 block mb-1 tracking-wider" style={{ fontFamily: "var(--font-titulo)" }}>PESO (KG)</label>
          <input
            type="number"
            className="w-full border-[1.5px] border-gray-200 rounded-[12px] px-4 py-3.5 text-gray-700 focus:border-copa-blue focus:ring-2 focus:ring-copa-blue/20 outline-none transition-colors placeholder:text-gray-400"
            placeholder="ex: 25"
            style={{ fontFamily: "var(--font-body)" }}
            value={data.peso}
            onChange={(e) => { setData({ peso: e.target.value }); setError(""); }}
          />
        </div>
        <div>
          <label className="text-copa-blue text-xs ml-1 block mb-1 tracking-wider" style={{ fontFamily: "var(--font-titulo)" }}>ALTURA (CM)</label>
          <input
            type="number"
            className="w-full border-[1.5px] border-gray-200 rounded-[12px] px-4 py-3.5 text-gray-700 focus:border-copa-blue focus:ring-2 focus:ring-copa-blue/20 outline-none transition-colors placeholder:text-gray-400"
            placeholder="ex: 120"
            style={{ fontFamily: "var(--font-body)" }}
            value={data.altura}
            onChange={(e) => { setData({ altura: e.target.value }); setError(""); }}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-base mb-4" style={{ fontFamily: "var(--font-body)" }}>{error}</p>}

      <div className="mt-auto w-full pt-4 grid grid-cols-2 gap-3">
        <button
          onClick={onBack}
          className="w-full border-[2px] border-copa-blue text-copa-blue text-[24px] py-[16px] rounded-[14px] hover:bg-gray-50 active:scale-[0.98] transition-all"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          VOLTAR
        </button>
        <button
          onClick={handleNext}
          className="w-full bg-copa-blue text-white text-[24px] py-[16px] rounded-[14px] hover:bg-copa-blue/90 active:scale-[0.98] transition-all shadow-md flex justify-center items-center gap-2"
          style={{ fontFamily: "var(--font-titulo)", letterSpacing: "0.05em" }}
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

  const clubeExibir = data.clube === "Outro" ? data.clubeCustom : data.clube;

  return (
    <div className="animate-fadeIn w-full flex flex-col items-center flex-1 min-h-0">
      <div className="text-[40px] mb-1 animate-float-gentle">⚠️</div>
      <h2 className="text-copa-blue text-[32px] sm:text-4xl text-center mb-0 tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>
        CONFIRA SEUS DADOS
      </h2>
      <p className="text-gray-500 text-[14px] text-center mb-2 px-2" style={{ fontFamily: "var(--font-body)" }}>
        A figurinha será gerada em breve. Revise os dados abaixo com atenção.
      </p>
      <p className="text-copa-blue text-[15px] text-center mb-6" style={{ fontFamily: "var(--font-body)" }}>
        Não fazemos alterações após a aprovação e pagamento.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[4px] border-copa-blue overflow-hidden flex-shrink-0 shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {data.fotoPreview && <img src={data.fotoPreview} alt="Rosto" className="w-full h-full object-cover" />}
        </div>
        <p className="text-[13px] text-gray-700 uppercase" style={{ fontFamily: "var(--font-titulo)", maxWidth: "140px", letterSpacing: "0.05em", lineHeight: 1.2 }}>
          VERIFIQUE SE O ROSTO ESTÁ PRÓXIMO
        </p>
      </div>

      <div className="w-full bg-gray-50 rounded-[16px] p-4 mb-6 border border-gray-100">
        <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
          <span className="text-copa-blue text-sm tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>NOME</span>
          <span className="text-gray-800 text-[17px]" style={{ fontFamily: "var(--font-body)" }}>{data.nome}</span>
        </div>
        <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
          <span className="text-copa-blue text-sm tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>PESO</span>
          <span className="text-gray-800 text-[17px]" style={{ fontFamily: "var(--font-body)" }}>{data.peso} kg</span>
        </div>
        <div className="flex justify-between items-center py-2.5 border-b border-gray-200">
          <span className="text-copa-blue text-sm tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>ALTURA</span>
          <span className="text-gray-800 text-[17px]" style={{ fontFamily: "var(--font-body)" }}>{data.altura} cm</span>
        </div>
        <div className="flex justify-between items-center py-2.5">
          <span className="text-copa-blue text-sm tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>CLUBE</span>
          <span className="text-gray-800 text-[17px]" style={{ fontFamily: "var(--font-body)" }}>{clubeExibir}</span>
        </div>
      </div>

      <div className="mt-auto w-full pt-2">
        <button
          onClick={onNext}
          className="w-full bg-copa-blue text-white text-[24px] sm:text-[28px] py-[18px] rounded-[14px] hover:bg-copa-blue/90 active:scale-[0.98] transition-all shadow-xl mb-4"
          style={{ fontFamily: "var(--font-titulo)", letterSpacing: "0.05em" }}
        >
          ENTENDI, GERAR FIGURINHA ⚽
        </button>

        <button
          onClick={onBack}
          className="w-full border-[1.5px] border-gray-300 text-gray-500 text-[20px] py-[14px] rounded-[14px] hover:bg-gray-50 active:scale-[0.98] transition-all"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          CORRIGIR DADOS
        </button>
      </div>
    </div>
  );
}

/* ───── STEP 5: VSL / GERANDO FIGURINHA ───── */
function StepVSLLoading() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push("/checkout"), 500); 
          return 100;
        }
        return next;
      });
    }, 250); 

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="animate-fadeIn w-full flex flex-col items-center pt-2 flex-1 min-h-0">
      <h2 className="text-copa-blue text-[32px] sm:text-4xl text-center mb-0 tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>
        GERANDO SUA FIGURINHA
      </h2>
      <p className="text-gray-700 text-[15px] text-center mb-6" style={{ fontFamily: "var(--font-body)" }}>
        Não saia dessa tela, leva até 2 minutos.
      </p>

      {/* VÍDEO VSL */}
      <div className="w-full max-w-[280px] aspect-[9/16] bg-black rounded-[16px] mb-6 shadow-xl overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src="/video.mp4"
          autoPlay
          playsInline
          controls
        />
      </div>

      <div className="mt-auto w-full flex flex-col items-center pb-2">
        <p className="text-copa-blue text-[20px] text-center mb-0 tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>
          Adquira sua figurinha HOJE e concorra a
        </p>
        <p className="text-green-600 text-[36px] text-center mb-0 tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>
          MIL REAIS
        </p>
        <p className="text-copa-blue text-[14px] text-center mb-6 tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>
          no dia 11/06/2026 início dos jogos.
        </p>

        {/* Progress Footer */}
        <div className="w-full">
          <div className="flex justify-between text-copa-blue text-xs mb-1 tracking-wider" style={{ fontFamily: "var(--font-titulo)" }}>
            <span>{Math.floor((progress / 100) * 120)}s</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div className="h-full bg-copa-blue transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───── FLUXO PRINCIPAL ───── */
function QuizFlow() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const TOTAL = 4;

  const next = () => {
    if (step < 5) setStep(step + 1);
  };
  const back = () => {
    if (step > 1) setStep(step - 1);
    else router.push("/");
  };

  return (
    <main className="flex flex-col min-h-[100dvh] w-full bg-copa-yellow">
      <div className="w-full max-w-md mx-auto flex flex-col flex-1 px-4 pt-3 pb-3">

        {step <= 4 && <ProgressBar step={step} total={TOTAL} />}

        <div className="w-full flex-1 bg-white rounded-[32px] p-5 sm:p-6 shadow-2xl flex flex-col overflow-y-auto">
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

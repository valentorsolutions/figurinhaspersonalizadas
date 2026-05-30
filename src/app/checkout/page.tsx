"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizProvider, useQuiz } from "../context/QuizContext";

const CHECKOUT_LINK = "https://pay.cakto.com.br/figurinha-copa2026"; 

function CheckoutOffer() {
  const { data } = useQuiz();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex flex-col items-center min-h-[100dvh] w-full bg-copa-yellow overflow-x-hidden pt-6 pb-12">
      <div className="w-full max-w-md mx-auto px-5 flex flex-col items-center animate-fadeInUp">

        {/* TÍTULO */}
        <h1 className="text-copa-blue text-[64px] leading-none uppercase tracking-wide mb-1 text-center" style={{ fontFamily: "var(--font-titulo)" }}>
          GOOLL!
        </h1>
        <h2 className="text-copa-blue text-[20px] mb-5 text-center" style={{ fontFamily: "var(--font-body)" }}>
          Sua figurinha está pronta!
        </h2>

        {/* FIGURINHA OFICIAL — DESTAQUE VISUAL */}
        <div className="relative mb-2">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#009c3b] text-white text-[11px] px-3 py-1 rounded-full tracking-widest z-10 whitespace-nowrap shadow-md" style={{ fontFamily: "var(--font-titulo)" }}>
            ✨ ASSIM VAI FICAR A SUA ✨
          </div>
          <div className="relative w-52 sm:w-60 rounded-2xl overflow-hidden shadow-2xl border-[4px] border-copa-blue">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figurinhaoficial.png" alt="Figurinha Oficial Copa 2026" className="w-full h-full object-cover" />
            <div className="absolute inset-0 shine-effect" />
          </div>
        </div>

        <p className="text-copa-blue text-[13px] uppercase tracking-widest mb-5 text-center" style={{ fontFamily: "var(--font-titulo)" }}>
          ↑ exemplo do resultado final
        </p>

        {/* PREVIEW BLOQUEADO COM DADOS DO USUÁRIO */}
        <p className="text-gray-600 text-[13px] mb-2 text-center" style={{ fontFamily: "var(--font-body)" }}>
          Sua figurinha com seus dados (bloqueada):
        </p>
        <div className="relative w-44 sm:w-52 aspect-[2.5/3.5] rounded-xl shadow-xl border-[3px] border-black mb-6 overflow-hidden bg-white flex flex-col">
          <div className="absolute inset-0 bg-[#009c3b] opacity-90" />
          <div className="absolute inset-0 flex flex-col justify-around opacity-15 pointer-events-none rotate-[-20deg] scale-150">
            <span className="text-white font-black text-5xl uppercase tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>PREVIEW</span>
            <span className="text-white font-black text-5xl uppercase tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>PREVIEW</span>
            <span className="text-white font-black text-5xl uppercase tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>PREVIEW</span>
          </div>
          <div className="relative z-10 w-full p-2 flex justify-end">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-80 mt-2 mr-2">
              <span className="text-xl">⚽</span>
            </div>
          </div>
          <div className="relative z-10 flex-1 flex items-center justify-center -mt-6">
            {data.fotoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.fotoPreview} alt="Craque" className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg blur-[2px]" />
            ) : (
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center border-4 border-white/50">
                <span className="text-4xl">⚽</span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="bg-black/60 rounded-2xl px-4 py-3 flex flex-col items-center gap-1">
              <span className="text-2xl">🔒</span>
              <span className="text-white text-[11px] text-center font-bold tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>DESBLOQUEIE{"\n"}POR R$12,90</span>
            </div>
          </div>
          <div className="relative z-10 bg-[#1e3a8a] w-full pt-1.5 pb-2.5 flex flex-col items-center">
            <span className="text-white uppercase text-base tracking-widest leading-none mb-0.5 blur-[3px]" style={{ fontFamily: "var(--font-titulo)" }}>
              {data.nome || "CRAQUE"}
            </span>
            <span className="text-white/90 text-[8px] tracking-widest blur-[2px]" style={{ fontFamily: "var(--font-titulo)" }}>
              {mounted ? new Date().toLocaleDateString('pt-BR') : ""} | {data.altura || "120"} CM | {data.peso || "25"} KG
            </span>
            <span className="text-white text-[10px] uppercase tracking-widest mt-0.5 blur-[2px]" style={{ fontFamily: "var(--font-titulo)" }}>
              {data.clube || "CLUBE"}
            </span>
          </div>
        </div>

        <h3 className="text-[#009c3b] text-[60px] uppercase tracking-wider mb-1 text-center drop-shadow-sm" style={{ fontFamily: "var(--font-titulo)" }}>
          R$12,90
        </h3>
        <p className="text-gray-700 text-[14px] text-center leading-snug px-2 mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Receba o arquivo digital para impressão e participe do sorteio de R$1.000.
        </p>

        {/* BOTÃO COMPRAR */}
        <a
          href={CHECKOUT_LINK}
          className="w-full bg-[#009c3b] text-white text-[24px] py-[18px] rounded-[14px] shadow-xl transition-transform active:scale-95 text-center flex items-center justify-center uppercase tracking-wider mb-2 animate-pulse-glow"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          🏆 QUERO MINHA FIGURINHA
        </a>

        {/* GARANTIA */}
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-[14px] h-[14px] bg-[#009c3b] rounded-sm text-white flex items-center justify-center text-[10px] font-bold">✓</span>
          <span className="text-[#009c3b] text-[12px] uppercase tracking-wide" style={{ fontFamily: "var(--font-titulo)" }}>ACESSO LIBERADO NA HORA</span>
        </div>
        <p className="text-copa-blue text-[13px] mb-5 text-center" style={{ fontFamily: "var(--font-body)" }}>
          É só voltar aqui em <span className="font-bold">Minha Área</span> após o pagamento.
        </p>

        {/* BOTÃO SECUNDÁRIO */}
        <button
          onClick={() => router.push("/")}
          className="w-full bg-transparent border-[1.5px] border-copa-blue text-copa-blue text-[15px] py-[10px] rounded-full active:bg-copa-blue/5 transition-colors text-center flex items-center justify-center gap-2 uppercase tracking-wide mb-8"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          <span className="text-sm">🔄</span> CRIAR OUTRA FIGURINHA
        </button>

        {/* DEPOIMENTOS */}
        <h4 className="text-copa-blue text-[22px] uppercase tracking-wider mb-3 text-center" style={{ fontFamily: "var(--font-titulo)" }}>
          DEPOIMENTO DE CLIENTES:
        </h4>
        <div className="w-full flex flex-col gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/depoimento1.png" alt="Depoimento 1" className="w-full rounded-[16px] shadow-lg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/depoimento2.png" alt="Depoimento 2" className="w-full rounded-[16px] shadow-lg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/depoimento3.png" alt="Depoimento 3" className="w-full rounded-[16px] shadow-lg" />
        </div>

      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <QuizProvider>
      <CheckoutOffer />
    </QuizProvider>
  );
}

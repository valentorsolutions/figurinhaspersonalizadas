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
        
        {/* PREVIEW DA FIGURINHA COM MARCA D'ÁGUA */}
        <div className="relative w-48 sm:w-56 aspect-[2.5/3.5] rounded-xl shadow-2xl border-[3px] border-black mb-6 overflow-hidden bg-white flex flex-col">
          <div className="absolute inset-0 bg-[#009c3b] opacity-90" />
          
          <div className="absolute inset-0 flex flex-col justify-around opacity-15 pointer-events-none rotate-[-20deg] scale-150">
            <span className="text-white font-black text-5xl uppercase tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>PREVIEW</span>
            <span className="text-white font-black text-5xl uppercase tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>PREVIEW</span>
            <span className="text-white font-black text-5xl uppercase tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>PREVIEW</span>
          </div>

          <div className="relative z-10 w-full p-2 flex justify-end">
            {/* Bola placeholder */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-80 mt-2 mr-2">
              <span className="text-2xl">⚽</span>
            </div>
          </div>

          <div className="relative z-10 flex-1 flex items-center justify-center -mt-8">
            {data.fotoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.fotoPreview} alt="Craque" className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg" />
            ) : (
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center border-4 border-white/50">
                <span className="text-5xl">⚽</span>
              </div>
            )}
          </div>

          <div className="relative z-10 bg-[#1e3a8a] w-full pt-1.5 pb-2.5 flex flex-col items-center">
            <span className="text-white uppercase text-lg tracking-widest leading-none mb-0.5" style={{ fontFamily: "var(--font-titulo)" }}>
              {data.nome || "CRAQUE"}
            </span>
            <span className="text-white/90 text-[8px] tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>
              {mounted ? new Date().toLocaleDateString('pt-BR') : ""} | {data.altura || "120"} CM | {data.peso || "25"} KG
            </span>
            <span className="text-white text-[10px] uppercase tracking-widest mt-0.5" style={{ fontFamily: "var(--font-titulo)" }}>
              {data.clube || "CLUBE"}
            </span>
          </div>
        </div>

        {/* TÍTULO E OFERTA */}
        <h1 className="text-copa-blue text-[64px] leading-none uppercase tracking-wide mb-1 text-center" style={{ fontFamily: "var(--font-titulo)" }}>
          GOOLL!
        </h1>
        <h2 className="text-copa-blue text-[22px] mb-3 text-center" style={{ fontFamily: "var(--font-body)" }}>
          Sua figurinha está pronta!
        </h2>
        
        <p className="text-gray-700 text-[15px] text-center leading-snug px-2 mb-2" style={{ fontFamily: "var(--font-body)" }}>
          Receba o arquivo digital para a impressão e participe do sorteio. Leia o regulamento em seu e-mail.
        </p>

        <h3 className="text-[#009c3b] text-[64px] uppercase tracking-wider mb-4 text-center drop-shadow-sm" style={{ fontFamily: "var(--font-titulo)" }}>
          R$12,90
        </h3>

        {/* BOTÃO COMPRAR */}
        <a
          href={CHECKOUT_LINK}
          className="w-full bg-[#1e3a8a] text-white text-[24px] py-[16px] rounded-[14px] shadow-xl transition-transform active:scale-95 text-center flex items-center justify-center uppercase tracking-wider mb-2"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          RECEBER MINHA FIGURINHA
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
        <div className="w-full bg-[#0b141a] rounded-[20px] overflow-hidden p-4 shadow-xl relative border-[4px] border-copa-blue">
          <div className="absolute inset-0 opacity-10 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover mix-blend-overlay" />
          
          <div className="relative z-10 flex flex-col gap-2">
            <div className="bg-[#005c4b] text-white self-end p-2 px-3 rounded-[12px] rounded-tr-sm max-w-[80%] text-[13px] font-sans">
              Certinho? 😂 <span className="text-[9px] text-white/60 ml-2">13:50 ✓✓</span>
            </div>
            
            <div className="bg-[#202c33] text-white self-start p-2 px-3 rounded-[12px] rounded-tl-sm max-w-[80%] text-[13px] font-sans relative">
              sim ficou linda <span className="text-[9px] text-white/60 ml-2">13:50</span>
              <div className="absolute -bottom-2 right-2 bg-[#202c33] border border-gray-700 rounded-full px-1 text-[10px]">❤️</div>
            </div>
            
            <div className="bg-[#202c33] text-white self-start p-2 px-3 rounded-[12px] rounded-tl-sm max-w-[80%] text-[13px] font-sans mt-1">
              obrigada <span className="text-[9px] text-white/60 ml-2">13:51</span>
            </div>
            
            <div className="bg-[#202c33] text-white self-start p-2 px-3 rounded-[12px] rounded-tl-sm max-w-[80%] text-[13px] font-sans">
              ela vai amar <span className="text-[9px] text-white/60 ml-2">13:51</span>
            </div>
            
            <div className="bg-[#005c4b] text-white self-end p-2 px-3 rounded-[12px] rounded-tr-sm max-w-[80%] text-[13px] font-sans mt-2">
              Agradecemos a preferência! 🇧🇷❤️ <span className="text-[9px] text-white/60 ml-2">13:51 ✓✓</span>
            </div>
          </div>
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

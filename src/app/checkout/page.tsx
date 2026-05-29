"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QuizProvider, useQuiz } from "../context/QuizContext";

const CHECKOUT_LINK = "https://pay.cakto.com.br/figurinha-copa2026"; // Substitua depois

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
        <div className="relative w-48 sm:w-56 aspect-[2.5/3.5] rounded-xl shadow-2xl border-4 border-copa-blue mb-6 overflow-hidden bg-white flex flex-col">
          {/* Fundo da carta (ex: verde brasil) */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 opacity-90" />
          
          {/* Marca d'água */}
          <div className="absolute inset-0 flex flex-col justify-around opacity-20 pointer-events-none rotate-[-15deg] scale-150">
            <span className="text-white font-black text-4xl uppercase tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>PREVIEW</span>
            <span className="text-white font-black text-4xl uppercase tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>PREVIEW</span>
            <span className="text-white font-black text-4xl uppercase tracking-widest" style={{ fontFamily: "var(--font-titulo)" }}>PREVIEW</span>
          </div>

          {/* Topo carta */}
          <div className="relative z-10 w-full p-2 flex justify-end">
            <span className="text-white font-bold text-4xl" style={{ fontFamily: "var(--font-titulo)" }}>26</span>
          </div>

          {/* Rosto do Craque */}
          <div className="relative z-10 flex-1 flex items-center justify-center -mt-4">
            {data.fotoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.fotoPreview} alt="Craque" className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-full border-4 border-white shadow-lg" />
            ) : (
              <div className="text-6xl">⚽</div>
            )}
          </div>

          {/* Faixa inferior */}
          <div className="relative z-10 bg-copa-blue w-full pt-1 pb-2 flex flex-col items-center">
            <span className="text-white uppercase text-lg sm:text-xl tracking-wider leading-none" style={{ fontFamily: "var(--font-titulo)" }}>
              {data.nome || "CRAQUE"}
            </span>
            <span className="text-white/80 text-[8px] sm:text-[10px] tracking-wider mt-1" style={{ fontFamily: "var(--font-titulo)" }}>
              {mounted ? new Date().toLocaleDateString('pt-BR') : ""} | {data.altura || "120"} cm | {data.peso || "25"} kg
            </span>
            <span className="text-white text-[10px] sm:text-xs mt-1 uppercase" style={{ fontFamily: "var(--font-titulo)" }}>
              {data.clube || "CLUBE"}
            </span>
          </div>
        </div>

        {/* TÍTULO E OFERTA */}
        <h1 className="text-copa-blue text-6xl sm:text-7xl uppercase tracking-widest mb-1 text-center" style={{ fontFamily: "var(--font-titulo)" }}>
          GOOLL!
        </h1>
        <h2 className="text-copa-blue text-xl sm:text-2xl font-bold mb-4 text-center" style={{ fontFamily: "var(--font-body)" }}>
          Sua figurinha está pronta!
        </h2>
        
        <p className="text-[#333] text-sm sm:text-base text-center leading-relaxed font-bold px-4 mb-4" style={{ fontFamily: "var(--font-body)" }}>
          Receba o arquivo digital para a impressão e participe do sorteio. Leia o regulamento em seu e-mail.
        </p>

        <h3 className="text-green-600 text-6xl sm:text-7xl uppercase tracking-wider mb-6 text-center drop-shadow-sm" style={{ fontFamily: "var(--font-titulo)" }}>
          R$12,90
        </h3>

        {/* BOTÃO COMPRAR */}
        <a
          href={CHECKOUT_LINK}
          className="w-full bg-copa-blue text-white text-xl sm:text-2xl py-5 rounded-2xl shadow-xl transition-transform hover:scale-[1.02] active:scale-95 text-center flex items-center justify-center uppercase tracking-wide mb-3"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          RECEBER MINHA FIGURINHA
        </a>

        {/* GARANTIA */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-4 bg-green-500 rounded text-white flex items-center justify-center text-xs font-bold">✓</span>
          <span className="text-green-600 text-xs sm:text-sm uppercase font-black" style={{ fontFamily: "var(--font-titulo)" }}>ACESSO LIBERADO NA HORA</span>
        </div>
        <p className="text-copa-blue text-xs sm:text-sm font-bold mb-6 text-center" style={{ fontFamily: "var(--font-body)" }}>
          É só voltar aqui em <span className="font-black">Minha Área</span> após o pagamento.
        </p>

        {/* BOTÃO SECUNDÁRIO */}
        <button
          onClick={() => router.push("/")}
          className="w-full bg-transparent border-2 border-copa-blue text-copa-blue text-sm sm:text-base py-3 rounded-2xl hover:bg-copa-blue hover:text-white transition-colors text-center flex items-center justify-center gap-2 uppercase font-black mb-10"
          style={{ fontFamily: "var(--font-titulo)" }}
        >
          <span>🔄</span> CRIAR OUTRA FIGURINHA
        </button>

        {/* DEPOIMENTOS */}
        <h4 className="text-copa-blue text-xl sm:text-2xl uppercase tracking-widest mb-4 text-center" style={{ fontFamily: "var(--font-titulo)" }}>
          DEPOIMENTO DE CLIENTES:
        </h4>
        <div className="w-full bg-[#0b141a] rounded-3xl overflow-hidden p-4 shadow-2xl relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')] bg-cover mix-blend-overlay" />
          
          <div className="relative z-10 flex flex-col gap-3">
            <div className="bg-[#005c4b] text-white self-end p-2 px-3 rounded-xl rounded-tr-none max-w-[80%] text-sm">
              Certinho? 😂 <span className="text-[10px] text-white/60 ml-2">13:50 ✓✓</span>
            </div>
            
            <div className="bg-[#202c33] text-white self-start p-2 px-3 rounded-xl rounded-tl-none max-w-[80%] text-sm">
              sim ficou linda <span className="text-[10px] text-white/60 ml-2">13:50</span>
              <div className="absolute -bottom-2 right-2 bg-[#202c33] border border-gray-700 rounded-full px-1 text-xs">❤️</div>
            </div>
            
            <div className="bg-[#202c33] text-white self-start p-2 px-3 rounded-xl rounded-tl-none max-w-[80%] text-sm mt-1">
              obrigada <span className="text-[10px] text-white/60 ml-2">13:51</span>
            </div>
            
            <div className="bg-[#202c33] text-white self-start p-2 px-3 rounded-xl rounded-tl-none max-w-[80%] text-sm">
              ela vai amar <span className="text-[10px] text-white/60 ml-2">13:51</span>
            </div>
            
            <div className="bg-[#005c4b] text-white self-end p-2 px-3 rounded-xl rounded-tr-none max-w-[80%] text-sm mt-2">
              Agradecemos a preferência! 🇧🇷❤️ <span className="text-[10px] text-white/60 ml-2">13:51 ✓✓</span>
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

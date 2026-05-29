"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface QuizData {
  nome: string;
  time: string;
  posicao: string;
  numero: string;
  foto?: File;
  fotoPreview?: string; // base64 data URL para exibição
}

interface QuizContextType {
  data: QuizData;
  setData: (data: Partial<QuizData>) => void;
  pacote: number;
  setPacote: (p: number) => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<QuizData>({
    nome: "",
    time: "",
    posicao: "",
    numero: "",
    foto: undefined,
    fotoPreview: undefined,
  });
  const [pacote, setPacote] = useState(1);

  const setData = (partial: Partial<QuizData>) => {
    setDataState((prev) => ({ ...prev, ...partial }));
  };

  return (
    <QuizContext.Provider value={{ data, setData, pacote, setPacote }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside QuizProvider");
  return ctx;
}

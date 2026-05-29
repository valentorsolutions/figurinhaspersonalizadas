"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface QuizData {
  nome: string;
  time: string;
  posicao: string;
  numero: string;
  foto?: string; // base64
}

interface QuizContextType {
  data: QuizData;
  setData: (data: Partial<QuizData>) => void;
  step: number;
  setStep: (step: number) => void;
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
  });
  const [step, setStep] = useState(0);
  const [pacote, setPacote] = useState(1);

  const setData = (partial: Partial<QuizData>) => {
    setDataState((prev) => ({ ...prev, ...partial }));
  };

  return (
    <QuizContext.Provider value={{ data, setData, step, setStep, pacote, setPacote }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside QuizProvider");
  return ctx;
}

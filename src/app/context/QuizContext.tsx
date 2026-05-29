"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface QuizData {
  nome: string;
  foto?: File;
  fotoPreview?: string;
  nascimento_dia: string;
  nascimento_mes: string;
  nascimento_ano: string;
  email: string;
  clube: string;
  peso: string;
  altura: string;
}

interface QuizContextType {
  data: QuizData;
  setData: (data: Partial<QuizData>) => void;
}

const QuizContext = createContext<QuizContextType | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<QuizData>({
    nome: "",
    foto: undefined,
    fotoPreview: undefined,
    nascimento_dia: "",
    nascimento_mes: "",
    nascimento_ano: "",
    email: "",
    clube: "",
    peso: "",
    altura: "",
  });

  const setData = (partial: Partial<QuizData>) => {
    setDataState((prev) => ({ ...prev, ...partial }));
  };

  return (
    <QuizContext.Provider value={{ data, setData }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside QuizProvider");
  return ctx;
}

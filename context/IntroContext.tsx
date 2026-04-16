"use client";

import { createContext, useContext, useState } from "react";

type IntroContextType = {
  introDone: boolean;
  setIntroDone: (v: boolean) => void;
};

const IntroContext = createContext<IntroContextType>({
  introDone: false,
  setIntroDone: () => {},
});

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);
  return (
    <IntroContext.Provider value={{ introDone, setIntroDone }}>
      {children}
    </IntroContext.Provider>
  );
}

export const useIntro = () => useContext(IntroContext);

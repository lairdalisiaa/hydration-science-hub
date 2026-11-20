import { createContext, useContext, useState, type ReactNode } from "react";

type MarketCtx = { city: string; setCity: (c: string) => void };

const MarketContext = createContext<MarketCtx>({ city: "New York", setCity: () => {} });

export function MarketProvider({ children }: { children: ReactNode }) {
  const [city, setCity] = useState("New York");
  return <MarketContext.Provider value={{ city, setCity }}>{children}</MarketContext.Provider>;
}

export const useMarket = () => useContext(MarketContext);

import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [dockPosition, setDockPosition] = useLocalStorage("studynest.dockPosition", "left");

  return (
    <SettingsContext.Provider value={{ dockPosition, setDockPosition }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}

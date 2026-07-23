import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

function DashboardProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DashboardContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DashboardContext.Provider>
  );
}

function useDash() {
  const context = useContext(DashboardContext);
  if (context === undefined)
    throw new Error("DashContext was used outside DashboardProvider");
  return context;
}

export { DashboardProvider, useDash };

import { createContext, useContext } from "react";
import { AppContextType } from "../types";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used with in AppContextProvider");
  }
  return context;
};

import { ReactNode, useState } from "react";
import { AppContextType } from "../types";
import { AppContext } from "./appContext";
import { useNavigate } from "react-router-dom";

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<string | null>("null");
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);

  const value: AppContextType = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    navigate,
    showUserLogin,
    setShowUserLogin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

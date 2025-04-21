import { ReactNode, useState } from "react";
import { AppContextType, Product } from "../types";
import { AppContext } from "./appContext";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<string | null>(null);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [searchQuery, setSearchQuery] = useState<string | null>("o");
  const value: AppContextType = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    navigate,
    showUserLogin,
    setShowUserLogin,
    products,
    setProducts,
    searchQuery,
    setSearchQuery,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

import { NavigateFunction } from "react-router-dom";

export interface AppContextType {
  navigate: NavigateFunction;
  user: string | null;
  setUser: (user: string | null) => void;
  isSeller: boolean;
  setIsSeller: (isSeller: boolean) => void;
  showUserLogin: boolean;
  setShowUserLogin: (showUserLogin: boolean) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  searchQuery: string | null;
  setSearchQuery: (user: string | null) => void;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  offerPrice: number;
  image: string[];
  description: string[];
  createdAt: string;
  updatedAt: string;
  inStock: boolean;
}

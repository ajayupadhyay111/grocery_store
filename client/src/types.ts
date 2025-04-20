import { NavigateFunction } from "react-router-dom";

export interface AppContextType {
  navigate:NavigateFunction;
  user: string | null;
  setUser: (user:string | null)=>void;
  isSeller:boolean;
  setIsSeller:(isSeller:boolean)=>void;
  showUserLogin:boolean;
  setShowUserLogin:(showUserLogin:boolean)=>void;
}

export interface Product {
  name: string;
  category: string;
  price: number;
  offerPrice: number;
  rating: number;
  image: string;
}
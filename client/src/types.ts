import { NavigateFunction } from "react-router-dom";

export interface AppContextType {
  navigate: NavigateFunction;
  user: string | null;
  setUser: (user: string | null) => void;
  isSeller: boolean;
  setIsSeller: (isSeller: boolean) => void;
  showUserLogin: boolean;
  setShowUserLogin: (showUserLogin: boolean) => void;
  products: Product[] | undefined;
  setProducts: (products: Product[]) => void;
  searchQuery: string | null;
  setSearchQuery: (user: string | null) => void;
  cartItems: { [key: string]: number };
  setCartItems: (cartItems: { [key: string]: number }) => void;
  addProductToCart: (itemId: string) => void;
  updateCartProduct: (itemId: string, quantity: number) => void;
  removeCartProduct: (itemId: string) => void;
  getCartProductsCount: () => number;
  getCartProductsTotalAmount: () => number;
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
  quantity?:number
}

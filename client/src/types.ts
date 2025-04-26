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
  quantity?: number;
}

export interface AddressForm {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  _id: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  address: AddressForm;
  status: string; // Example: "Order Placed", "Shipped", etc.
  paymentType: string; // Example: "COD", "Online"
  isPaid: boolean;
  createdAt: string; // ISO string date
  updatedAt: string; // ISO string date
}

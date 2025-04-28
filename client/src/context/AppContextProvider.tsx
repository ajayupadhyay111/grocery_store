import { ReactNode, useEffect, useState } from "react";
import { AppContextType, Product } from "../types";
import { AppContext } from "./appContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../utils/axios";

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<string | null>(null);
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const [showUserLogin, setShowUserLogin] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>();
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

  const fetchProducts = async () => {
    try {
      const response = await API.get("/product/product-list");
      if (response.data.success) setProducts(response.data.products);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await API.put("/cart/update-cart",{cartItems});
        if (!data.success) {
          toast.error(data.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    if(user){
      updateCart();
    }
  }, [cartItems]);

  const addProductToCart = (itemId: string) => {
    if(!user){
      toast.error("login first")
      return;
    }
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
      toast.success("Product updated in cart");
    } else {
      cartData[itemId] = 1;
      toast.success("Product added in cart");
    }
    setCartItems(cartData);
  };
  const updateCartProduct = (itemId: string, quantity: number) => {
    const cartData = structuredClone(cartItems);
    console.log(quantity);
    if (cartData[itemId]) {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
    toast.success("Cart product updated");
  };
  const removeCartProduct = (itemId: string) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] !== 0) {
        toast.success("Product updated from cart");
      }
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
        toast.success("Product deleted from cart");
      }
    }
    setCartItems(cartData);
  };

  const getCartProductsCount = () => {
    let totalCartProduct = 0;
    for (const item in cartItems) {
      totalCartProduct += cartItems[item];
    }
    return totalCartProduct;
  };

  const getCartProductsTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      const product = products?.find((value) => value._id === item);
      if (cartItems[item] > 0 && product) {
        totalAmount += product.offerPrice * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchSeller = async () => {
    try {
      const { data } = await API.get("/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else setIsSeller(false);
    } catch (error) {
      console.log(error);
      setIsSeller(false);
    }
  };
  const fetchUser = async () => {
    try {
      const { data } = await API.get("/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

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
    cartItems,
    setCartItems,
    addProductToCart,
    updateCartProduct,
    removeCartProduct,
    getCartProductsCount,
    getCartProductsTotalAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

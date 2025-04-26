import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Product } from "../types";
import { assets, dummyAddress } from "../assets/assets";

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [addresses, setAddresses] = useState(dummyAddress);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const {
    products,
    navigate,
    getCartProductsCount,
    cartItems,
    getCartProductsTotalAmount,
    updateCartProduct,
    removeCartProduct,
  } = useAppContext();
  useEffect(() => {
    const cartProd: Product[] = [];
    for (const item in cartItems) {
      const foundProduct = products?.find((product) => product._id === item);
      if (foundProduct) {
        foundProduct.quantity = cartItems[item];
        cartProd.push(foundProduct);
      }
    }
    console.log(cartProd);
    setCartProducts(cartProd);
  }, [cartItems, products, updateCartProduct]);

  const calculateTax = () => {
    return (getCartProductsTotalAmount() * 2) / 100;
  };
  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">{getCartProductsCount()}</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartProducts.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() =>
                  navigate(
                    `/product/${product.category.toLowerCase()}/${product._id}`
                  )
                }
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{"N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none"
                      value={cartItems[product._id]}
                      onChange={(e) => {
                        updateCartProduct(product._id, Number(e.target.value));
                      }}
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              ${product.offerPrice * cartItems[product._id]}
            </p>
            <button
              onClick={() => removeCartProduct(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="trash"
                className="inline-block size-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => navigate("/products")}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <svg
            width="15"
            height="11"
            viewBox="0 0 15 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
              stroke="#615fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {addresses.map((address) => (
                  <p
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {address.street},{address.state},{address.city},
                    {address.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary-dull/10"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>${getCartProductsTotalAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${calculateTax()}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>${getCartProductsTotalAmount() + calculateTax()}</span>
          </p>
        </div>

        <button className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
          {paymentOption === "COD" ? "Place Order" : "Proceed to checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;

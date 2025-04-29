import { useEffect, useState } from "react";
import { Order } from "../types";
import API from "../utils/axios";
import toast from "react-hot-toast";

const Orders = () => {
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const fetchMyOrders = async () => {
    try {
      const { data } = await API.get("/order/user");
      if (!data.success) {
        toast.error(data.messaeg);
      }
      setMyOrders(data.orders);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    fetchMyOrders();
  }, []);
  return (
    <div className="mt-16 mb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full "></div>
      </div>
      {myOrders.map((order) => (
        <div
          key={order._id}
          className=" border border-gray-300 rounded-lg mb-10 p-4 py-5 max-x-4xl"
        >
          <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span>Order: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: ₹{order.amount}</span>
          </p>
          {order.items.map((item) => (
            <div className="flex justify-between" key={item._id}>
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <img src={item.product.image[0]} alt="" className="size-16" />
                </div>
                <div className="ml-4">
                  <h2>{item.product.name}</h2>
                  <p className="text-gray-500">
                    Category: {item.product.category}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0 text-gray-500">
                <p>Quantity: {item.quantity || "1"}</p>
                <p>Status: {order.status || "1"}</p>
                <p>
                  Date: {new Date(order.createdAt).toLocaleDateString() || "1"}
                </p>
              </div>
              <p className="text-primary text-lg font-medium">
                Amount :₹{item.product.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;

import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (products) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery || "")
        )
      );
    }
  }, [products, searchQuery]);
  return (
    <div className="mt-16 flex flex-col">
      <div className=" flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          : "No products"}
      </div>
    </div>
  );
};

export default AllProducts;

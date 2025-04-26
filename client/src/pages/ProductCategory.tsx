    import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/appContext";
const ProductCategory = () => {
  const { category } = useParams();
  const { products } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  useEffect(() => {
    setFilteredProducts(
      (products ?? []).filter((product) =>
        product.category.toLowerCase().includes(category || "")
      )
    );
  }, []);
  return (
    <div>
     <div className=" flex flex-col items-end w-max mt-10">
        <p className="text-2xl font-medium uppercase">{category}</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;

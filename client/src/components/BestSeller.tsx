import { dummyProducts } from "../assets/assets";
import { useAppContext } from "../context/appContext";
import ProductCard from "./ProductCard";

const BestSeller = () => {
  const {products} = useAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-semibold">Best Sellers</p>
      <div className=" mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products && products.map(
          (item, idx) => idx < 5 && <ProductCard key={idx} product={item} />
        )}
      </div>
    </div>
  );
};

export default BestSeller;

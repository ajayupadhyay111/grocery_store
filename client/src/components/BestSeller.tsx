import ProductCard from "./ProductCard"

const BestSeller = () => {
  return (
    <div className="mt-16">
        <p className="text-2xl md:text-3xl font-semibold">Best Sellers</p>
        <div className="mt-5">
            <ProductCard/>
        </div>
    </div>
  )
}

export default BestSeller
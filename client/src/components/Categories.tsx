import { categories } from "../assets/assets";
import { useAppContext } from "../context/appContext";

const Categories = () => {
  const { navigate } = useAppContext();
  return (
    <div className="mt-7">
      <h1 className="text-3xl font-semibold mb-3">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 lg:grid-cols-7">
        {categories.map((category, idx) => {
          return (
            <div
              key={idx}
              className="group min-w-32 py-3 gap-1 flex items-center flex-col justify-center rounded"
              style={{ backgroundColor: `${category.bgColor}` }}
              onClick={() => {
                navigate(`/products/${category.path.toLowerCase()}`);
                window.scrollTo(0,0)
              }}
            >
              <img
                src={category.image }
                alt={category.path}
                className="size-20 group-hover:scale-110  transition"
              />
              <span className="text-sm">{category.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;

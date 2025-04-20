import BestSeller from "../components/BestSeller"
import Categories from "../components/Categories"
import HeroComponent from "../components/HeroComponent"

const Home = () => {
  return (
    <div className="mt-10">
        <HeroComponent/>
        <Categories/>
        <BestSeller/>
    </div>
  )
}

export default Home
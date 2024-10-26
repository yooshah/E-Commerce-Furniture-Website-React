import HeroSlider from "./HeroSlider";
import ProductCard from "../../../pages/userPages/Product/ProductCard";
import { ProductContext } from "../../../Provider/ProductContext";
import { useContext } from "react";

function HomeDash() {
  const { filterItems } = useContext(ProductContext);
  return (
    <>
      {filterItems.length > 0 || <HeroSlider />}
      <ProductCard />
    </>
  );
}

export default HomeDash;

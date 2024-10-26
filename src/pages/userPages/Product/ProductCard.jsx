import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ProductList from "./ProductList";
import { ProductContext } from "../../../Provider/ProductContext";
import "./Product.css";
import ProductModal from "./ProductModal";

function ProductCard() {
  const { filterItems } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [itemToggle, setItemToggle] = useState(false);
  const [showItem, setShowItem] = useState([]);
  const [previewProduct, setPreviewProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        // Store the response data in the products state
        setProducts(response.data);
        setShowItem(response.data.slice(0, 12));
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
      });
  }, []);

  const handleToggle = () => {
    setItemToggle(!itemToggle);

    if (itemToggle) {
      setShowItem(products.slice(0, 12)); // Show less
    } else {
      setShowItem(products.slice(0, 20)); // Show 20
    }
  };

  const onProductClick = (furItem) => {
    setPreviewProduct(furItem);
  };
  const closeToggle = () => {
    setPreviewProduct(null);
  };

  return (
    <>
      <div className="container">
        <div>
          <h2>Shop All Things Home</h2>
          {filterItems.length == 0 ? (
            <div className="ProductList-container">
              {showItem.map((item, ind) => (
                <ProductList
                  items={item}
                  key={ind}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          ) : (
            <div className="ProductList-container">
              {filterItems.map((item, ind) => (
                <ProductList
                  items={item}
                  key={ind}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          )}
          {filterItems.length == 0 && (
            <div onClick={handleToggle} className="show-items">
              {itemToggle ? "See less" : "See more"}
            </div>
          )}
        </div>
      </div>
      <ProductModal previewProduct={previewProduct} closeToggle={closeToggle} />
    </>
  );
}

export default ProductCard;

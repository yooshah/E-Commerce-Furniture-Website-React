import { useState, useEffect } from "react";
import ProductList from "./ProductList";
import "./Product.css";
import ProductModal from "./ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/productSlice";

function ProductCard() {
  const [previewProduct, setPreviewProduct] = useState(null);

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProducts()).unwrap();
  }, [dispatch]);

  console.log(products);

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
          {products && products.length > 0 ? (
            <div className="ProductList-container">
              {products.map((item) => (
                <ProductList
                  className="show-items"
                  key={item.productId}
                  items={item}
                  onProductClick={onProductClick}
                />
              ))}
            </div>
          ) : (
            <p>No products found for this category</p>
          )}
        </div>
      </div>

      <ProductModal previewProduct={previewProduct} closeToggle={closeToggle} />
    </>
  );
}

export default ProductCard;

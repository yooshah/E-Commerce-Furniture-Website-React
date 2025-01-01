import { ProductContext } from "../../../Provider/ProductContext";
import { useContext, useEffect, useState } from "react";

import "./SearchBar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchSearchProduct,
} from "../../../features/productSlice";

function SearchBar() {
  const { products, setFilterItems } = useContext(ProductContext);

  const [formData, setFormData] = useState("");
  const [debounceSearch, setDebounceSearch] = useState(formData);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const searchProducts = useSelector((state) => state.product.products);
  console.log(searchProducts);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(formData);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData]);

  useEffect(() => {
    if (debounceSearch) {
      dispatch(fetchSearchProduct(formData));
    }
  }, [dispatch, debounceSearch]);

  const handleChange = (e) => {
    setFormData(e.target.value);
    setDropdownOpen(true);
  };

  // const handleChange = (e) => {
  //   setFormData(e.target.value);
  //   setDropdownOpen(true);
  //   setFilterItems(filteredProducts);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDropdownOpen(false);
    setFilterItems(filteredProducts);
    setFormData("");
  };

  const handleClick = (id) => {
    // const clickItem = products.find((val) => val.id == id);
    // setFilterItems([clickItem]);
    // setFormData("");
    console.log(id);

    dispatch(fetchProductById(id));
    setFormData("");
  };
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(formData.toLowerCase())
  );

  return (
    <div className="search-container" style={{ position: "relative" }}>
      <form className="d-flex ms-3 ps-3" onSubmit={handleSubmit}>
        <input
          // className="nav-search-bar me-2"
          className="form-control input-text"
          type="search"
          placeholder="Search furniture..."
          aria-label="Search"
          onChange={handleChange}
          value={formData}
          onBlur={() => setDropdownOpen(false)}
        />
      </form>
      {isDropdownOpen && formData && (
        <ul className="dropdown">
          {searchProducts.map((product) => (
            <div
              key={product.productId}
              className="text-start"
              onMouseDown={() => handleClick(product.productId)}
            >
              {product.name}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;

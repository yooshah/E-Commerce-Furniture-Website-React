import { ProductContext } from "../../../Provider/ProductContext";
import { useContext, useState } from "react";

import "./SearchBar.css";

function SearchBar() {
  const { products, setFilterItems } = useContext(ProductContext);

  const [formData, setFormData] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    setFormData(e.target.value);
    setDropdownOpen(true);
    setFilterItems(filteredProducts);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDropdownOpen(false);
    setFilterItems(filteredProducts);
    setFormData("");
  };

  const handleClick = (id) => {
    const clickItem = products.find((val) => val.id == id);
    setFilterItems([clickItem]);
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
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="text-start"
              onMouseDown={() => handleClick(product.id)}
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

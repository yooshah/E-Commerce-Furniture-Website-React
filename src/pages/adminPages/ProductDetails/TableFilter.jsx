import { useState } from "react";
import { Button } from "reactstrap";

import "./AdminProducts.css";

const initialValue = {
  category: "All",
  rating: "All",
};
/* eslint-disable react/prop-types */
function TableFilter({ filterProduct }) {
  const [filterData, setFilterData] = useState(initialValue);

  //   const allProoduct = {};

  const handleFilter = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
  };

  const hanldleFilterProduct = () => {
    filterProduct(filterData);
  };

  const handleReset = () => {
    setFilterData(initialValue);
    filterProduct(initialValue);
  };

  return (
    <>
      <div className="d-flex justify-content-evenly align-items-center">
        <div>
          <h5>Filter</h5>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <label>Category</label>
            <select
              className="form-select form-select-lg mb-3"
              aria-label="Default select example"
              value={filterData.category}
              name="category"
              onChange={handleFilter}
            >
              <option value="All">All</option>
              <option value="Sofas">Sofas</option>
              <option value="Dining">Dining</option>
              <option value="Living">Living</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Office">Office</option>
              <option value="New Arrivals">New Arrivals</option>
            </select>
          </div>

          <div>
            <label> Rating</label>
            <select
              className="form-select form-select-lg mb-3"
              value={filterData.rating}
              name="rating"
              onChange={handleFilter}
            >
              <option value="All">All</option>
              <option value="5">5 </option>
              <option value="4">4 </option>
              <option value="3">3 </option>
              <option value="2">2 </option>
              <option value="1">1</option>
            </select>
          </div>
        </div>
        <Button onClick={hanldleFilterProduct}>Filter</Button>
        <Button color="warning" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </>
  );
}

export default TableFilter;

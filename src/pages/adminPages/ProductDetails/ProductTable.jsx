import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import TableFilter from "./TableFilter";
import "./AdminProducts.css";

/* eslint-disable react/prop-types */
function ProductTable({ products, handleEdit, handleAddProduct, onDelete }) {
  const [tableProduct, setTableProduct] = useState(products);

  useEffect(() => {
    setTableProduct(products);
  }, [products]);

  const filterTableProduct = (data) => {
    let filter = products;
    if (data.category == "All" && data.rating == "All") {
      console.log(tableProduct);
    } else if (data.category !== "All" && data.rating == "All") {
      filter = products.filter((val) => val.category == data.category);
    } else if (data.category == "All" && data.rating !== "All") {
      filter = products.filter((val) => val.rating == data.rating);
    } else {
      filter = products
        .filter((val) => val.category == data.category)
        .filter((val) => val.rating == data.rating);
    }
    setTableProduct(filter);
  };
  return (
    <>
      <div>
        <TableFilter filterProduct={filterTableProduct} />
      </div>
      <h3 className="py-5">Product Details</h3>
      <Button color="success" onClick={handleAddProduct}>
        Add New Product
      </Button>
      <div className="product-table">
        <table className="table table-ligth ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product Name</th>
              <th scope="col">image</th>
              <th scope="col">Brand</th>
              <th scope="col">price</th>
              <th scope="col">Rating</th>
              <th scope="col">Edit🖋️</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tableProduct.map((item, ind) => (
              <tr key={ind}>
                <th scope="row">{ind + 1}</th>
                <td>{item.name}</td>
                <td className="img-header">
                  <div className="d-flex justify-content-center align-items-cemter">
                    <div className="table-images ">
                      <img src={item.image} alt="image" />
                    </div>
                  </div>
                </td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.rating}</td>
                <td>
                  {" "}
                  <span
                    className="text-primary eddit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    Edit🖋️
                  </span>{" "}
                </td>
                <td>
                  {" "}
                  <Button color="danger" onClick={() => onDelete(item)}>
                    delete{" "}
                    <img
                      src="src\pages\adminPages\ProductDetails\adminProductassets\delete.svg"
                      alt="delete"
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductTable;

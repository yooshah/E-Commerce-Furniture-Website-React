// import { ProductContext } from "../../../Provider/ProductContext";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import "./Product.css";
import { AddToCart } from "../../../features/cartSlice";
import { logout } from "../../../features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
function ProductList({ items, onProductClick }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const { addToCart } = useContext(CartContext);
  // const { user, setInitialCartItems, initialCartItems } =
  //   useContext(ProductContext);
  // const navigate = useNavigate();

  // const handleAddToCart = async (id) => {
  //   const existingItem = initialCartItems.find((item) => item.productId == id);

  //   if (!user) {
  //     navigate("/login");
  //   } else if (existingItem) {
  //     const updateditem = {
  //       ...existingItem,
  //       quantity: existingItem.quantity + 1,
  //     };

  //     try {
  //       const response = await axios.put(
  //         `http://localhost:5000/cart/${existingItem.id}`,
  //         updateditem
  //       );
  //       const increCartitem = initialCartItems.map((val) => {
  //         if (val.id !== existingItem.id) {
  //           return val;
  //         } else {
  //           return updateditem;
  //         }
  //       });
  //       setInitialCartItems(increCartitem);

  //       console.log(response);
  //     } catch (error) {
  //       console.error("Add quantity error: ", error);
  //     }
  //   } else {
  //     try {
  //       const response = await axios.post("http://localhost:5000/cart", {
  //         userId: user.userId,
  //         productId: items.id,
  //         quantity: 1,
  //         item: items,
  //       });

  //       const carrtList = [
  //         ...initialCartItems,
  //         {
  //           id: response.data.id,
  //           userId: user.userId,
  //           productId: items.id,
  //           quantity: 1,
  //           item: items,
  //         },
  //       ];
  //       setInitialCartItems(carrtList);
  //     } catch (err) {
  //       console.error("Add To Cart Error: ", err.message);
  //     }
  //   }
  // };

  const handleAddToCart = async (id) => {
    try {
      const response = await dispatch(AddToCart(id)).unwrap();
      console.log(response);
      toast.success(response.message);
    } catch (error) {
      if (error.status == 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  return (
    <div className="productList">
      <div className="carrd">
        <img
          src={items.image}
          className="card-img h-100 carrd-img"
          onClick={() => onProductClick(items)}
        />
        <div className="card-body">
          <h5 className="card-title text-center text-warning">
            <span
              className="text-success carrd-text"
              onClick={() => onProductClick(items)}
            >
              {items.name}
            </span>
          </h5>

          <h6>{items.price} $</h6>

          <div className="d-flex flex-column ">
            <div>
              <button type="button" className="btn btn-outline-success m-1">
                Buy
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => handleAddToCart(items.productId)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;

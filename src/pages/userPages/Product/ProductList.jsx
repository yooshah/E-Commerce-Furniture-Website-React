// import { ProductContext } from "../../../Provider/ProductContext";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import "./Product.css";
import { AddToCart } from "../../../features/cartSlice";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddToWishList } from "../../../features/wishSlice";

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

  const handleAddToWish = (id) => {
    console.log(id);

    dispatch(AddToWishList(id));
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

          <div className="d-flex flex-column  ">
            <div>
              {/* <button type="button" className="btn btn-outline-success m-1"> */}
              {/* </button> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                className="icon me-3"
                onClick={() => handleAddToWish(items.productId)}
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
              </svg>

              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() => handleAddToCart(items.productId, {})}
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

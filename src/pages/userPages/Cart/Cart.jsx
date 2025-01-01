// import { useContext, useEffect } from "react";
// import { ProductContext } from "../../../Provider/ProductContext";
import { DeleteCartItem } from "../../../features/cartSlice";

import CartList from "./CartList";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const dispatch = useDispatch();
  const removeCartItem = (id) => {
    console.log(id);
    dispatch(DeleteCartItem(id));
  };
  //   const { initialCartItems, user } = useContext(ProductContext);
  // const { initialCartItems, setInitialCartItems, setAmount, amount } =
  //   useContext(ProductContext);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const totalAmount = Math.floor(
  //     initialCartItems.reduce(
  //       (acc, val) => acc + val.item.price * val.quantity,
  //       0
  //     )
  //   );
  //   setAmount(totalAmount);
  // }, [initialCartItems, setAmount]);

  // console.log(initialCartItems);
  // const handleRemove = async (id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:5000/cart/${id}`);

  //     console.log(response);

  //     // Update the local state to remove the item
  //     setInitialCartItems((prevItems) =>
  //       prevItems.filter((item) => item.id !== id)
  //     );
  //   } catch (error) {
  //     console.error("Error removing item from cart:", error);
  //   }
  // };

  const { cart } = useSelector((state) => state.cart);
  // const cartNumber = cart.length;
  console.log(cart);
  return (
    // <div className="container">
    //   {cartNumber > 0 ? (
    //     <div>
    //       <h2 className="my-4 text-success">Your Cart</h2>
    //       <div className="row justify-content-center">
    //         {cart.map((item, ind) => (
    //           <div className="col-md-4 mx-4" key={ind}>
    //             <CartList
    //               item={item}
    //               //  handleRemove={handleRemove}
    //             />
    //           </div>
    //         ))}
    //       </div>
    //       <div>
    //         {" "}
    //         {/* <h4>
    //           total Amount : <span className="text-success "> {amount}</span>
    //         </h4>{" "}
    //         <button className="btn-success" onClick={() => navigate("/order")}>
    //           Payment
    //         </button> */}
    //       </div>
    //     </div>
    //   ) : (
    //     <div className=" cart-container">
    //       <h2 className="my-4 text-success">Your Cart is empty</h2>
    //     </div>
    //   )}
    // </div>
    <>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="cartModalLabel">
              Your Cart
            </h5>
            {/* <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button> */}
          </div>

          <div className="modal-body">
            <div className="p-4 overflow-x-auto">
              <table className="table table-bordered table-striped text-center">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <CartList
                      key={item.cartItemId}
                      item={item}
                      removeCart={removeCartItem}
                      // decrementQuantity={decrementQuantity}
                      // incrementQuantity={incrementQuantity}
                      // removeCart={removeCart}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

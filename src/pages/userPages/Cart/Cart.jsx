import { ToastContainer, toast } from "react-toastify";
import {
  DecreaseQuantity,
  DeleteCartItem,
  fetchUserCart,
  IncreseQuatinty,
} from "../../../features/cartSlice";

import CartList from "./CartList";
import { useDispatch, useSelector } from "react-redux";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const removeCartItem = (id) => {
    console.log(id);
    dispatch(DeleteCartItem(id));
  };

  const incrementQuantity = async (id) => {
    console.log(id);
    try {
      await dispatch(IncreseQuatinty(id)).unwrap();
    } catch (error) {
      toast.warning(error);
    }
  };

  const decrementQuantity = (id) => {
    console.log(id);
    dispatch(DecreaseQuantity(id));
  };
  useEffect(() => {
    dispatch(fetchUserCart());
  }, [dispatch]);

  const { cart } = useSelector((state) => state.cart);

  console.log(cart);
  const handleProceed = () => {
    if (cart.length > 0) {
      navigate("/payment");
    }
  };
  return (
    <>
      <div className="modal-dialog modal-lg cart-container">
        <div className="modal-content">
          <div className="modal-header">
            <ToastContainer />
            <h5 className="modal-title" id="cartModalLabel">
              Your Cart
            </h5>
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
                      decrementQuantity={decrementQuantity}
                      incrementQuantity={incrementQuantity}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary "
              disabled={cart.length <= 0 || cart == undefined || cart == null}
              onClick={handleProceed}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;

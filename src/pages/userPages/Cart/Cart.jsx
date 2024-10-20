import { useContext, useEffect } from "react";
import { ProductContext } from "../../../Provider/ProductContext";
import CartList from "./CartList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  //   const { initialCartItems, user } = useContext(ProductContext);
  const { initialCartItems, setInitialCartItems, setAmount, amount } =
    useContext(ProductContext);
  const navigate = useNavigate();
  useEffect(() => {
    const totalAmount = Math.floor(
      initialCartItems.reduce(
        (acc, val) => acc + val.item.price * val.quantity,
        0
      )
    );
    setAmount(totalAmount);
  }, [initialCartItems, setAmount]);

  console.log(initialCartItems);
  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/cart/${id}`);

      console.log(response);

      // Update the local state to remove the item
      setInitialCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="container">
      {amount > 0 ? (
        <div>
          <h2 className="my-4 text-success">Your Cart</h2>
          <div className="row justify-content-center">
            {initialCartItems.map((item, ind) => (
              <div className="col-md-4 mx-4" key={ind}>
                <CartList item={item} handleRemove={handleRemove} />
              </div>
            ))}
          </div>
          <div>
            {" "}
            <h4>
              total Amount : <span className="text-success "> {amount}</span>
            </h4>{" "}
            <button className="btn-success" onClick={() => navigate("/order")}>
              Payment
            </button>
          </div>
        </div>
      ) : (
        <div className=" cart-container">
          <h2 className="my-4 text-success">Your Cart is empty</h2>
        </div>
      )}
    </div>
  );
}

export default Cart;

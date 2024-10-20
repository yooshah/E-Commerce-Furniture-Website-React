import { useContext } from "react";
import { ProductContext } from "../../../Provider/ProductContext";
import OrderList from "./OrderList";
import "./Order.css";

function OrderedItems() {
  const { orderItems } = useContext(ProductContext);

  return (
    <div
      className={
        orderItems.length > 3 ? "container" : "container order-container"
      }
    >
      <div className="d-flex  align-items-center justify-content-between flex-column">
        <div className="py-5">
          <h3> Order History</h3>
        </div>
        <div>
          {orderItems.length > 0 && (
            <ul className="row">
              {orderItems.map((val, ind) => (
                <OrderList item={val} key={ind} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderedItems;

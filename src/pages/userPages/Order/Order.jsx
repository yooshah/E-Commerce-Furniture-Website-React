import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrder } from "../../../features/orderSlice";
import SpinLoader from "../../../components/Loader/SpinLoader";
import OrderedItems from "./OrderedItems";
function Order() {
  const [openOrder, setOpenOrder] = useState(null);

  const { order: orders, loading } = useSelector((state) => state.order);

  console.log(orders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrder());
  }, [dispatch]);

  if (loading) {
    return <SpinLoader />;
  }

  return (
    <div className="container mt-4 order-container ">
      <h3 className="mb-4">Orders List</h3>
      {orders.map((order, index) => (
        <OrderedItems
          key={index}
          order={order}
          index={index}
          setOpenOrder={setOpenOrder}
          openOrder={openOrder}
        />
      ))}
    </div>
  );
}

export default Order;

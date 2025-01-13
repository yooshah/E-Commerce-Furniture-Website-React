import { Button } from "reactstrap";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { changeDeliveryStatus } from "../../../features/orderSlice";

/* eslint-disable react/prop-types */
function OrderModalRowData({ ind, data, toastmessage, getOrder }) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const dispach = useDispatch();

  const onStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleOrderStatus = async (orderId) => {
    if (selectedStatus !== "") {
      try {
        const response = await dispach(
          changeDeliveryStatus({ orderId, deliveryStatus: selectedStatus })
        ).unwrap();
        console.log(response);

        toastmessage();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <tr>
        <th scope="row">{ind + 1}</th>

        <td>{data.transactionId}</td>
        <td>{data.totalAmount}</td>
        <td>{data.orderDate}</td>
        <div className="visble-poniter">
          <span className="visble-eye " onClick={() => getOrder(data.orderId)}>
            View{" "}
            <img
              src="src\pages\adminPages\assets\visibility.svg"
              alt="visible"
            />
          </span>
        </div>
        <td>{data.orderStatus}</td>
        <td>
          <div className="d-flex">
            <select value={selectedStatus} onChange={onStatusChange}>
              <option value="">Select</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <Button
              color="primary"
              size="sm"
              className="ms-2"
              onClick={() => handleOrderStatus(data.orderId)}
              disabled={selectedStatus == ""}
            >
              Save
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default OrderModalRowData;

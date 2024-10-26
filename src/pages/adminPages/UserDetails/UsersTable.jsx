import { useState } from "react";
import OrderModal from "./OrderModal";
import "./UserDetails.css";
import axios from "axios";
import { Button } from "reactstrap";
/* eslint-disable react/prop-types */

function UsersTable({ usersData, handleBlock, handleUnBlock }) {
  const [orderModal, setOrderModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState();

  const orderToggle = () => {
    setOrderModal(!orderModal);
    setOrderDetails(undefined);
  };

  const fetchOrderdetails = async (userId) => {
    try {
      const orderResponse =
        await axios.get(`http://localhost:5000/order?userId=${userId}
            `);
      if (orderResponse.status >= 200) {
        if (orderResponse.data.length) {
          setOrderDetails(orderResponse.data[0]);
          setOrderModal(true);
        }
      }
    } catch (err) {
      console.error("User Order Detail Fetch Error: ", err);
    }
  };
  if (orderDetails) {
    console.log(orderDetails);
  }

  return (
    <>
      <h3 className="py-5">Users Details</h3>
      <div className="product-table">
        <table className="table table-ligth ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Orders</th>
              <th scope="col">Block User</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((data, ind) => (
              <tr key={ind}>
                <th scope="row">{ind + 1}</th>
                <td>{data.name}</td>

                <td>{data.email}</td>

                <td>
                  <div className="visble-poniter">
                    <span
                      className="visble-eye "
                      onClick={() => fetchOrderdetails(data.id)}
                    >
                      View{" "}
                      <img
                        src="src\pages\adminPages\assets\visibility.svg"
                        alt="visible"
                      />
                    </span>
                  </div>
                </td>
                <td>
                  {data.state == "active" ? (
                    <Button color="danger" onClick={() => handleBlock(data.id)}>
                      Block
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      onClick={() => handleUnBlock(data.id)}
                    >
                      unBlock
                    </Button>
                  )}
                </td>
                {/* <td>
                  {" "}
                  <Button color="danger">
                    delete{" "}
                    <img
                      src="src\pages\adminPages\ProductDetails\adminProductassets\delete.svg"
                      alt="delete"
                    />
                  </Button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <OrderModal
        toggle={orderToggle}
        userOrder={orderDetails}
        modal={orderModal}
      />
    </>
  );
}

export default UsersTable;

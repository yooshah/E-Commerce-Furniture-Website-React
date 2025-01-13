import { useState } from "react";
import OrderModal from "./OrderModal";
import "./UserDetails.css";

import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import {
  blockOrUnnblockUser,
  getUserOrderDetail,
} from "../../../features/userSlice";
import { ToastContainer, toast } from "react-toastify";
/* eslint-disable react/prop-types */

function UsersTable({ usersData, setUsersData }) {
  const [orderModal, setOrderModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState();

  const dispach = useDispatch();

  const orderToggle = () => {
    setOrderModal(!orderModal);
    setOrderDetails(undefined);
  };

  const handleBlockOrUnblock = async (userId) => {
    const adminConfirmed = window.confirm(
      "Are you sure you want to Change User Account Status?"
    );

    if (adminConfirmed) {
      try {
        const response = await dispach(blockOrUnnblockUser(userId)).unwrap();

        if (response == true) {
          setUsersData((prevData) =>
            prevData.map((user) =>
              user.id === userId
                ? { ...user, accountStatus: !user.accountStatus }
                : user
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleToast = () => {
    orderToggle();
    toast.success("order Status Changed✅");
  };

  const handleUserOrder = async (id) => {
    try {
      const response = await dispach(getUserOrderDetail(id)).unwrap();

      setOrderDetails(response);
      setOrderModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="py-5">Users Details</h3>
      <div className="product-table">
        <ToastContainer />
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
                      onClick={() => handleUserOrder(data.id)}
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
                  {data.accountStatus == true ? (
                    <Button
                      color="danger"
                      onClick={() => handleBlockOrUnblock(data.id)}
                    >
                      Block
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      onClick={() => handleBlockOrUnblock(data.id)}
                    >
                      unBlock
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <OrderModal
        toggle={orderToggle}
        userOrder={orderDetails}
        modal={orderModal}
        toastmessage={handleToast}
      />
    </>
  );
}

export default UsersTable;

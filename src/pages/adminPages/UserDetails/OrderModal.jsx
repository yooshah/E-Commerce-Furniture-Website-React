import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import OrderModalRowData from "./OrderModalRowData";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchOrderById } from "../../../features/orderSlice";
import NestedOrderModal from "./NestedOrderModal";

/* eslint-disable react/prop-types */
function OrderModal({ toggle, userOrder, modal, toastmessage }) {
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const dispatch = useDispatch();

  const toggleNestedModal = () => {
    setIsNestedModalOpen(!isNestedModalOpen);
  };

  const handleOrderItem = async (id) => {
    try {
      const response = await dispatch(fetchOrderById(id)).unwrap();
      console.log(response);
      setOrderList(response);
      toggleNestedModal();
    } catch (error) {
      console.log(error);
    }
  };

  if (!userOrder) {
    return null;
  }

  return (
    <>
      <div>
        <Modal isOpen={modal} toggle={toggle} size="xl">
          <ModalHeader toggle={toggle}>Order Details</ModalHeader>
          <ModalBody>
            <table className="table table-ligth ">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">TransactionId</th>
                  <th scope="col">TotalAmount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Order</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userOrder.map((data, ind) => (
                  <OrderModalRowData
                    key={ind}
                    data={data}
                    ind={ind}
                    toastmessage={toastmessage}
                    getOrder={handleOrderItem}
                  />
                ))}
              </tbody>
            </table>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <NestedOrderModal
        orderList={orderList}
        isNestedModalOpen={isNestedModalOpen}
        toggleNestedModal={toggleNestedModal}
      />
    </>
  );
}
export default OrderModal;

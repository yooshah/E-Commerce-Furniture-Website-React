import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Ordertems from "./Ordertems";

/* eslint-disable react/prop-types */
function NestedOrderModal({ isNestedModalOpen, toggleNestedModal, orderList }) {
  return (
    <Modal isOpen={isNestedModalOpen} toggle={toggleNestedModal}>
      <ModalHeader toggle={toggleNestedModal}>
        Confirm Order Status Change
      </ModalHeader>
      <ModalBody>
        <table className="table table-ligth ">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">totalAmount</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((data, ind) => (
              <Ordertems key={ind} data={data} ind={ind} />
            ))}
          </tbody>
        </table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggleNestedModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default NestedOrderModal;

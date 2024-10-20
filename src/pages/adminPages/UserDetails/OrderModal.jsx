import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

/* eslint-disable react/prop-types */
function OrderModal({ toggle, userOrder, modal }) {
  if (!userOrder) {
    return null;
  }
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Order Details</ModalHeader>
        <ModalBody>
          <table className="table table-ligth ">
            <thead className="thead-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Item</th>
                <th scope="col">Quantity</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {userOrder.ordered.map((data, ind) => (
                <tr key={ind}>
                  <th scope="row">{ind + 1}</th>
                  <td>{data.item.name}</td>

                  <td>{data.quantity}</td>
                  <td>{Math.floor(data.item.price * data.quantity)}</td>
                  <td>{userOrder.date}</td>
                </tr>
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
  );
}
export default OrderModal;

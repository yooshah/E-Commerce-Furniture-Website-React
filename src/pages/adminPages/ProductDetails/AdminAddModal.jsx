import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import "./AdminProducts.css";

/* eslint-disable react/prop-types */
function AdminAddModal({ toggle, editForm, onFormChange, modal, onAdd }) {
  return (
    <div>
      <Modal
        isOpen={modal}
        fade={false}
        toggle={toggle}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader toggle={toggle}>Add New Product</ModalHeader>

        <ModalBody>
          <div>
            <div>
              <div>
                <label>name</label>
                <Input
                  name="name"
                  value={editForm.name}
                  onChange={onFormChange}
                ></Input>
              </div>
              <div>
                <label>brand</label>
                <Input
                  name="brand"
                  value={editForm.brand}
                  onChange={onFormChange}
                ></Input>
              </div>
              <div>
                <label>Price</label>
                <Input
                  name="price"
                  value={editForm.price}
                  onChange={onFormChange}
                ></Input>
              </div>
              <div>
                <label>
                  category{" "}
                  <span className="whattowrite">
                    [sofa,Bedroom,Living,Office,Dining,New Arrival]
                  </span>
                </label>
                <Input
                  name="category"
                  value={editForm.category}
                  onChange={onFormChange}
                ></Input>
              </div>
              <div>
                <label>
                  Rating <span className="whattowrite">(between 1-5)</span>
                </label>
                <Input
                  name="rating"
                  value={editForm.rating}
                  onChange={onFormChange}
                ></Input>
              </div>
              <div>
                <label>img-url</label>
                <Input
                  name="image"
                  value={editForm.image}
                  onChange={onFormChange}
                ></Input>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAdd}>
            save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminAddModal;

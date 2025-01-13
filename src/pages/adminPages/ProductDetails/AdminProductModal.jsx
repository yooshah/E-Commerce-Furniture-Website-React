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
function AdminProductModal({
  item,
  toggle,
  onFormChange,
  editForm,
  onSave,
  setEditForm,
}) {
  return (
    <div>
      <Modal
        isOpen={!!item}
        fade={false}
        toggle={toggle}
        backdrop="static"
        keyboard={false}
      >
        <ModalHeader toggle={toggle}>Edit Product</ModalHeader>

        <ModalBody>
          <div>
            <div className="editModal-img">
              <img src={item?.image} alt="product image" />
            </div>
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
                <label>Category</label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={onFormChange}
                  className="form-control"
                >
                  <option value="">Select a Category</option>
                  <option value="1">Sofa</option>
                  <option value="3">Bedroom</option>
                  <option value="2">Living</option>
                  <option value="6">Office</option>
                  <option value="4">Dining</option>
                  <option value="7">Kitchen</option>
                  <option value="5">New Arrival</option>
                </select>
              </div>
              <div>
                <label>Rating</label>
                <select
                  name="rating"
                  value={editForm.rating}
                  onChange={onFormChange}
                  className="form-control"
                >
                  <option value="">Select a Rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label>Stock</label>
                <Input
                  name="stock"
                  value={editForm.stock}
                  onChange={onFormChange}
                ></Input>
              </div>
              <div>
                <label>Upload Image</label>
                <Input
                  type="file"
                  name="image"
                  required
                  onChange={(e) =>
                    setEditForm({ ...editForm, image: e.target.files[0] })
                  }
                >
                  {" "}
                </Input>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => onSave()}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminProductModal;

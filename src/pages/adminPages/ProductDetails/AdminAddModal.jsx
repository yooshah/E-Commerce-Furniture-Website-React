import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormFeedback,
} from "reactstrap";
import "./AdminProducts.css";

/* eslint-disable react/prop-types */
function AdminAddModal({
  toggle,
  editForm,
  setEditForm,
  onFormChange,
  modal,
  onAdd,
}) {
  const validateForm = () => {
    return (
      editForm.name &&
      editForm.brand &&
      editForm.price &&
      editForm.category &&
      editForm.rating &&
      editForm.stock &&
      editForm.image
    );
  };

  // Handle form submission with validation check
  const handleAdd = () => {
    if (validateForm()) {
      onAdd(); // Proceed with adding the product if validation is passed
    } else {
      alert("Please fill in all fields before saving.");
    }
  };

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
                  invalid={!editForm.name}
                ></Input>
                {!editForm.name && (
                  <FormFeedback>Please enter a product name.</FormFeedback>
                )}
              </div>
              <div>
                <label>brand</label>
                <Input
                  name="brand"
                  value={editForm.brand}
                  onChange={onFormChange}
                  invalid={!editForm.brand}
                ></Input>
                {!editForm.brand && (
                  <FormFeedback>Please enter a brand.</FormFeedback>
                )}
              </div>
              <div>
                <label>Price</label>
                <Input
                  name="price"
                  value={editForm.price}
                  onChange={onFormChange}
                  invalid={!editForm.price || isNaN(editForm.price)}
                ></Input>
                {(!editForm.price || isNaN(editForm.price)) && (
                  <FormFeedback>Please enter a valid price.</FormFeedback>
                )}
              </div>

              <div>
                <label>Category</label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={onFormChange}
                  className="form-control"
                  // invalid={!editForm.category}
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
                {!editForm.category && (
                  <FormFeedback>Please select a category.</FormFeedback>
                )}
              </div>
              <div>
                <label>Rating</label>
                <select
                  name="rating"
                  value={editForm.rating}
                  onChange={onFormChange}
                  className="form-control"
                  // invalid={!editForm.rating}
                >
                  <option value="">Select a Rating</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                {!editForm.rating && (
                  <FormFeedback>Please select a rating.</FormFeedback>
                )}
              </div>
              <div>
                <label>Stock</label>
                <Input
                  name="stock"
                  value={editForm.stock}
                  onChange={onFormChange}
                  invalid={!editForm.stock || isNaN(editForm.stock)}
                ></Input>
                {(!editForm.stock || isNaN(editForm.stock)) && (
                  <FormFeedback>
                    Please enter valid stock quantity.
                  </FormFeedback>
                )}
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
                  invalid={!editForm.image}
                ></Input>
                {!editForm.image && (
                  <FormFeedback>Please upload an image.</FormFeedback>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={handleAdd}
            disabled={!validateForm()}
          >
            Save
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AdminAddModal;

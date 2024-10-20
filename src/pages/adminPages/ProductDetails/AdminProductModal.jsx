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
function AdminProductModal({ item, toggle, onFormChange, editForm, onSave }) {
  //   const toggle = () => setModal(!modal);

  // const onSaveEditProduct = async () => {
  //   try {
  //     const editResponse = await axios.patch(
  //       `http://localhost:5000/products/${item.id}`,
  //       {
  //         name: editForm.name,
  //         price: editForm.price,
  //         image: editForm.image,
  //         rating: editForm.rating,
  //         category: editForm.category,
  //         brand: editForm.brand,
  //       }
  //     );
  //   } catch (err) {
  //     console.error("Edit product Details failed:", err);
  //   }
  // };

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
                <label>category</label>
                <Input
                  name="category"
                  value={editForm.category}
                  onChange={onFormChange}
                ></Input>
              </div>
              <div>
                <label>rating</label>
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
          <Button color="primary" onClick={onSave}>
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

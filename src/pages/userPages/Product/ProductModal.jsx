import axios from "axios";
import { useContext } from "react";
import { ProductContext } from "../../../Provider/ProductContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Rating from "./Rating";
import { useNavigate } from "react-router-dom";
import "./Product.css";
/* eslint-disable react/prop-types */
function ProductModal(props) {
  const { user, setInitialCartItems, initialCartItems } =
    useContext(ProductContext);
  const navigate = useNavigate();

  const handleAddToCart = async (id) => {
    const existingItem = initialCartItems.find((item) => item.productId == id);

    if (!user) {
      navigate("/login");
    } else if (existingItem) {
      const updateditem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      try {
        const response = await axios.put(
          `http://localhost:5000/cart/${existingItem.id}`,
          updateditem
        );
        const increCartitem = initialCartItems.map((val) => {
          if (val.id !== existingItem.id) {
            return val;
          } else {
            return updateditem;
          }
        });
        setInitialCartItems(increCartitem);

        console.log(response);
      } catch (error) {
        console.error("Add quantity error: ", error);
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/cart", {
          userId: user.userId,
          productId: props.previewProduct.id,
          quantity: 1,
          item: props.previewProduct,
        });

        const carrtList = [
          ...initialCartItems,
          {
            id: response.data.id,
            userId: user.userId,
            productId: props.previewProduct?.id,
            quantity: 1,
            item: props.previewProduct,
          },
        ];
        setInitialCartItems(carrtList);
      } catch (err) {
        console.error("Add To Cart Error: ", err.message);
      }
    }
  };

  return (
    <div>
      <Modal isOpen={!!props.previewProduct} toggle={props.closeToggle}>
        <ModalHeader toggle={props.closeToggle}>
          {props.previewProduct?.name}
        </ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-evenly">
            <div style={{ height: "250px", width: "250px" }}>
              <img
                src={props.previewProduct?.image}
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            <div className="px-2">
              <h4>{props.previewProduct?.name} </h4>
              <h5>Brand:{props.previewProduct?.brand} </h5>
              <h6 className="pt-4">
                {" "}
                Price:{" "}
                <span className="text-warning">
                  {props.previewProduct?.price}${" "}
                </span>
              </h6>
              <h6>
                <Rating rating={props.previewProduct?.rating} />
              </h6>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => handleAddToCart(props.previewProduct?.id)}
            toggle={props.closeToggle}
          >
            Add To Cart
          </Button>{" "}
          {/* <Button color="secondary" onClick={props.toggle}>
              Cancel
            </Button> */}
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default ProductModal;

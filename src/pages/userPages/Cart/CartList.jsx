import "./Cart.css";

/* eslint-disable react/prop-types */

function CartList(props) {
  return (
    <div className="d-flex">
      <div className="col-md-6 col-lg-3  mb-4 ">
        <div className="card" style={{ width: "18rem", marginBottom: "20px" }}>
          <div className="image-container position-relative">
            <span
              onClick={() => props.handleRemove(props.item.id)}
              className="cancel-btn"
              style={{
                position: "absolute",
              }}
            >
              &#10008;
            </span>
            <img
              className="card-img-top"
              src={props.item.item.image}
              alt={props.item.item.alt}
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{props.item.item.name}</h5>
            <h5>
              {" "}
              quantity:{" "}
              <span className="text-success">{props.item.quantity}</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartList;

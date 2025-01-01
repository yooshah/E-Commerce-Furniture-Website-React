import "./Cart.css";

/* eslint-disable react/prop-types */

function CartList(props) {
  console.log("hello");
  return (
    // <div className="d-flex">
    //   <div className="col-md-6 col-lg-3  mb-4 ">
    //     <div className="card" style={{ width: "18rem", marginBottom: "20px" }}>
    //       <div className="image-container position-relative">
    //         <span
    //           // onClick={() => props.handleRemove(props.item.id)}
    //           className="cancel-btn"
    //           style={{
    //             position: "absolute",
    //           }}
    //         >
    //           &#10008;
    //         </span>
    //         <img
    //           className="card-img-top"
    //           src={props.item.image}
    //           alt={props.item.name}
    //         />
    //       </div>
    //       <div className="card-body">
    //         <h5 className="card-title">{props.item.name}</h5>
    //         <h5>
    //           {" "}
    //           quantity:{" "}
    //           <span className="text-success">{props.item.quantity}</span>
    //         </h5>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <div>
    //   <td>
    //     <img
    //       src={props.item.image}
    //       alt={props.item.name}
    //       className="rounded"
    //       style={{ width: "50px", height: "50px" }}
    //     />
    //   </td>
    //   <td>{props.item.name}</td>
    //   <td>₹{Number(props.item.price).toFixed(2)}</td>
    //   <td>
    //     <div className="d-flex justify-content-center align-items-center">
    //       <button
    //         // onClick={() => decrementQuantity(item.id)}
    //         className="btn btn-danger btn-sm me-2"
    //       >
    //         -
    //       </button>
    //       <span>{props.item.quantity}</span>
    //       <button
    //         // onClick={() => incrementQuantity(item.id)}
    //         className="btn btn-success btn-sm ms-2"
    //       >
    //         +
    //       </button>
    //     </div>
    //   </td>
    //   <td>₹{(Number(props.item.price) * props.item.quantity).toFixed(2)}</td>
    //   <td>
    //     <button
    //       // onClick={() => removeCart(item.id)}
    //       className="btn btn-danger btn-sm"
    //     >
    //       Remove
    //     </button>
    //   </td>
    // </div>
    <tr>
      <td>
        <img
          src={props.item.image}
          alt={props.item.name}
          className="rounded"
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td>{props.item.name}</td>
      <td>${Number(props.item.price).toFixed(2)}</td>
      <td>
        <div className="d-flex justify-content-center align-items-center">
          <button
            // onClick={() => props.decrementQuantity(props.item.productId)}
            className="btn btn-danger btn-sm me-2"
          >
            -
          </button>
          <span>{props.item.quantity}</span>
          <button
            // onClick={() => props.incrementQuantity(props.item.productId)}
            className="btn btn-success btn-sm ms-2"
          >
            +
          </button>
        </div>
      </td>
      <td>₹{(Number(props.item.price) * props.item.quantity).toFixed(2)}</td>
      <td>
        <button
          onClick={() => props.removeCart(props.item.cartItemId)}
          className="btn btn-danger btn-sm"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default CartList;

import "./Cart.css";

/* eslint-disable react/prop-types */

function CartList(props) {
  return (
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
            onClick={() => props.decrementQuantity(props.item.cartItemId)}
            className="btn btn-danger btn-sm me-2"
            disabled={props.item.quantity == 1}
          >
            -
          </button>
          <span>{props.item.quantity}</span>
          <button
            onClick={() => props.incrementQuantity(props.item.cartItemId)}
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

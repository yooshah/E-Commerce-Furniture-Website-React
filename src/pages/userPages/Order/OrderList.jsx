import "./Order.css";
/* eslint-disable react/prop-types */

function OrderList({ item }) {
  return (
    <div className="col-12  order-list">
      <div className="col-12 " onClick={() => console.log(item)}>
        <h5>
          Full Name: <span>{item.shipping.name}</span>
        </h5>
        <h5>
          Deliver Address: <span>{item.shipping.address}</span>
        </h5>
        <div>
          {" "}
          Products :
          {item.ordered.map((val, ind) => (
            <span key={ind}>{val.item.name},</span>
          ))}
        </div>
        <h3>
          {" "}
          Amount Paid:<span className="text-primary">{item.amount} $</span>
        </h3>
      </div>
    </div>
  );
}

export default OrderList;

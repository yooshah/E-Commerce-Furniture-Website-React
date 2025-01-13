import { Card, CardBody, Collapse, Button } from "reactstrap";
import "./Order.css";
/* eslint-disable react/prop-types */
function OrderedItems({ order, index, setOpenOrder, openOrder }) {
  const toggleOrder = (index) => {
    setOpenOrder(openOrder === index ? null : index);
  };

  return (
    <Card key={order.transactionId} className="mb-3 order-card">
      <CardBody>
        <div className="order-header d-flex justify-content-between align-items-center">
          <div>
            <h5>Transaction ID: {order.transactionId}</h5>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p>
              Status:{" "}
              <span
                className={`badge ${
                  order.orderStatus === "Pending"
                    ? "bg-warning"
                    : order.orderStatus === "Delivered"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {order.orderStatus}
              </span>
            </p>
            <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
            <p>Delivery Address: {order.deliveryAdrress}</p>
            <p>Phone: {order.phone}</p>
          </div>
          <Button color="primary" onClick={() => toggleOrder(index)}>
            {openOrder === index ? "Hide Items" : "Show Items"}
          </Button>
        </div>

        {/* Collapsible Order Items */}
        <Collapse isOpen={openOrder === index}>
          <div className="order-items mt-3">
            <h6>Order Items:</h6>
            {order.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="order-item d-flex justify-content-between align-items-center py-2 border-bottom"
              >
                {/* Optional Image */}
                <div className="item-image">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="img-fluid rounded"
                  />
                </div>

                {/* Item Details */}
                <div className="item-details flex-grow-1 ms-3">
                  <h6>{item.productName}</h6>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <p>Total Price: ${item.totalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </Collapse>
      </CardBody>
    </Card>
  );
}

export default OrderedItems;

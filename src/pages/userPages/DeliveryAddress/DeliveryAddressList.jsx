import { useDispatch, useSelector } from "react-redux";
import "./DeliveryAddress.css";
import { useState } from "react";
import {
  deleteDeliveryAddress,
  selectAddress,
} from "../../../features/AddressSlice";
function DeliveryAddressList() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const dispatch = useDispatch();

  const { addressList: addresses, addressIndex } = useSelector(
    (state) => state.address
  );

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSelectIndex = (index) => {
    dispatch(selectAddress(index));
  };

  console.log(addressIndex);
  const handleDelete = (id) => {
    dispatch(deleteDeliveryAddress(id));
  };

  return (
    <div className="address-list-container">
      <h2>Select Address</h2>
      {addresses.length === 0 ? (
        <p>No addresses available.</p>
      ) : (
        <div className="address-list">
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`address-card ${
                addressIndex === index ? "selected" : ""
              }`}
            >
              <div className="address-summary">
                <input
                  type="radio"
                  name="selectedAddress"
                  checked={addressIndex === index}
                  onChange={() => handleSelectIndex(index)}
                />
                <div className="summary-details">
                  <strong>{address.fullName}</strong>, {address.address}
                </div>
                <button
                  className="toggle-button"
                  onClick={() => toggleExpand(index)}
                >
                  {expandedIndex === index ? "Hide" : "Show More"}
                </button>
                <button onClick={() => handleDelete(address.id)}>
                  {" "}
                  <img
                    src="src\components\assets\delete (2).svg"
                    alt="delete"
                  />
                </button>
              </div>

              {expandedIndex === index && (
                <div className="address-details">
                  <p>
                    <strong>City:</strong> {address.city}
                  </p>
                  <p>
                    <strong>District:</strong> {address.district}
                  </p>
                  <p>
                    <strong>State:</strong> {address.state}
                  </p>
                  <p>
                    <strong>Landmark:</strong> {address.landMark}
                  </p>
                  <p>
                    <strong>Postal Code:</strong> {address.postalCode}
                  </p>
                  <p>
                    <strong>Country:</strong> {address.country}
                  </p>
                  <p>
                    <strong>Phone:</strong> {address.phone}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeliveryAddressList;

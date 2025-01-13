import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { Button } from "reactstrap";
import "./DeliveryAddress.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeliverAddress,
  fetchDeliveryAddress,
} from "../../../features/AddressSlice";

import DeliveryAddressList from "./DeliveryAddressList";
import Payment from "../Payment/Payment";
import SpinLoader from "../../../components/Loader/SpinLoader";

const formInitialState = {
  fullName: "",
  address: "",
  city: "",
  district: "",
  state: "",
  landMark: "",
  country: "",
  postalCode: "",
  phone: "",
};

function DeliveryAddress() {
  const [formData, setFormData] = useState(formInitialState);

  const dispatch = useDispatch();

  const { addressList, loading } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchDeliveryAddress());
  }, [dispatch]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    dispatch(addDeliverAddress(formData));
    setFormData(formInitialState);
  };
  if (loading) {
    return <SpinLoader />;
  }
  return (
    <>
      <DeliveryAddressList />
      <div className="mx-auto mt-5" style={{ maxWidth: "900px" }}>
        <MDBRow>
          <MDBCol md="8" className="mb-4">
            <MDBCard className="mb-4">
              <MDBCardHeader className="py-3">
                <MDBTypography tag="h5" className="mb-0">
                  Delivery Address
                </MDBTypography>
              </MDBCardHeader>
              <MDBCardBody>
                {addressList.length >= 3 ? (
                  <p className="text-danger">
                    You can only add up to 3 delivery addresses.
                  </p>
                ) : (
                  <form onSubmit={handleAddressSubmit}>
                    <MDBRow className="mb-4">
                      <MDBCol>
                        <MDBInput
                          placeholder="Full Name"
                          type="text"
                          name="fullName"
                          required
                          onChange={handleFormChange}
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBInput
                      placeholder="Address"
                      type="text"
                      name="address"
                      className="mb-4"
                      onChange={handleFormChange}
                      required
                    />

                    <MDBRow className="mb-4">
                      <MDBCol md="6">
                        <MDBInput
                          placeholder="City"
                          type="text"
                          required
                          name="city"
                          onChange={handleFormChange}
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          placeholder="District"
                          type="text"
                          name="district"
                          onChange={handleFormChange}
                          required
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                      <MDBCol md="6">
                        <MDBInput
                          placeholder="State"
                          type="text"
                          name="state"
                          onChange={handleFormChange}
                          required
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          placeholder="Country"
                          name="country"
                          type="text"
                          onChange={handleFormChange}
                          required
                        />
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="mb-4">
                      <MDBCol md="6">
                        <MDBInput
                          placeholder="Postal Code"
                          name="postalCode"
                          type="text"
                          onChange={handleFormChange}
                          required
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <MDBInput
                          placeholder="Phone Number"
                          name="phone"
                          type="text"
                          onChange={handleFormChange}
                          required
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow className="mb-4">
                      <MDBCol>
                        <MDBInput
                          placeholder="Land Mark"
                          name="landMark"
                          type="text"
                          onChange={handleFormChange}
                          required
                        />
                      </MDBCol>
                    </MDBRow>
                    <Button type="submit" color="primary">
                      Save
                    </Button>
                  </form>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <Payment />
        </MDBRow>
      </div>
    </>
  );
}

export default DeliveryAddress;

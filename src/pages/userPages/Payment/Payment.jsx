import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import axiosInstane from "../../../api/axiosInstance";
import { endPoints } from "../../../api/endPoints";
import { cartCleaner } from "../../../features/cartSlice";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Payment() {
  const { cart } = useSelector((state) => state.cart);
  const { addressIndex, addressList } = useSelector((state) => state.address);

  const dispatch = useDispatch();
  // const razorPayKey = import.meta.env.RAZOR_PAY_KEY;
  // console.log(razorPayKey);
  // console.dir(import.meta.env);
  console.log(cart);
  const [razor, setRazor] = useState(null);
  const [isRazorpayLoad, setIsRazorpayLoad] = useState(false);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.totalPrice;
  }, 0);

  const handleConfirmPayment = async () => {
    if (!isRazorpayLoad) {
      const scriptLoad = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      setIsRazorpayLoad(scriptLoad);
      if (!loadScript) {
        alert("Failed to load payment gateway. Please try again later");
        return;
      }
    }
    try {
      const response = await axiosInstane.post(
        endPoints.ORDER.RAZORPAY_ORDERID(totalPrice)
      );
      const orderId = response.data;
      console.log("idd=>", orderId);
      const options = {
        key: "rzp_test_AOsINurhNOr1NI",
        amount: totalPrice * 100,
        currency: "INR",
        name: "FurniNest",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          console.log("options==>", response);
          const paymentData = {
            razorpay_orderId: response.razorpay_orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          setRazor(paymentData);
          try {
            await axiosInstane.post(
              endPoints.ORDER.RAZORPAY_PAYMENT,
              paymentData
            );
            await axiosInstane.post(endPoints.ORDER.PLACE_ORDER, {
              addressId: addressList[addressIndex].id,
              totalAmount: totalPrice,
              transactionId: response.razorpay_payment_id,
            });
            alert("Order placed successfully!");
          } catch (error) {
            console.log("==>", error.response);
            alert(error.response.data.error);
          }
        },
        theme: {
          // color: "#056832",
          color: "#004d34 ",
          // color: "#052560"
        },
      };
      console.log(razor);
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      dispatch(cartCleaner());
    } catch (error) {
      console.log("===>", error);
      alert("Error creating order. Please try again.");
    }
  };

  return (
    <MDBCol md="4" className="mb-4">
      <MDBCard className="mb-4">
        <MDBCardHeader className="py-3">
          <MDBTypography tag="h5" className="mb-0">
            Payment
          </MDBTypography>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBListGroup flush>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
              Total Products
              <span>{cart.length}</span>
            </MDBListGroupItem>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center px-0">
              Shipping
              <span>Gratis</span>
            </MDBListGroupItem>
            <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>Total amount</strong>
                <strong>
                  <p className="mb-0">(including VAT)</p>
                </strong>
              </div>
              <span>
                <strong>{totalPrice}</strong>
              </span>
            </MDBListGroupItem>
          </MDBListGroup>

          <Button
            color="primary"
            disabled={addressIndex == null || cart.length == 0}
            onClick={handleConfirmPayment}
          >
            Confirm Payment
          </Button>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default Payment;

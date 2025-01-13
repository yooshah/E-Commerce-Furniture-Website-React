// import React from "react";
import axios from "axios";
import Records from "./Records";
import { useState, useEffect } from "react";
import BussinessRecords from "./BussinessRecords";
import ChartVisual from "./ChartVisual";
import ProfitChart from "./Profitvisual";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../features/userSlice";
import { fetchProducts } from "../../../features/productSlice";
import {
  fetchRevenueRecord,
  getTotalRevenue,
} from "../../../features/orderSlice";

function AdminDashboard() {
  // const [userData, setUserData] = useState([]);
  // const [productData, setProductData] = useState([]);
  // const [orderData, setOrderData] = useState([]);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const userResponse = await axios.get("http://localhost:5000/users");
  //       if (userResponse.status >= 200) {
  //         setUserData(userResponse.data);
  //       }
  //     } catch (err) {
  //       console.error("user Data Fetch error in dashboard:", err);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  // useEffect(() => {
  //   const fetchProductData = async () => {
  //     try {
  //       const productResponse = await axios.get(
  //         "http://localhost:5000/products"
  //       );
  //       if (productResponse.status >= 200) {
  //         setProductData(productResponse.data);
  //       }
  //     } catch (err) {
  //       console.error("user Data Fetch error in dashboard:", err);
  //     }
  //   };
  //   fetchProductData();
  // }, []);

  // useEffect(() => {
  //   const fetchOrderData = async () => {
  //     try {
  //       const orderResponse = await axios.get("http://localhost:5000/order");
  //       if (orderResponse.status >= 200) {
  //         setOrderData(orderResponse.data);
  //       }
  //     } catch (err) {
  //       console.error("user Data Fetch error in dashboard:", err);
  //     }
  //   };
  //   fetchOrderData();
  // }, []);

  // return (
  //   <>
  //     <div className="dashBoard-container">
  //       <h3>
  //         Welcome{" "}
  //         <span className="text-success">{localStorage.getItem("name")}</span>
  //       </h3>
  //     </div>
  //     <div className="d-flex justify-content-around align-items-stretch">
  //       {userData.length > 0 && <Records userData={userData} />}
  //       {/* {productData.length>0 &&  } */}

  //       {productData.length > 0 && (
  //         <BussinessRecords productData={productData} orderData={orderData} />
  //       )}
  //     </div>

  //     {orderData.length > 0 && (
  //       <div className="row m-5">
  //         <div className="col-lg-7 ">
  //           <ChartVisual orders={orderData} />
  //         </div>
  //         <div className="col-lg-5" style={{ height: "50%" }}>
  //           <ProfitChart />
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );
  const { products: productData } = useSelector((state) => state.product);
  const { users: userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllUsers()).unwrap();
      await dispatch(fetchProducts()).unwrap();
      await dispatch(getTotalRevenue());
      await dispatch(fetchRevenueRecord());
    };
    fetchData();
  }, [dispatch]);

  // console.log(products);
  // console.log(users);

  // const a
  return (
    <>
      <div className="dashBoard-container">
        <h3>
          Welcome{" "}
          <span className="text-success">{localStorage.getItem("name")}</span>
        </h3>
      </div>
      <div className="d-flex justify-content-around align-items-stretch">
        {userData.length > 0 && <Records userData={userData} />}
        {/* {productData.length>0 &&  } */}

        {productData.length > 0 && (
          <BussinessRecords productData={productData} orderData={[]} />
        )}
      </div>
      <div className="row m-5">
        <div className="col-lg-7 ">
          <ChartVisual />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;

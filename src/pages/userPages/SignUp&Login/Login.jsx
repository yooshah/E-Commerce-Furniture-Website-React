// import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
// import { ProductContext } from "../../../Provider/ProductContext";
// import { AdminContext } from "../../../Provider/AdminContext";
import email_icon from "./signupassets/email.png";
import password_icon from "./signupassets/password.png";
import { checkAccount } from "../../../features/AuthSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Yup validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

function Login() {
  const navigate = useNavigate();

  // const { loading, error, isLoggedIn } = useSelector(
  //   (state) => state.auth
  // );
  const dispatch = useDispatch();
  // const { userLogin } = useContext(ProductContext);
  // const { adminLogin, setCheckAdmin, checkAdmin, setIsLoading } =
  //   useContext(AdminContext);
  // console.log(checkAdmin);
  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      // if (values.email.includes("@furniadmin")) {
      //   const adminResponse = await adminVerify(values.email, values.password);

      try {
        const response = await dispatch(
          checkAccount({ email: values.email, password: values.password })
        ).unwrap();

        localStorage.setItem("userId", response.id);
        localStorage.setItem("name", response.name);
        localStorage.setItem("email", response.email);
        localStorage.setItem("token", response.token);
        if (response.role == "user") {
          navigate("/");
        }
      } catch (error) {
        toast.error(error.error);
      }

      // if (adminResponse) {
      //   const [adminloged] = adminResponse;
      //   adminLogin({
      //     AdminId: adminloged.id,
      //     email: adminloged.email,
      //     AdminName: adminloged.name,
      //     admin: true,
      //   });
      //   localStorage.setItem("AdminId", adminloged.id);
      //   localStorage.setItem("email", adminloged.email);
      //   localStorage.setItem("name", adminloged.name);
      //   localStorage.setItem("admin", true);
      //   setCheckAdmin(true);
      //   setIsLoading(false);
      //   navigate("/adminaccount");
      // }
      // } else {

      // if (response.a) {
      //   const [userloged] = response;
      //   if (userloged.state == "active") {
      //     userLogin({ userId: userloged.id, email: userloged.email });

      //     localStorage.setItem("email", userloged.email);
      //     localStorage.setItem("userName", userloged.name);
      //     localStorage.setItem("token", userloged.token);
      //     // localStorage.setItem("admin", false);
      //     if(response.accountStatus){
      //       setCheckAdmin(false);

      //     }

      //     navigate("/");
      //   } else {
      //     alert("Your account is blocked");
      //     navigate("/");
      //   }
      //   setSubmitting(false);
      // } else {
      //   alert("Wrong email or password");
      // }
    },
  });

  // Check if account exists
  // async function checkAccount(email, password) {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/users?email=${email}&password=${password}`
  //     );
  //     if (response.status >= 200) {
  //       return response.data.length > 0 ? response.data : false;
  //     }
  //     throw new Error("Network Error");
  //   } catch (err) {
  //     console.error("Error:", err);
  //   }
  // }

  // const adminVerify = async (email, password) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/admin?email=${email}&password=${password}`
  //     );

  //     if (response.status >= 200) {
  //       return response.data;
  //     }
  //   } catch (err) {
  //     console.error(" loging error:", err);
  //   }
  // };

  return (
    <div className="container">
      <div className="login-container d-flex justify-content-center align-items-center">
        <div className="container border mt-3 bg-light">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-4 d-flex justify-content-center">
              <img
                src="https://raw.githubusercontent.com/arunkjojo/FurnitureAppClone/refs/heads/main/assets/images/fn2.jpg"
                alt="image of Sofa"
                className="img-fluid"
              />
            </div>
            <div className="col-md-8">
              <h2 className="text-uppercase text-center mb-5">Login</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-3">
                  <p className="input-error">
                    {formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""}
                  </p>
                  <img src={email_icon} />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.email && formik.errors.email
                        ? "input-error"
                        : ""
                    }
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <p className="input-error">
                    {formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : ""}
                  </p>
                  <img src={password_icon} />
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.password && formik.errors.password
                        ? "input-error"
                        : ""
                    }
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="signUp-btn me-5"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Logging in..." : "Login"}
                  </button>
                  <Link to="/signup">
                    <button className="signUp-btn">Sign Up</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

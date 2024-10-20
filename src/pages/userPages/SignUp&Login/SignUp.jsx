import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import "./SignUp.css";
import person_icon from "./signupassets/person.png";
import email_icon from "./signupassets/email.png";
import password_icon from "./signupassets/password.png";

// Validation Schema using Yup
const basicSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

function SignUp() {
  const navigate = useNavigate();

  // Initializing Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: basicSchema,
    onSubmit: async (values) => {
      const response = await verifyDuplicateAccount(values.email);

      if (response.data.length > 0) {
        toast.error("Email already registered");
        return;
      }

      saveCredentials({
        name: values.name,
        email: values.email,
        password: values.password,
        state: "active",
      }).then(() => {
        toast.success("Registration Successful");
        navigate("/login");
      });
    },
  });

  // Check for duplicate email
  async function verifyDuplicateAccount(email) {
    try {
      const response = await axios.get(
        `http://localhost:5000/users?email=${email}`
      );
      return response;
    } catch (error) {
      console.error("Error checking duplicate email:", error);
    }
  }

  // Save user credentials
  async function saveCredentials(values) {
    try {
      const response = await axios.post("http://localhost:5000/users", values);

      if (response.status === 201) {
        return response;
      } else {
        toast.error("Failed to register user");
      }
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <div className="container">
      <div className="sign-container">
        <div className="card-body p-5 signup-box">
          <ToastContainer />
          <div className="register-box">
            <h2 className="text-uppercase text-center mb-5">Sign Up</h2>
            <div className="d-flex align-items-center justify-content-center">
              <img
                src="https://t3.ftcdn.net/jpg/04/40/07/32/240_F_440073209_G5zCsw04ViEwTwapmeMjendrNaqGODTU.jpg"
                alt=""
              />
              <form onSubmit={formik.handleSubmit}>
                <div className="m-2 input-formbox">
                  <img src={person_icon} alt="Person Icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="User Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.name && formik.touched.name
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.errors.name && formik.touched.name && (
                    <div className="error">{formik.errors.name}</div>
                  )}
                </div>
                <div className="m-2 input-formbox">
                  <img src={email_icon} alt="Email Icon" />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.email && formik.touched.email
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="error">{formik.errors.email}</div>
                  )}
                </div>
                <div className="m-2 input-formbox">
                  <img src={password_icon} alt="Password Icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.password && formik.touched.password
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.errors.password && formik.touched.password && (
                    <div className="error">{formik.errors.password}</div>
                  )}
                </div>
                <div className="m-2 input-formbox">
                  <img src={password_icon} alt="Password Icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                      <div className="error">
                        {formik.errors.confirmPassword}
                      </div>
                    )}
                </div>
                <div className="d-flex justify-content-around">
                  <button type="submit" className="signUp-btn">
                    Sign Up
                  </button>
                  <button
                    type="button"
                    className="signUp-btn"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

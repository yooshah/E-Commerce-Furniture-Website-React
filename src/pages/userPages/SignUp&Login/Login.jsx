import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import email_icon from "./signupassets/email.png";
import password_icon from "./signupassets/password.png";
import { checkAccount } from "../../../features/AuthSlice";

// Yup validation schema
const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(
          checkAccount({ email: values.email, password: values.password })
        ).unwrap();

        localStorage.setItem("name", response.name);
        localStorage.setItem("email", response.email);
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);

        if (response.role === "user") {
          navigate("/");
        }
        if (response.role === "admin") {
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error(error.error);
      }
    },
  });

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <ToastContainer />
      <div className="card p-4" style={{ width: "30rem" }}>
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src="https://raw.githubusercontent.com/arunkjojo/FurnitureAppClone/refs/heads/main/assets/images/fn2.jpg"
              alt="image of Sofa"
              className="img-fluid rounded"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-3">
                <div className="d-flex align-items-center">
                  <img src={email_icon} alt="Email Icon" className="me-2" />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${
                      formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                )}
              </div>

              <div className="form-group mb-3">
                <div className="d-flex align-items-center">
                  <img
                    src={password_icon}
                    alt="Password Icon"
                    className="me-2"
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${
                      formik.touched.password && formik.errors.password
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? "Logging in..." : "Login"}
                </button>
                <Link to="/signup">
                  <button type="button" className="btn btn-secondary">
                    Sign Up
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

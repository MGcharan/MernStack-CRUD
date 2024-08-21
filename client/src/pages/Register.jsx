// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// import "../css/signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsShieldLockFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isConfirmDisabled, setIsConfirmDisabled] = useState(true);

  // navigate
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  axios.defaults.withCredentials = true;
  const api_url = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const res = await axios.post(`${api_url}/auth/register`, formData);
        if (res.status === 201 || res.status === 204) {
          toast.success("Signup successful!!", {
            position: "top-right",
          });
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/login");
        } else {
          toast.error(res.data.message || "An error occurred during signup.");
        }
      } catch (err) {
        toast.error(
          err.response?.data?.message || "An error occurred during signup."
        );
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: "",
    }));

    // Enable Confirm Password field if Password field is filled
    if (name === "password" && value.trim().length >= 6) {
      setIsConfirmDisabled(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="form-container bg-white p-4   rounded-3 shadow-lg">
        <div className="lock">
          <BsShieldLockFill className="lock-icon" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className={`form-control rounded-0 ${
                formErrors.name ? "is-invalid" : ""
              }`}
            />
            {formErrors.name && (
              <div className="text-danger">{formErrors.name}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              id="email"
              onChange={handleChange}
              value={formData.email}
              className={`form-control rounded-0 ${
                formErrors.email ? "is-invalid" : ""
              }`}
            />
            {formErrors.email && (
              <div className="text-danger">{formErrors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                className={`form-control rounded-0 ${
                  formErrors.password ? "is-invalid" : ""
                }`}
                onChange={handleChange}
                value={formData.password}
              />
              <span
                className="input-group-text"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <ImEye /> : <ImEyeBlocked />}
              </span>
            </div>
            {formErrors.password && (
              <div className="text-danger">{formErrors.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword">
              <strong>Confirm Password</strong>
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                className={`form-control rounded-0 ${
                  formErrors.confirmPassword ? "is-invalid" : ""
                }`}
                onChange={handleChange}
                value={formData.confirmPassword}
                disabled={isConfirmDisabled}
              />
              <span
                className="input-group-text"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? <ImEye /> : <ImEyeBlocked />}
              </span>
            </div>
            {formErrors.confirmPassword && (
              <div className="text-danger">{formErrors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 my-3"
          >
            Register
          </button>
        </form>
        <p>
          Already Have an Account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoFingerPrintOutline } from "react-icons/io5";
import { PiEyesBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [iconError, setIconError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api_url = import.meta.env.VITE_API_URL;
    try {
      const result = await axios.post(`${api_url}/auth/login`, { email, password });
      if (result.status === 201 && result.data.token) {
        localStorage.setItem("token", result.data.token);
        toast.success("Login Successfully!!");
        setEmail("");
        setPassword("");
        setIconError(false);
        navigate("/");
      } else {
        toast.error(result.data.message || "Oops! Login failed !!");
        setIconError(true);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error("Invalid email or password");
        setIconError(true);
      } else if (err.response && err.response.status === 404) {
        toast.error("User not found");
      } else {
        toast.error("An error occurred");
      }
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center  align-items-center bg-dark vh-100">
      <div className="form-container bg-white  p-4   rounded-3 shadow-lg">
        {/* icon */}
        <div className="lock">
          <IoFingerPrintOutline
            className="lock-icon"
            style={{
              color: "white",
              border: " 2px solid green",
              fontSize: "45px",
            }}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
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
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <span
                className="input-group-text"
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
              >
                <PiEyesBold style={{ color: iconError ? "red" : "black" }} />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success w-100 rounded-0 my-3"
          >
            Login
          </button>
        </form>
        <p>
          Dont Have an Account?{" "}
          <Link to="/signup" className="text-decoration-none">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

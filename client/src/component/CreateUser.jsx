// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  // Set credentials to true to allow cookies and authorization headers
  axios.defaults.withCredentials = true;

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Ensure the token exists before proceeding
    if (!token) {
      toast.error("No token found. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/createUser`,
        { name, email, age },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for a successful status code
      if (res.status === 201 || res.status === 204) {
        navigate("/viewUser");
        toast.success("User created successfully!");
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (err) {
      console.log("Error creating user:", err.response || err.message);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
        <div className="w-50 w-sm-50 w-lg-50 w-md-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Add User</h2>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                placeholder="Enter Age"
                className="form-control"
                onChange={(e) => setAge(e.target.value)}
                value={age}
                required
              />
            </div>
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUser;

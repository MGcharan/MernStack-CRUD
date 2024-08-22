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

  axios.defaults.withCredentials = true;
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to create a user");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/api/createUser`,
        { name, email, age },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token to the request
          },
        }
      );

      // Check for successful status codes
      if (res.status === 201 || res.status === 204) {
        navigate("/viewUser"); // Navigate to the user list view
        toast.success("User created successfully!");
      } else {
        toast.error("Failed to create user. Please try again.");
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="d-flex vh-100  bg-secondary justify-content-center align-items-center">
        <div className="w-50 w-sm-50  w-lg-50 w-md-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Add User</h2>
            <div className="mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                placeholder="Enter Age"
                className="form-control"
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUser;

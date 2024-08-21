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
    try {
      const res = await axios.post(`${API_URL}/api/createUser`, {
        name,
        email,
        age,
      });
      console.log(res);
      navigate("/viewUser");
      toast.success("Created !!!");
    } catch (err) {
      console.log(err);
      toast.error("Something Wrong !");
    }
  };

  return (
    <>
      <div className="d-flex vh-100  bg-secondary justify-content-center align-items-center">
        <div className="w-50 w-sm-50  w-lg-50 w-md-50 bg-white rounded p-3">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Add User</h2>
            <div className="mb-2">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Email</label>
              <input
                type="text"
                placeholder="Enter Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Age</label>
              <input
                type="text"
                placeholder="Enter Age"
                className="form-control"
                onChange={(e) => setAge(e.target.value)}
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

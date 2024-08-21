// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdTipsAndUpdates } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-toastify";

function User() {
  const [users, setUsers] = useState([]);

  axios.defaults.withCredentials = true;
  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    fetchGetItem();
  }, []);

  const fetchGetItem = async () => {
    try {
      const result = await axios.get(`${API_URL}/getUser`);
      if (result.status === 201) {
        setUsers(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [edit, setEdit] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  const handleEdit = (user) => {
    setEdit(user._id);
    setFormData({ name: user.name, email: user.email, age: user.age });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/updateUser/${edit}`, formData);
      setEdit(null);
      fetchGetItem();
      toast.success("Updated Successfully");
    } catch (err) {
      console.log("Error updating user :", err);
      toast.error("Oops ! something Wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteUser/${id}`);
      fetchGetItem();
      toast.success("Deleted successfully");
    } catch (err) {
      console.log("Error deleting user :", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setEdit(null);
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout !!");
  };

  return (
    <>
      <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
        <div className="bg-white w-90 w-sm-75 w-md-50 w-lg-40 rounded p-3">
          <div className="d-flex justify-content-between mb-4">
            <Link to="/" className="btn btn-success mb-4 ">
              {" "}
              Add <IoMdPersonAdd className="mb-1" />
            </Link>{" "}
            <Link
              to="/login"
              onClick={handleLogout}
              className="btn btn-danger  ms-3 mb-4"
            >
              {" "}
              Logout
            </Link>
          </div>

          {users.length === 0 ? (
            <div className="text-center">
              <p>No data to be found</p>
            </div>
          ) : (
            <table className="table ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        {edit === user._id ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        ) : (
                          user.name
                        )}
                      </td>
                      <td>
                        {edit === user._id ? (
                          <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        ) : (
                          user.email
                        )}
                      </td>
                      <td>
                        {edit === user._id ? (
                          <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                          />
                        ) : (
                          user.age
                        )}
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          {edit === user._id ? (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={handleUpdate}
                            >
                              <MdTipsAndUpdates size="20" />
                            </button>
                          ) : (
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => handleEdit(user)}
                            >
                              <FaRegEdit size="20" />
                            </button>
                          )}
                          {edit === user._id ? (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={handleCancel}
                            >
                              <FcCancel size="20" />
                            </button>
                          ) : (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(user._id)}
                            >
                              <MdDelete size="20" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default User;

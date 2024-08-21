import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import User from "./component/User";
import CreateUser from "./component/CreateUser";
import UpdateUser from "./component/UpdateUser";

import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/viewUser" element={<User />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <CreateUser />
              </PrivateRoute>
            }
          />
          <Route path="/update" element={<UpdateUser />} />
        </Routes>
      </Router>
    </>
  );
}

// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if token exists
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;

import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../App.css'



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const loginSubmit = async (e) => {
  e.preventDefault();
  const loginDetails = {
    email,
    password,
  };

  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDetails),
  });
  console.log(res, "login res from /login");
  if (res.ok) { 
    // console.log('/login resp json', data)
    const data =await res.json();
    const userType = data.userType;
    // console.log('usertype ', userType)
    toast.success(`Logged in as : ${userType}`);
    return navigate("/home");

  } else {
    toast.error(`Please check your credentials`);
    return navigate("/");
  }

}


  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">
          Login
        </h2>
        <form onSubmit={loginSubmit}>
          <div className="form-group">
            <label
              htmlFor="email"
              className="form-label"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="form-label"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="submit-button"
            >
              Login
            </button>
            <Link to="#" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>
        <div className="form-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/sign-up" className="sign-up-link">
              Sign Up
            </Link>
          </p>
        </div>
        </form>
      </div>
    </div>
  );
};


const getUserType = () => {
  const authToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Authtoken"))
    ?.split("=")[1];
  console.log("documemnt.cookie vslue", authToken);

  const decoded = jwtDecode(authToken);
  console.log("decoded", decoded);
  const userType = decoded.userType;
  console.log("usertype", userType);
  return userType;
};

export {LoginPage as default, getUserType};
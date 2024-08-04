import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../App.css'

const SignupPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("admin");
  const navigate = useNavigate();

  // signup
  const signupSubmit = async (userDetails) => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    // return;
    console.log(res);
    if (res.ok) {
      toast.success(`Signup success`);
      return navigate("/");
    } else {
      toast.error(`Please check the input data`);
      return navigate("/sign-up");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userDetails = {
      userName,
      password,
      email,
      userType
    };

    signupSubmit(userDetails);
  };

  return (
    <div className="signup-div">
      <div className="signup-container ">
        <h2 className="signup-heading">
          Sign Up
        </h2>
        <form onSubmit={submitForm}>
          <div className="signupform-group">
            <label
              htmlFor="name"
              className="signuplabel"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="signupinput"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="signuplabel"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signupinput"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="signuplabel"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signupinput"
            />
          </div>
          <div className="mb-4">
              <label
                htmlFor="type"
                className="signuplabel"
              >
                Price
              </label>
              <select
                id="userType"
                name="userType"
                className="select"
                required
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
     
              </select>
            </div>
          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="signupbutton"
            >
              Sign Up
            </button>
          </div>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/" className="signuplink">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
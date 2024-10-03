import React, { useState } from "react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
    Role: "",
  });
  const handlelogin = async () => {
    try {
      console.log(data);
      const user = await axios.post("http://localhost:9000/login", {
        email: data.email,
        password: data.password,
        Role: data.Role,
      });
      if (user.status) {
        message.success(" Login Successfully");
        localStorage.setItem("token", user.data);
      }
      console.log(user.status);
      navigate(`${data.Role == "User" ? "/user" : "/admin"}`);
    } catch (error) {
      console.log(error);
      message.error("Invalid Details");
    }
  };
  return (
    <div className="bg-[#234a9f] w-screen h-screen p-8">
      <div className="max-w-sm mx-auto  rounded-lg border-[1px] border-gray-300 p-6 shawdow-xl bg-gray-50">
        <div>
          <h1 className="text-center">Login To Continue</h1>
        </div>

        <div className="space-y-7 mt-3">
          <input
            placeholder="Email"
            type="email"
            required
            value={data.email}
            onChange={(e) => {
              setdata({ ...data, email: e.target.value });
            }}
            className="border-b-[1px] border-gray-300  w-full p-2.5 rounded-md outline-none"
          />
          <input
            placeholder="Password"
            value={data.password}
            onChange={(e) => {
              setdata({ ...data, password: e.target.value });
            }}
            className="border-b-[1px] border-gray-300  w-full p-2.5 rounded-md outline-none"
          />

          <select
            onChange={(e) => {
              setdata({ ...data, Role: e.target.value });
            }}
            className="border-b-[1px] border-gray-300 mb-2 w-full p-2.5 rounded-md outline-none"
          >
            <option value="">Pick your Role</option>
            <option value="User">User</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>
        <button
          onClick={handlelogin}
          className="w-full bg-blue-600 py-2.5 mb-3 rounded-lg text-white"
        >
          Login
        </button>
        <div className="text-center py-2">
          <Link to="/register" className=" font-semibold text-center ">
            Not a user Register?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

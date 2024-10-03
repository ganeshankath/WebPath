import React, { useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    Name: "",
    email: "",
    password: "",
    Role: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!validateEmail(data.email)) {
      message.error("Please enter a valid email address.");
      return;
    }

    try {
      console.log(data);
      const res = await axios.post("http://localhost:9000/register", {
        Name: data.Name,
        email: data.email,
        password: data.password,
        Role: data.Role,
      });
      console.log(res.data);
      localStorage.setItem("token", res.data);
      if (res.data) {
        message.success("Registration Successfully");
        navigate(`${data.Role === "User" ? "/user" : "/admin"}`);
      }
    } catch (err) {
      console.log(err);
      message.error("Registration failed.");
    }
  };

  return (
    <div className="bg-[#234a9f] w-screen h-screen p-8">
      <div className="max-w-sm mx-auto rounded-lg border-[1px] border-gray-300 p-6 shawdow-xl bg-gray-50">
        <div>
          <h1 className="text-center">Register To Continue</h1>
        </div>
        <div className="space-y-7 mt-3">
          <input
            placeholder="Name"
            value={data.Name}
            onChange={(e) => {
              setdata({ ...data, Name: e.target.value });
            }}
            className="border-b-[1px] border-gray-300 w-full p-2.5 rounded-md outline-none"
          />

          <input
            placeholder="Email"
            value={data.email}
            onChange={(e) => {
              setdata({ ...data, email: e.target.value });
            }}
            className="border-b-[1px] border-gray-300 w-full p-2.5 rounded-md outline-none"
          />

          <input
            placeholder="Password"
            value={data.password}
            onChange={(e) => {
              setdata({ ...data, password: e.target.value });
            }}
            className="border-b-[1px] border-gray-300 w-full p-2.5 rounded-md outline-none"
          />
          <select
            onChange={(e) => {
              setdata({ ...data, Role: e.target.value });
            }}
            className="border-b-[1px] border-gray-300 w-full p-2.5 rounded-md outline-none"
          >
            <option value="">Pick your Role</option>
            <option value="User">User</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 py-2.5 mb-3 rounded-lg text-white"
        >
          Register
        </button>
        <div className="text-center py-2">
          <Link to="/login" className="font-semibold text-center">
            Already a user? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

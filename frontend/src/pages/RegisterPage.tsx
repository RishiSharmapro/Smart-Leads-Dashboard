import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "sales",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.SubmitEvent
  ) => {
    e.preventDefault();

    await api.post(
      "/auth/register",
      formData
    );

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full border p-3 rounded mb-4"
          onChange={handleChange}
        >
          <option value="sales">
            Sales
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        <button
          className="w-full bg-black text-white p-3 rounded"
        >
          Register
        </button>
      </form>

      <div>
        Already registered?  &nbsp;
        <span 
          onClick={() => navigate("/login")} 
          className="text-blue-500 cursor-pointer"
          >
            Login here
        </span>
      </div>
    </div>
  );
};

export default RegisterPage;
"use client";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa6";

const AddUser = () => {
  const { login, user, setIsLogin } = useAuth();

  const router = useRouter();
  const [apiMessage, setApiMessage] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/signin");
    } else {
      async function fetchData() {
        const getProfileData = await axios
          .get(`${process.env.BASE_URL}profile`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          })
          .then((response) => {
            setIsLogin(true);
            login(response.data);
          })
          .then(() => {
            setIsLoading(false);
          });
      }
      fetchData();
    }
  }, [isLoading, login, setIsLogin, router]);

  const [formData, setFormData] = useState({
    // confirmPassword: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Validate form data (you can add your validation logic here)

    // Assuming you have an API endpoint to submit the form data
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}register-employee`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.status === 201) {
        // Handle success, e.g., show a success message
        console.log("User added successfully!", response.data.message);
        setApiMessage(response.data.message);
        const timer = setTimeout(() => {
          setApiMessage(null);
          router.push("/");
        }, 3000);
      } else {
        // Handle error, e.g., show an error message
        console.error("Error adding user");
        setApiMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center  h-screen ">
      {apiMessage && (
        <div className="absolute lg:top-[70px] lg:right-2 w-[400px] h-[60px] bg-blue-200 flex items-center justify-start rounded-md shadow-sm font-semibold p-2 gap-3">
          <FaBell />
          {apiMessage}
        </div>
      )}
      <div className="bg-white p-8 rounded-md shadow-md w-full lg:w-[500px]">
        <div className="text-2xl font-semibold mb-4">Register New User</div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              User Type
            </label>
            <select
              id="role"
              name="role"
              value={formData.userRole}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="SERVICE">Service</option>
              <option value="PAYMENT">Payment</option>
              <option value="PRODUCT">Product</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

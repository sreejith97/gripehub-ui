"use client";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingForm from "./loadingForm";

const AddCompalints = () => {
  const router = useRouter();
  const { login, user, setIsLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    productName: "",
    topic: "",
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/signin");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.BASE_URL}profile`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          setIsLogin(true);
          login(response.data);
          setIsLoading(false);
          setFormData((prevData) => ({
            ...prevData,
            email: response.data.user.email,
          }));
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);

          if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized: Redirect to login
            router.push("/signin");
          } else {
            // Handle other errors
            setIsLogin(false);
            setIsLoading(false);
            // You might want to handle errors differently
          }
        }
      };

      fetchData();
    }
  }, [isLoading, login, router, setIsLogin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true); // Set loading to true when starting the request
    try {
      const response = await fetch(
        `${process.env.BASE_URL}register-complaint`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Handle success, e.g., show a success message
        setMessage(true);
        console.log("Complaint submitted successfully!");

        // Delay the router push to give time for the success message to be seen
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        // Handle error, e.g., show an error message
        console.error("Error submitting complaint");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or error
    }
  };
  return (
    <div className="mt-[100px]">
      {isLoading ? (
        <LoadingForm />
      ) : (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-6">Add Complaint</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                User Email
              </label>
              <input
                type="email"
                name="email"
                value={user?.user?.email}
                onChange={handleChange}
                disabled
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Topic
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Complaint Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>

            {message && (
              <div className="w-full flex items-center justify-center text-red-500">
                Check your email for details {formData.email || "user email"}
              </div>
            )}
            <div className="flex w-full justify-center items-center mt-5">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCompalints;

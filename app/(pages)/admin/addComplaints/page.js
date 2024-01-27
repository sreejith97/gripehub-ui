"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LoadingPage from "./loadingPage";
import axios from "axios";

const AddCompalints = () => {
  const router = useRouter();
  const [message, setMessage] = useState(false);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    message: "",
    productName: "",
    topic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Validate form data (you can add your validation logic here)

    // Set isLoading to true before making the API call
    setIsLoading(true);

    // Assuming you have an API endpoint to submit the form data
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}register-complaint`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.data.message === "success") {
        // Handle success, e.g., show a success message
        console.log("Complaint submitted successfully!");
        setIsFormSubmitted(true);
      } else {
        // Handle error, e.g., show an error message
        console.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // Set isLoading back to false after the API call is complete
      setMessage(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-6">Add Complaint</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                Name
              </label>
              <input
                type="text"
                name="userName"
                // value={formData.userEmail}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">
                User Email
              </label>
              <input
                type="email"
                name="email"
                // value={formData.userEmail}
                onChange={handleChange}
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
                value={formData.complaintMessage}
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

"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddCompalints = () => {
  const router = useRouter();

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

    // Validate form data (you can add your validation logic here)

    // Assuming you have an API endpoint to submit the form data
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
        console.log("Complaint submitted successfully!");
        router.push("/");
      } else {
        // Handle error, e.g., show an error message
        console.error("Error submitting complaint");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
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
              value={formData.userEmail}
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

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompalints;

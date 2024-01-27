"use client";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";

const UpdateStatus = ({ prevComplaintData, setIsEditEnable }) => {
  console.log(prevComplaintData);

  const [updateComplaint, setUpdateComplaint] = useState({
    status: "", // Initialize with the existing status value
    message: "",
    heading: "",
    complaintNumber: prevComplaintData.complaintNumber, // Initialize with the existing heading value
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateComplaint((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setUpdateComplaint((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(updateComplaint);

    try {
      const response = await axios.post(
        `${process.env.BASE_URL}update-complaint`,
        {
          complaintNumber: updateComplaint.complaintNumber,
          status: updateComplaint.status,
          message: updateComplaint.message,
          heading: updateComplaint.heading,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.data.message === "success") {
        console.log("Update successful");
        setIsEditEnable(false);
        // onUpdateSuccess(response.data.complaint);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Status:
          </label>
          <select
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="status"
            name="status"
            onChange={handleStatusChange}
            value={updateComplaint.status}
          >
            <option value="" disabled selected>
              Select Status
            </option>
            <option value="COMPLETED">Completed</option>
            <option value="PROGRESSING">Progress</option>
            {/* Add more status options as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            name="message"
            onBlur={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="heading"
          >
            Heading:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="heading"
            type="text"
            name="heading"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex items-center justify-center gap-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:shadow-outline"
          >
            Update Complaint
          </button>
          <button
            className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:shadow-outline"
            onClick={(err) => {
              setIsEditEnable(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateStatus;

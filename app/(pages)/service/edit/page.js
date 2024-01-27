"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Edit = ({ searchParams }) => {
  const [complaint, setComplaint] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("");
  const availableTags = ["service", "product", "payment"];
  const [isEditEnable, setIsEditEnable] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          `${process.env.BASE_URL}find-complaint-details`,
          { complaintNumber: searchParams.id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        setComplaint(response.data.complaint);
        setSelectedTag(response.data.complaint.tag);
        setIsLoading(false);
      } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 401) {
          router.push("/");
          console.log("Unauthorized access. Redirecting to login page.");
        } else {
          setComplaint(null);
        }
      }
    }

    fetchData();
  }, [isEditEnable, searchParams.id]);

  const handleTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  useEffect(() => {
    // Call the API only when selectedTag is not an empty string
    if (selectedTag) {
      handleSubmit();
    }
  }, [selectedTag]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}update-tag`,
        {
          complaintNumber: complaint.complaintNumber,
          tag: selectedTag,
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
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <>
      {!isLoading && complaint && (
        <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-xl font-bold mb-4">{complaint.topic}</h1>
          </div>

          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              Complaint Number:{" "}
              <span className="font-semibold">{complaint.complaintNumber}</span>
            </p>
            <p className="text-gray-600 mb-2">
              User email:{" "}
              <span className="font-semibold">{complaint.email}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Registered By:{" "}
              <span className="font-semibold">{complaint.registerdBy}</span>
            </p>
            <div className="mb-2">
              <label className="text-gray-600">Tag:</label>
              <select
                value={selectedTag}
                onChange={handleTagChange}
                className="border rounded-md px-2 py-1"
              >
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-gray-600 mb-2">
              Product Name:{" "}
              <span className="font-semibold">{complaint.productName}</span>
            </p>
            <p className="text-gray-600 mb-2">Status: {complaint.status}</p>
            <p className="text-gray-600 mb-2">
              Reported Time: {new Date(complaint.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Complaint Message:</h2>
            <p>{complaint.message}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Status Change Messages:</h2>
            {complaint.statusChangeMessages.map((message) => (
              <div key={message.id} className="mb-2">
                <p className="font-bold text-[18px]">
                  {message.heading}{" "}
                  <span className={`text-[14px] text-green-500`}>
                    {message.status}
                  </span>
                </p>
                <p className="text-gray-600 text-sm">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
                <p>{message.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;

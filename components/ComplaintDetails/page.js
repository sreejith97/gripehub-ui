"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ComplaintDetails = ({ complaint }) => {
  //   const [reportedUser, setReportedUser] = useState();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">{complaint.topic}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            Complaint Number:{" "}
            <span className="font-semibold">{complaint.complaintNumber}</span>
          </p>
          <p className="text-gray-600 mb-2">
            Complaint Category:{" "}
            <span className="font-semibold capitalize">{complaint.tag}</span>
          </p>
          <p className="text-gray-600 mb-2">
            Product Name: {complaint.productName}
          </p>
          <p className="text-gray-600 mb-2">Status: {complaint.status}</p>
          <p className="text-gray-600 mb-4">
            Registered By: {complaint.registerdBy}
          </p>
        </div>

        <div className="md:col-span-2 lg:col-span-3 mb-4">
          <h2 className="text-xl font-bold mb-2">Complaint:</h2>
          <p>{complaint.message}</p>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Status Change Messages:</h2>
        {complaint.statusChangeMessages.map((message) => (
          <div key={message.id} className="mb-2">
            <p className="font-bold text-[18px]">
              {message.heading}
              <span
                className={`text-[14px] ${
                  message.status === "SUBMITTED"
                    ? "text-red-500"
                    : message.status === "PROGRESSING"
                    ? "text-yellow-500"
                    : message.status === "COMPLETED"
                    ? "text-green-500"
                    : "text-slate-500"
                }`}
              >
                {" "}
                {message.status}
              </span>
            </p>
            <p className="text-gray-600 text-sm">
              {formatDate(message.createdAt)}
            </p>
            <p>{message.message}</p>
          </div>
        ))}
      </div>

      {/* <p className="text-gray-600">
        Created At: {formatDate(complaint.createdAt)} | Updated At:{" "}
        {formatDate(complaint.updatedAt)}
      </p> */}
    </div>
  );
};

export default ComplaintDetails;

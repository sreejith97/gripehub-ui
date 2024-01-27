"use client";
import React from "react";

const MobileDesign = ({ complaints }) => {
  return (
    <>
      <div className="lg:overflow-x-hidden overflow-x-scroll w-[400px] lg:w-auto lg:hidden">
        <div className="w-full overflow-x-scroll">
          {complaints.map((complaint, key) => (
            <div key={key} className="mb-4 border border-gray-300 p-4">
              <div className="mb-2">
                <strong>Complaint Number:</strong> {complaint.complaintNumber}
              </div>
              <div className="mb-2">
                <strong>Topic:</strong> {complaint.topic}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {complaint.email}
              </div>
              <div className="mb-2">
                <strong>Tag:</strong> {complaint.tag}
              </div>
              <div className="mb-2">
                <strong>Product Name:</strong> {complaint.productName}
              </div>
              <div
                className={`mb-2 ${
                  complaint.status === "SUBMITTED"
                    ? "text-red-500"
                    : complaint.status === "PROCESSING"
                    ? "text-yellow-500"
                    : complaint.status === "COMPLETED"
                    ? "text-green-500"
                    : "text-slate-500"
                }`}
              >
                <strong>Status:</strong> {complaint.status}
              </div>
              <div className="mb-2">
                <strong>Created At:</strong> {complaint.createdAt}
              </div>
              <div className="bg-yellow-300 p-2 rounded-xl flex items-center justify-center uppercase font-bold text-[14px] mx-20 my-5">
                <span
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => {
                    router.push({
                      pathname: isUser ? "/user/timeline" : "/edit",
                      query: {
                        id: complaint.complaintNumber,
                        user: isUser || null,
                      },
                    });
                  }}
                >
                  {isUser ? "View" : "Edit"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileDesign;

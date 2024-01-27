"use client";
import Link from "next/link";
import React, { useState } from "react";

const MobileDesign = ({ complaints, isUser }) => {
  const [sortBy, setSortBy] = useState({
    field: "createdAt",
    order: "asc",
  });

  const formatCreatedAt = (createdAt) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(createdAt)
    );
  };

  const handleSort = (field) => {
    setSortBy((prevSortBy) => ({
      field,
      order:
        prevSortBy.field === field && prevSortBy.order === "asc"
          ? "desc"
          : "asc",
    }));
  };
  const sortedComplaints = [...complaints].sort((a, b) => {
    if (sortBy.field === "status") {
      return sortBy.order === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else if (sortBy.field === "createdAt") {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortBy.order === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      return 0; // No sorting for other fields
    }
  });
  return (
    <>
      <div className="lg:overflow-x-hidden overflow-x-scroll w-[400px] lg:w-auto lg:hidden">
        <div className="w-full overflow-x-scroll">
          {sortedComplaints.map((complaint) => (
            <div key={complaint.id} className="mb-4 border border-gray-300 p-4">
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
                <strong>Created At:</strong>{" "}
                {formatCreatedAt(complaint.createdAt)}
              </div>
              <div className="bg-yellow-300 p-2 rounded-xl flex items-center justify-center uppercase font-bold text-[14px] mx-20 my-5">
                <Link
                  href={{
                    pathname: isUser ? "/user/timeline" : "/edit",
                    query: {
                      id: complaint.complaintNumber,
                      user: isUser || null,
                    },
                  }}
                >
                  <span className="text-blue-500 hover:underline">
                    {isUser ? "View" : "Edit"}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileDesign;

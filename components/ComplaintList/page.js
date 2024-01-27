"use client";
import Link from "next/link";
import React, { useState } from "react";
import MobileDesign from "./mobileDesign";

const ComplaintList = ({ complaints, isUser }) => {
  const [sortBy, setSortBy] = useState({ field: "createdAt", order: "asc" });

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
      <div className="lg:overflow-x-hidden overflow-x-scroll w-[400px] lg:w-auto hidden lg:block">
        <div className="w-full overflow-x-scroll">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="hidden md:table-header-group">
              <tr>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("complaintNumber")}
                >
                  Complaint Number
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("topic")}
                >
                  Topic
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("tag")}
                >
                  Tag
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("productName")}
                >
                  Product Name
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status
                  {sortBy.field === "status" && (
                    <span className="ml-1">
                      {sortBy.order === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Created At
                  {sortBy.field === "createdAt" && (
                    <span className="ml-1">
                      {sortBy.order === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.complaintNumber}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.topic}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.tag}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {complaint.productName}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 ${
                      complaint.status === "SUBMITTED"
                        ? "text-red-500"
                        : complaint.status === "PROCESSING"
                        ? "text-yellow-500"
                        : complaint.status === "COMPLETED"
                        ? "text-green-500"
                        : "text-slate-500"
                    }`}
                  >
                    {complaint.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatCreatedAt(complaint.createdAt)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MobileDesign complaints={complaints} isUser={isUser} />
    </>
  );
};

export default ComplaintList;

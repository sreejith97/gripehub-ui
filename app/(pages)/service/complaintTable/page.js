"use client";
import Link from "next/link";
import React from "react";
import MobileDesign from "./mobileDesign";

const ComplaintTable = ({ complaints, isUser }) => {
  return (
    <>
      <div className="lg:overflow-x-hidden overflow-x-scroll w-[400px] lg:w-auto hidden lg:block">
        <div className="w-full overflow-x-scroll">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="hidden md:table-header-group">
              <tr>
                <th className="border border-gray-300 px-4 py-2">
                  Complaint Number
                </th>
                <th className="border border-gray-300 px-4 py-2">Topic</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Tag</th>
                <th className="border border-gray-300 px-4 py-2">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
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
                    {complaint.createdAt}
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

export default ComplaintTable;

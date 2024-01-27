"use client";
import ShowDetails from "@/components/ShowDetails/page";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const CheckStatus = () => {
  const [complaintId, setComplaintId] = useState("");
  const [complaintDetails, setComplaintDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isShowDetail, setIsShowDetail] = useState(false);

  return (
    <div>
      <div className="mt-8 max-w-md mx-auto">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={complaintId}
            onChange={(e) => {
              setIsShowDetail(false);
              setComplaintId(e.target.value);
            }}
            placeholder="Enter Complaint ID"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={() => {
              setIsShowDetail(true);
            }}
          >
            Get Details
          </button>
        </div>

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>

      {isShowDetail && (
        <ShowDetails
          complaintNumber={complaintId}
          setIsShowDetail={setIsShowDetail}
          setError={setError}
        />
      )}
    </div>
  );
};

export default CheckStatus;

// Import the required modules
"use client";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import SkeltonLoading from "./skeltonLoading";
import Details from "./details";
import UpdateStatus from "./updateStatus";

const UserComplaintTimeline = ({ complaintNumber }) => {
  console.log(complaintNumber);
  const [complaint, setComplaint] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditEnable, setIsEditEnable] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          `${process.env.BASE_URL}find-complaint-details`,
          { complaintNumber: complaintNumber }, // Use dynamic complaintNumber
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (response.data.complaint == null) {
          setError(
            "Failed to fetch updated complaint details. Please Check the Complaint ID"
          );
          setIsLoading(false);
        } else {
          setComplaint(response.data.complaint);
          console.log(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);

        if (error.response && error.response.status === 401) {
          // Handle unauthorized access, e.g., redirect to login
          router.push("/");
          console.log("Unauthorized access. Redirecting to login page.");
        } else {
          // Handle other response errors
          setComplaint(null);
        }
      }
    }

    fetchData();
  }, [isEditEnable, complaintNumber]); // Include searchParams.id in dependency array

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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

  //   if (isLoading) {
  //     return (
  //       <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
  //         <SkeltonLoading />
  //       </div>
  //     );
  //   }

  //   return <Details complaint={complaint} />;

  return (
    <>
      {isLoading && !isEditEnable ? (
        <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-md shadow-md">
          <SkeltonLoading />
        </div>
      ) : isEditEnable ? (
        <UpdateStatus
          prevComplaintData={complaint}
          setIsEditEnable={setIsEditEnable}
        />
      ) : error ? (
        <div className="w-full flex items-center justify-center my-10 text-red-400">
          {error}
        </div>
      ) : (
        <Details
          complaint={complaint}
          isEditEnable={isEditEnable}
          setIsEditEnable={setIsEditEnable}
        />
      )}
    </>
  );
};

export default UserComplaintTimeline;

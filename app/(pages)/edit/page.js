// Import the required modules
"use client";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import SkeltonLoading from "./skeltonLoading";
import Details from "./details";
import UpdateStatus from "./updateStatus";

const Edit = ({ searchParams }) => {
  const [complaint, setComplaint] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditEnable, setIsEditEnable] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          `${process.env.BASE_URL}find-complaint-details`,
          { complaintNumber: searchParams.id }, // Use dynamic complaintNumber
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );

        setComplaint(response.data.complaint);
        console.log(response.data);
        setIsLoading(false);
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
  }, [isEditEnable, searchParams.id]); // Include searchParams.id in dependency array

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
      ) : (
        <Details
          isUser={searchParams.user}
          complaint={complaint}
          isEditEnable={isEditEnable}
          setIsEditEnable={setIsEditEnable}
        />
      )}
    </>
  );
};

export default Edit;

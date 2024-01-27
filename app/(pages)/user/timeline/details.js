import React from "react";
import { FaPen } from "react-icons/fa6";

const Details = ({ complaint, setIsEditEnable }) => {
  const formatCreatedAt = (createdAt) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
  };
  return (
    <>
      <div className=" w-full flex flex-row justify-center items-start ">
        <div className="mt-4 p-4 border rounded-md lg:w-[600px] shadow-xl h-screen lg:h-auto">
          <div className="flex items-center justify-center ">
            <h2 className="text-[25px] font-semibold mb-10 ">
              Complaint Details
            </h2>
          </div>

          <div className="mb-4">
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-900">Complaint Number:</span>{" "}
              {complaint.complaintNumber}
            </p>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-900">Registered By:</span>{" "}
              {complaint.registerdBy}
            </p>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              <span className="font-bold text-gray-900">Tag:</span>{" "}
              {complaint.tag}
            </p>
            {/* Add more fields as needed */}
          </div>

          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {complaint?.statusChangeMessages?.map((message) => (
              <li key={message.id} className="mb-10 ms-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time
                  className={`mb-1 text-sm  leading-none font-bold ${
                    message.status === "SUBMITTED"
                      ? "text-red-500"
                      : message.status === "PROGRESSING"
                      ? "text-yellow-500"
                      : message.status === "COMPLETED"
                      ? "text-green-500"
                      : "text-slate-500"
                  } `}
                >
                  {message.status} -{" "}
                  {new Date(message.createdAt).toLocaleString()}
                </time>
                <h3 className="text-lg font-semibold text-gray-900">
                  {message.heading}
                </h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                  {message.message}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Details;

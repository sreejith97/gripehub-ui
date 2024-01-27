import React from "react";

const LoadingForm = () => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md animate__animated animate__fadeIn">
      <div className="animate__animated animate__fadeIn">
        <div className="mb-4 bg-gray-300 h-8 w-full rounded-md animate-pulse"></div>
        <div className="mb-4 bg-gray-300 h-8 w-full rounded-md animate-pulse"></div>
        <div className="mb-4 bg-gray-300 h-8 w-full rounded-md animate-pulse"></div>
        <div className="mb-4 bg-gray-300 h-8 w-full rounded-md animate-pulse"></div>
        <div className="mb-4 bg-gray-300 h-8 w-full rounded-md animate-pulse"></div>
        <div className="mb-4 bg-gray-300 h-8 w-full rounded-md animate-pulse"></div>
        <button className="bg-gray-300 text-gray-300 p-2 rounded-md cursor-not-allowed">
          Submit
        </button>
      </div>
    </div>
  );
};

export default LoadingForm;

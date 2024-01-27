import React from "react";

const SkeltonLoading = () => {
  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-6 rounded-md shadow-md animate-pulse">
      <div className="flex flex-row items-center justify-between">
        <div className="h-6 w-1/4 bg-gray-300 rounded mb-4"></div>
        <div className="h-12 w-12 bg-yellow-300 rounded-full flex items-center justify-center">
          <div className="h-6 w-6 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="mb-4">
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-4"></div>
        </div>

        <div className="md:col-span-2 lg:col-span-3 mb-4">
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
        <div className="h-6 w-full bg-gray-300 rounded mb-2"></div>
      </div>
    </div>
  );
};

export default SkeltonLoading;

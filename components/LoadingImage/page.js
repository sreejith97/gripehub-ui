import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen absolute w-full top-0">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-20 w-20"></div>
    </div>
  );
};

export default LoadingPage;

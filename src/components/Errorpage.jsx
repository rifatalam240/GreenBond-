import React from "react";
import { Link } from "react-router";

const Errorpage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <div className="mt-4 text-3xl font-bold text-base-content">
            Oops! Page not found
          </div>
          <p className="mt-4 text-base-content/70">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link to="/" className="btn btn-primary">
          Back to Homepage
        </Link>

        <div className="mt-8 animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Errorpage;

import React from "react";

interface NotificationProps {
  type: "error" | "success";
  message: string;
}

/**
 * Notification component for displaying error or success messages.
 * Accessible and reusable.
 */
const Notification: React.FC<NotificationProps> = ({ type, message }) => {
  if (!message) return null;
  const isError = type === "error";
  return (
    <div
      className={`mb-6 ${
        isError
          ? "bg-red-50 border-l-4 border-red-500"
          : "bg-green-50 border-l-4 border-green-500"
      } p-4 rounded`}
      role="alert"
      aria-live="assertive"
      tabIndex={0}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          {isError ? (
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-3">
          <p
            className={`text-sm ${isError ? "text-red-700" : "text-green-700"}`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Notification;

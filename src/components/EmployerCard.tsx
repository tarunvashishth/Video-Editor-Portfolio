import { Employer, EmploymentType, Video } from "@/types/portfolio";
import VideoCard from "./VideoCard";
import React from "react";

interface EmployerCardProps {
  employer: Employer;
  isEditing: boolean;
  onEmployerChange: (
    field: keyof Employer,
    value: string | EmploymentType
  ) => void;
  onRemoveEmployer: () => void;
  onAddVideo: () => void;
  onVideoChange: (videoId: string, field: keyof Video, value: string) => void;
  onRemoveVideo: (videoId: string) => void;
}

/**
 * EmployerCard displays and edits an employer's information and videos.
 * Modular for reuse and clarity.
 */
const EmployerCard: React.FC<EmployerCardProps> = ({
  employer,
  isEditing,
  onEmployerChange,
  onRemoveEmployer,
  onAddVideo,
  onVideoChange,
  onRemoveVideo,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Employer Header */}
      <div className="p-8 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              {employer.name}
            </h3>
            <p className="text-lg text-gray-600">{employer.jobTitle}</p>
          </div>
          <div className="text-right flex items-start gap-4">
            <div>
              <p className="text-gray-600">{employer.duration}</p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mt-2">
                {employer.type}
              </span>
            </div>
            {isEditing && (
              <button
                onClick={onRemoveEmployer}
                className="p-2 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg transition-colors"
                aria-label="Remove employer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        {isEditing ? (
          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={employer.name}
                onChange={(e) => onEmployerChange("name", e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                placeholder="Enter company name"
                aria-label="Company Name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={employer.jobTitle}
                  onChange={(e) => onEmployerChange("jobTitle", e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Enter job title"
                  aria-label="Job Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={employer.duration}
                  onChange={(e) => onEmployerChange("duration", e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  placeholder="Enter duration"
                  aria-label="Duration"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Type
              </label>
              <select
                value={employer.type}
                onChange={(e) =>
                  onEmployerChange("type", e.target.value as EmploymentType)
                }
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                aria-label="Employment Type"
              >
                <option value="full-time">Full Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contribution
              </label>
              <textarea
                value={employer.contribution}
                onChange={(e) =>
                  onEmployerChange("contribution", e.target.value)
                }
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                rows={3}
                placeholder="Describe your contributions..."
                aria-label="Contribution"
              />
            </div>
          </div>
        ) : (
          <div className="mt-6 prose prose-lg max-w-none">
            <p className="text-gray-700">{employer.contribution}</p>
          </div>
        )}
      </div>
      {/* Project Videos */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
        <h3 className="text-xl font-bold mb-2 text-gray-900">Project Videos</h3>
        {isEditing && (
          <button
            onClick={onAddVideo}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            aria-label="Add Video"
          >
            Add Video
          </button>
        )}
        {employer.videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {employer.videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isEditing={isEditing}
                onVideoChange={(field, value) =>
                  onVideoChange(video.id, field, value)
                }
                onRemove={() => onRemoveVideo(video.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              No Videos Yet
            </h4>
            <p className="text-gray-500 max-w-sm mx-auto">
              {isEditing
                ? "Click 'Add Video' to showcase your work for this client"
                : "This client's videos will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerCard;

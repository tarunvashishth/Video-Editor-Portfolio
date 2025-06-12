"use client";

import { useState } from "react";
import { mockPortfolio } from "@/data/mockPortfolio";
import { EmploymentType, Portfolio, Employer, Video } from "@/types/portfolio";
import React from "react";
import EmployerCard from "@/components/EmployerCard";
import Notification from "@/components/Notification";

export default function ProfilePage() {
  const [portfolio, setPortfolio] = useState<Portfolio>(mockPortfolio);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleBasicChange = (
    field: keyof Pick<Portfolio, "firstName" | "lastName" | "summary">,
    value: string
  ) => {
    setPortfolio((prev: Portfolio) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleEmployerChange = (
    employerId: string,
    field: keyof Employer,
    value: string | EmploymentType
  ) => {
    setPortfolio((prev: Portfolio) => ({
      ...prev,
      employers: prev.employers.map((emp: Employer) =>
        emp.id === employerId ? { ...emp, [field]: value } : emp
      ),
    }));
    setError(null);
  };

  const handleAddVideo = (employerId: string) => {
    // Use uuid for unique video IDs
    const newVideo: Video = {
      id: crypto.randomUUID(),
      title: "",
      url: "",
      thumbnail: "",
    };
    setPortfolio((prev: Portfolio) => ({
      ...prev,
      employers: prev.employers.map((emp) =>
        emp.id === employerId
          ? { ...emp, videos: [...emp.videos, newVideo] }
          : emp
      ),
    }));
  };

  const handleRemoveVideo = (employerId: string, videoId: string) => {
    setPortfolio((prev: Portfolio) => ({
      ...prev,
      employers: prev.employers.map((emp) =>
        emp.id === employerId
          ? { ...emp, videos: emp.videos.filter((v) => v.id !== videoId) }
          : emp
      ),
    }));
  };

  const handleVideoChange = (
    employerId: string,
    videoId: string,
    field: keyof Video,
    value: string
  ) => {
    setPortfolio((prev: Portfolio) => ({
      ...prev,
      employers: prev.employers.map((emp) =>
        emp.id === employerId
          ? {
              ...emp,
              videos: emp.videos.map((video) =>
                video.id === videoId ? { ...video, [field]: value } : video
              ),
            }
          : emp
      ),
    }));
  };

  const handleAddEmployer = () => {
    // Prevent adding if the last employer has empty required fields
    const lastEmployer = portfolio.employers[portfolio.employers.length - 1];
    if (lastEmployer && isEditing) {
      if (
        !lastEmployer.name.trim() ||
        !lastEmployer.jobTitle.trim() ||
        !lastEmployer.duration.trim() ||
        !lastEmployer.contribution.trim()
      ) {
        setError(
          "Please fill out all required fields in the previous experience before adding a new one."
        );
        return;
      }
    }
    const newEmployer: Employer = {
      id: Date.now().toString(),
      name: "",
      jobTitle: "",
      duration: "",
      type: "full-time",
      contribution: "",
      videos: [],
    };
    setPortfolio((prev: Portfolio) => ({
      ...prev,
      employers: [...prev.employers, newEmployer],
    }));
  };

  const handleRemoveEmployer = (employerId: string) => {
    setPortfolio((prev: Portfolio) => ({
      ...prev,
      employers: prev.employers.filter((emp) => emp.id !== employerId),
    }));
  };

  const validateForm = () => {
    if (!portfolio.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!portfolio.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!portfolio.summary.trim()) {
      setError("Summary is required");
      return false;
    }
    // Validate all employer and video fields
    for (const emp of portfolio.employers) {
      if (
        !emp.name.trim() ||
        !emp.jobTitle.trim() ||
        !emp.duration.trim() ||
        !emp.contribution.trim()
      ) {
        setError(
          "Please fill out all required fields for every experience before saving."
        );
        return false;
      }
      for (const vid of emp.videos) {
        if (!vid.title.trim() || !vid.url.trim() || !vid.thumbnail.trim()) {
          setError(
            "Please fill out all required fields for every video before saving."
          );
          return false;
        }
      }
    }
    return true;
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/savePortfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(portfolio),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess("Profile updated successfully");
        setIsEditing(false);
      } else {
        setError("Failed to save profile. Please try again.");
      }
    } catch {
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setPortfolio(mockPortfolio);
    setIsEditing(false);
    setError(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Notifications */}
        <Notification
          type={error ? "error" : "success"}
          message={error || success || ""}
        />
        {/* Basic Info Section */}
        <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {portfolio.firstName} {portfolio.lastName}
              </h1>
            </div>
            <div className="flex gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center"
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={portfolio.firstName}
                    onChange={(e) =>
                      handleBasicChange("firstName", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={portfolio.lastName}
                    onChange={(e) =>
                      handleBasicChange("lastName", e.target.value)
                    }
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={portfolio.summary}
                  onChange={(e) => handleBasicChange("summary", e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500"
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {portfolio.summary}
              </p>
            </div>
          )}
        </section>

        {/* Employers/Clients Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Experience</h2>
            {isEditing && (
              <button
                onClick={handleAddEmployer}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                aria-label="Add Experience"
              >
                Add Experience
              </button>
            )}
          </div>
          <div className="space-y-8">
            {portfolio.employers.map((employer: Employer) => (
              <EmployerCard
                key={employer.id}
                employer={employer}
                isEditing={isEditing}
                onEmployerChange={(field, value) =>
                  handleEmployerChange(employer.id, field, value)
                }
                onRemoveEmployer={() => handleRemoveEmployer(employer.id)}
                onAddVideo={() => handleAddVideo(employer.id)}
                onVideoChange={(videoId, field, value) =>
                  handleVideoChange(employer.id, videoId, field, value)
                }
                onRemoveVideo={(videoId) =>
                  handleRemoveVideo(employer.id, videoId)
                }
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

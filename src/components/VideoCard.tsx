import { Video } from "@/types/portfolio";
import Image from "next/image";

// Helper to check if a string is a valid URL or a non-empty relative path
function isValidImageUrl(url?: string): boolean {
  if (!url || typeof url !== "string") return false;
  // Accept relative paths (e.g., /placeholder.jpg)
  if (url.startsWith("/")) return true;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

interface VideoCardProps {
  video: Video;
  isEditing: boolean;
  onVideoChange: (field: keyof Video, value: string) => void;
  onRemove: () => void;
}

export default function VideoCard({
  video,
  isEditing,
  onVideoChange,
  onRemove,
}: VideoCardProps) {
  if (isEditing) {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={video.title}
                onChange={(e) => onVideoChange("title", e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm"
                placeholder="Enter video title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Video URL
              </label>
              <input
                type="url"
                value={video.url}
                onChange={(e) => onVideoChange("url", e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm"
                placeholder="Enter video URL"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail URL
            </label>
            <input
              type="url"
              value={video.thumbnail}
              onChange={(e) => onVideoChange("thumbnail", e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 text-sm"
              placeholder="Enter thumbnail URL"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={onRemove}
              className="px-3 py-1.5 text-red-600 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg transition-colors text-sm"
            >
              Remove Video
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Display mode: only title and clickable thumbnail
  const imageSrc = isValidImageUrl(video.thumbnail)
    ? video.thumbnail!
    : "/placeholder.jpg";

  return (
    <div className="group relative rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-gray-50">
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Image
          src={imageSrc}
          alt={video.title}
          width={400}
          height={160}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
          style={{ width: "100%", height: "160px", objectFit: "cover" }}
          priority={true}
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition">
          <svg
            className="w-10 h-10 text-white mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white font-bold text-lg drop-shadow text-center px-2">
            {video.title}
          </span>
        </div>
      </a>
    </div>
  );
}

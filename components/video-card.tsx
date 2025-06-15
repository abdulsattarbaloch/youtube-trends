// components/video-display.tsx
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber, getTimeAgo } from "@/lib/utils";
import { YouTubeVideo } from "@/lib/youtube";
import {
  Clock,
  ExternalLink,
  Eye,
  Grid3X3,
  List,
  MessageCircle,
  ThumbsUp,
  User,
} from "lucide-react";

export type ViewMode = "list" | "grid";
export type SortMode = "viral" | "views";

interface VideoDisplayProps {
  videos: YouTubeVideo[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

interface VideoItemProps {
  video: YouTubeVideo;
  rank: number;
  viewMode: ViewMode;
}

function VideoItem({ video, rank, viewMode }: VideoItemProps) {
  const handleVideoClick = () => {
    window.open(video.videoUrl, "_blank", "noopener,noreferrer");
  };

  if (viewMode === "list") {
    return (
      <Card className="py-0 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group">
        <div className="flex" onClick={handleVideoClick}>
          {/* Thumbnail */}
          <div className="relative flex-shrink-0">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-40 h-full object-cover group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute top-1 left-1 bg-red-600 text-white px-2 py-0.5 rounded text-xs font-bold">
              #{rank}
            </div>

            <div className="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink className="w-3 h-3" />
            </div>
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white px-1 py-0.5 rounded text-xs">
              {video.categoryName}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4">
            <h3 className="font-semibold text-base mb-2 line-clamp-2 hover:text-red-600 transition-colors">
              {video.title}
            </h3>

            <div className="flex items-center text-gray-600 text-sm mb-3">
              <User className="w-3 h-3 mr-1" />
              <span className="truncate">{video.channelTitle}</span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
              <div className="flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                <span>{formatNumber(video.viewCount)}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="w-3 h-3 mr-1" />
                <span>{formatNumber(video.likeCount)}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-3 h-3 mr-1" />
                <span>{formatNumber(video.commentCount)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>{getTimeAgo(video.publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="overflow-hidden pt-0 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer group">
      <div className="relative" onClick={handleVideoClick}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
        />
        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
          #{rank}
        </div>

        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          <ExternalLink className="w-4 h-4" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
          {video.categoryName}
        </div>
      </div>
      <CardContent className="p-4">
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2 hover:text-red-600 transition-colors cursor-pointer"
          onClick={handleVideoClick}
        >
          {video.title}
        </h3>
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <User className="w-4 h-4 mr-1" />
          <span className="truncate">{video.channelTitle}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span>{formatNumber(video.viewCount)}</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1" />
            <span>{formatNumber(video.likeCount)}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            <span>{formatNumber(video.commentCount)}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{getTimeAgo(video.publishedAt)}</span>
          </div>
        </div>

        {/* Viral Score Display */}
      </CardContent>
    </Card>
  );
}

export function VideoDisplay({
  videos,
  viewMode,
  onViewModeChange,
}: VideoDisplayProps) {
  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Trending Videos ({videos.length})
        </h2>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View:</span>
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 flex items-center space-x-1 text-sm transition-colors ${
                  viewMode === "list"
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List className="w-4 h-4" />
                <span>List</span>
              </button>
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 flex items-center space-x-1 text-sm transition-colors border-l border-gray-300 ${
                  viewMode === "grid"
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
                <span>Grid</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Videos Container */}
      <div
        className={
          viewMode === "list"
            ? "space-y-4"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        }
      >
        {videos.map((video, index) => (
          <VideoItem
            key={video.id}
            video={video}
            rank={index + 1}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
}

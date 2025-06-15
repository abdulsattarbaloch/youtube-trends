import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageCircle, Eye, TrendingUp } from "lucide-react";

const EngagementRateCard = ({
  videoData = {
    title: "Sample Video Title",
    views: 1000000,
    likes: 45000,
    comments: 2500,
    publishedAt: "2024-06-01T10:00:00Z",
  },
}) => {
  // Calculate engagement rate
  const calculateEngagementRate = (likes, comments, views) => {
    if (views === 0) return 0;
    return (((likes + comments) / views) * 100).toFixed(2);
  };

  // Get engagement rate category
  const getEngagementCategory = (rate) => {
    if (rate >= 5) return { label: "Excellent", color: "bg-green-500" };
    if (rate >= 3) return { label: "Very Good", color: "bg-blue-500" };
    if (rate >= 1) return { label: "Good", color: "bg-yellow-500" };
    return { label: "Below Average", color: "bg-red-500" };
  };

  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const engagementRate = calculateEngagementRate(
    videoData.likes,
    videoData.comments,
    videoData.views
  );

  const category = getEngagementCategory(parseFloat(engagementRate));

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Engagement Rate
          </CardTitle>
          <Badge className={`${category.color} text-white`}>
            {category.label}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-600">
          {videoData.title}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Engagement Rate Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {engagementRate}%
          </div>
          <p className="text-sm text-gray-500 mt-1">Overall Engagement Rate</p>
        </div>

        {/* Metrics Breakdown */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Eye className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatNumber(videoData.views)}
            </div>
            <div className="text-xs text-gray-500">Views</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <ThumbsUp className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatNumber(videoData.likes)}
            </div>
            <div className="text-xs text-gray-500">Likes</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <MessageCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatNumber(videoData.comments)}
            </div>
            <div className="text-xs text-gray-500">Comments</div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Like Rate:</span>
            <span className="font-medium">
              {((videoData.likes / videoData.views) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Comment Rate:</span>
            <span className="font-medium">
              {((videoData.comments / videoData.views) * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Comments per Like:</span>
            <span className="font-medium">
              {(videoData.comments / videoData.likes).toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Example usage component showing multiple videos
const EngagementDashboard = () => {
  const sampleVideos = [
    {
      title: "How to Build a Viral App",
      views: 2500000,
      likes: 125000,
      comments: 8500,
      publishedAt: "2024-05-15T10:00:00Z",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Video Engagement Analytics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleVideos.map((video, index) => (
            <EngagementRateCard key={index} videoData={video} />
          ))}
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg border">
          <h3 className="font-semibold text-gray-900 mb-2">
            Engagement Rate Benchmarks
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium text-red-600">Below Average</div>
              <div className="text-gray-600">&lt; 1%</div>
            </div>
            <div>
              <div className="font-medium text-yellow-600">Good</div>
              <div className="text-gray-600">1% - 3%</div>
            </div>
            <div>
              <div className="font-medium text-blue-600">Very Good</div>
              <div className="text-gray-600">3% - 5%</div>
            </div>
            <div>
              <div className="font-medium text-green-600">Excellent</div>
              <div className="text-gray-600">&gt; 5%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementDashboard;

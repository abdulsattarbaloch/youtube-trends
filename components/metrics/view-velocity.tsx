import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, TrendingUp, Calendar, Eye, BarChart3 } from "lucide-react";

const ViewVelocityCard = ({
  videoData = {
    title: "Sample Viral Video",
    views: 1500000,
    publishedAt: "2024-06-08T10:00:00Z",
    viewHistory: [
      { timestamp: "2024-06-08T10:00:00Z", views: 0 },
      { timestamp: "2024-06-08T16:00:00Z", views: 25000 },
      { timestamp: "2024-06-09T10:00:00Z", views: 180000 },
      { timestamp: "2024-06-10T10:00:00Z", views: 850000 },
      { timestamp: "2024-06-11T10:00:00Z", views: 1500000 },
    ],
  },
}) => {
  const now = new Date();
  const publishDate = new Date(videoData.publishedAt);

  // Calculate time differences
  const timeDiffMs = now - publishDate;
  const daysSincePublish = Math.max(timeDiffMs / (1000 * 60 * 60 * 24), 0.01); // Minimum 0.01 to avoid division by zero
  const hoursSincePublish = Math.max(timeDiffMs / (1000 * 60 * 60), 0.1);

  // Calculate velocities
  const dailyVelocity = Math.round(videoData.views / daysSincePublish);
  const hourlyVelocity = Math.round(videoData.views / hoursSincePublish);

  // Calculate acceleration if we have view history
  const calculateAcceleration = () => {
    if (!videoData.viewHistory || videoData.viewHistory.length < 3) return null;

    const history = videoData.viewHistory;
    const latest = history[history.length - 1];
    const previous = history[history.length - 2];
    const beforePrevious = history[history.length - 3];

    const latestDate = new Date(latest.timestamp);
    const previousDate = new Date(previous.timestamp);
    const beforePreviousDate = new Date(beforePrevious.timestamp);

    const recentVelocity =
      (latest.views - previous.views) /
      ((latestDate - previousDate) / (1000 * 60 * 60 * 24));
    const pastVelocity =
      (previous.views - beforePrevious.views) /
      ((previousDate - beforePreviousDate) / (1000 * 60 * 60 * 24));

    return recentVelocity - pastVelocity;
  };

  const acceleration = calculateAcceleration();

  // Get velocity category
  const getVelocityCategory = (dailyVel, videoAge) => {
    // Adjust thresholds based on video age
    const ageMultiplier = videoAge > 7 ? 0.5 : videoAge > 3 ? 0.7 : 1;

    if (dailyVel >= 100000 * ageMultiplier)
      return {
        label: "Viral",
        color: "bg-purple-500",
        icon: "🚀",
      };
    if (dailyVel >= 50000 * ageMultiplier)
      return {
        label: "Trending",
        color: "bg-red-500",
        icon: "🔥",
      };
    if (dailyVel >= 10000 * ageMultiplier)
      return {
        label: "Growing",
        color: "bg-green-500",
        icon: "📈",
      };
    if (dailyVel >= 1000 * ageMultiplier)
      return {
        label: "Steady",
        color: "bg-blue-500",
        icon: "📊",
      };
    return {
      label: "Slow",
      color: "bg-gray-500",
      icon: "⏳",
    };
  };

  // Format numbers
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return Math.round(num).toString();
  };

  // Format time
  const formatTimeAgo = (days) => {
    if (days < 1) return `${Math.round(days * 24)}h ago`;
    if (days < 7) return `${Math.round(days)}d ago`;
    return `${Math.round(days / 7)}w ago`;
  };

  const velocityCategory = getVelocityCategory(dailyVelocity, daysSincePublish);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5" />
            View Velocity
          </CardTitle>
          <Badge className={`${velocityCategory.color} text-white`}>
            {velocityCategory.icon} {velocityCategory.label}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-600">
          {videoData.title}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Velocity Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {formatNumber(dailyVelocity)}
          </div>
          <p className="text-sm text-gray-500 mt-1">Views per day</p>
        </div>

        {/* Time Context */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-2">
          <Clock className="h-4 w-4" />
          <span>Published {formatTimeAgo(daysSincePublish)}</span>
        </div>

        {/* Velocity Breakdown */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatNumber(dailyVelocity)}
            </div>
            <div className="text-xs text-gray-500">Per Day</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatNumber(hourlyVelocity)}
            </div>
            <div className="text-xs text-gray-500">Per Hour</div>
          </div>
        </div>

        {/* Current Stats */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Views:</span>
            <span className="font-medium">{formatNumber(videoData.views)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Days Live:</span>
            <span className="font-medium">{daysSincePublish.toFixed(1)}</span>
          </div>
          {acceleration !== null && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Acceleration:</span>
              <span
                className={`font-medium ${
                  acceleration > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {acceleration > 0 ? "↗" : "↘"}{" "}
                {formatNumber(Math.abs(acceleration))}/day
              </span>
            </div>
          )}
        </div>

        {/* Velocity Projection */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Projections
            </span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Next 24h:</span>
              <span className="font-medium">
                +{formatNumber(dailyVelocity)} views
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Next 7d:</span>
              <span className="font-medium">
                +{formatNumber(dailyVelocity * 7)} views
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Dashboard component showing multiple videos with velocity comparison
const ViewVelocityDashboard = () => {
  const sampleVideos = [
    {
      title: "Breaking: New AI Breakthrough",
      views: 3500000,
      publishedAt: "2024-06-10T08:00:00Z",
      viewHistory: [
        { timestamp: "2024-06-10T08:00:00Z", views: 0 },
        { timestamp: "2024-06-10T14:00:00Z", views: 150000 },
        { timestamp: "2024-06-11T08:00:00Z", views: 2800000 },
        { timestamp: "2024-06-11T20:00:00Z", views: 3500000 },
      ],
    },
    {
      title: "React Tutorial for Beginners",
      views: 450000,
      publishedAt: "2024-06-05T12:00:00Z",
      viewHistory: [
        { timestamp: "2024-06-05T12:00:00Z", views: 0 },
        { timestamp: "2024-06-06T12:00:00Z", views: 25000 },
        { timestamp: "2024-06-08T12:00:00Z", views: 185000 },
        { timestamp: "2024-06-11T12:00:00Z", views: 450000 },
      ],
    },
    {
      title: "10 JavaScript Tips",
      views: 125000,
      publishedAt: "2024-05-28T16:00:00Z",
      viewHistory: [
        { timestamp: "2024-05-28T16:00:00Z", views: 0 },
        { timestamp: "2024-05-30T16:00:00Z", views: 45000 },
        { timestamp: "2024-06-05T16:00:00Z", views: 95000 },
        { timestamp: "2024-06-11T16:00:00Z", views: 125000 },
      ],
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          View Velocity Analytics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleVideos.map((video, index) => (
            <ViewVelocityCard key={index} videoData={video} />
          ))}
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg border">
          <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Velocity Benchmarks
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <div className="font-medium text-purple-600">🚀 Viral</div>
              <div className="text-gray-600">&gt; 100K/day</div>
            </div>
            <div>
              <div className="font-medium text-red-600">🔥 Trending</div>
              <div className="text-gray-600">50K - 100K/day</div>
            </div>
            <div>
              <div className="font-medium text-green-600">📈 Growing</div>
              <div className="text-gray-600">10K - 50K/day</div>
            </div>
            <div>
              <div className="font-medium text-blue-600">📊 Steady</div>
              <div className="text-gray-600">1K - 10K/day</div>
            </div>
            <div>
              <div className="font-medium text-gray-600">⏳ Slow</div>
              <div className="text-gray-600">&lt; 1K/day</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Pro Tip:</strong> Velocity thresholds automatically adjust
              based on video age. Newer videos need higher velocity to maintain
              the same category as older content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVelocityDashboard;

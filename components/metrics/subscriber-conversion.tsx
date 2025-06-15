import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  Users,
  TrendingUp,
  Target,
  Eye,
  Calendar,
} from "lucide-react";

const SubscriberConversionCard = ({
  videoData = {
    title: "How to Build Your First React App",
    views: 850000,
    newSubscribers: 12500,
    subscribersLost: 450,
    publishedAt: "2024-06-05T14:00:00Z",
    channelSubscribers: 245000,
    channelAvgConversion: 1.2,
    subscriberHistory: [
      { date: "2024-06-05", gained: 2800, lost: 120 },
      { date: "2024-06-06", gained: 3200, lost: 95 },
      { date: "2024-06-07", gained: 2100, lost: 80 },
      { date: "2024-06-08", gained: 1800, lost: 65 },
      { date: "2024-06-09", gained: 1400, lost: 45 },
      { date: "2024-06-10", gained: 900, lost: 25 },
      { date: "2024-06-11", gained: 300, lost: 20 },
    ],
  },
}) => {
  const now = new Date();
  const publishDate = new Date(videoData.publishedAt);
  const daysSincePublish = Math.max(
    (now - publishDate) / (1000 * 60 * 60 * 24),
    0.01
  );

  // Calculate conversion metrics
  const conversionRate = (
    (videoData.newSubscribers / videoData.views) *
    100
  ).toFixed(2);
  const netSubscribers = videoData.newSubscribers - videoData.subscribersLost;
  const netConversionRate = ((netSubscribers / videoData.views) * 100).toFixed(
    2
  );
  const subscriberVelocity = Math.round(
    videoData.newSubscribers / daysSincePublish
  );

  // Calculate daily average from history
  const dailyAverage = videoData.subscriberHistory
    ? Math.round(
        videoData.subscriberHistory.reduce((sum, day) => sum + day.gained, 0) /
          videoData.subscriberHistory.length
      )
    : subscriberVelocity;

  // Get conversion category
  const getConversionCategory = (rate) => {
    if (rate >= 3)
      return {
        label: "Excellent",
        color: "bg-purple-500",
        icon: "🌟",
      };
    if (rate >= 2)
      return {
        label: "Very Good",
        color: "bg-green-500",
        icon: "🎯",
      };
    if (rate >= 1)
      return {
        label: "Good",
        color: "bg-blue-500",
        icon: "📈",
      };
    if (rate >= 0.5)
      return {
        label: "Average",
        color: "bg-yellow-500",
        icon: "📊",
      };
    return {
      label: "Below Average",
      color: "bg-red-500",
      icon: "📉",
    };
  };

  // Calculate performance vs channel average
  const vsChannelAvg = (
    (parseFloat(conversionRate) / videoData.channelAvgConversion) * 100 -
    100
  ).toFixed(0);

  // Format numbers
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return Math.round(num).toString();
  };

  const category = getConversionCategory(parseFloat(conversionRate));

  // Calculate retention rate (subscribers kept)
  const retentionRate = (
    (netSubscribers / videoData.newSubscribers) *
    100
  ).toFixed(1);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Conversion Rate
          </CardTitle>
          <Badge className={`${category.color} text-white`}>
            {category.icon} {category.label}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-600">
          {videoData.title}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Conversion Rate Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {conversionRate}%
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Subscriber Conversion Rate
          </p>
        </div>

        {/* Performance vs Channel Average */}
        {videoData.channelAvgConversion && (
          <div
            className={`text-center p-2 rounded-lg ${
              parseFloat(vsChannelAvg) > 0 ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <div
              className={`text-sm font-medium ${
                parseFloat(vsChannelAvg) > 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {parseFloat(vsChannelAvg) > 0 ? "↗" : "↘"}{" "}
              {Math.abs(vsChannelAvg)}% vs channel avg
            </div>
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <UserPlus className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatNumber(videoData.newSubscribers)}
            </div>
            <div className="text-xs text-gray-500">New Subs</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Target className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatNumber(netSubscribers)}
            </div>
            <div className="text-xs text-gray-500">Net Gain</div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Net Conversion:</span>
            <span className="font-medium">{netConversionRate}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Retention Rate:</span>
            <span className="font-medium">{retentionRate}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subs/Day:</span>
            <span className="font-medium">
              {formatNumber(subscriberVelocity)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Lost:</span>
            <span className="font-medium text-red-600">
              -{formatNumber(videoData.subscribersLost)}
            </span>
          </div>
        </div>

        {/* Subscriber History Chart (Simple) */}
        {videoData.subscriberHistory && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Daily Performance
              </span>
            </div>
            <div className="space-y-1">
              {videoData.subscriberHistory.slice(-3).map((day, index) => {
                const net = day.gained - day.lost;
                const date = new Date(day.date);
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center text-xs"
                  >
                    <span className="text-gray-600">
                      {date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">
                        +{formatNumber(day.gained)}
                      </span>
                      <span className="text-red-600">-{day.lost}</span>
                      <span
                        className={`font-medium ${
                          net > 0 ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {net > 0 ? "+" : ""}
                        {formatNumber(net)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Projections */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Growth Impact
            </span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Channel Growth:</span>
              <span className="font-medium">
                +
                {(
                  (netSubscribers / videoData.channelSubscribers) *
                  100
                ).toFixed(1)}
                %
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">If 1M views:</span>
              <span className="font-medium">
                +{formatNumber((parseFloat(conversionRate) / 100) * 1000000)}{" "}
                subs
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Dashboard component showing multiple videos
const SubscriberConversionDashboard = () => {
  const sampleVideos = [
    {
      title: "Complete JavaScript Course 2024",
      views: 1200000,
      newSubscribers: 28500,
      subscribersLost: 850,
      publishedAt: "2024-06-01T10:00:00Z",
      channelSubscribers: 450000,
      channelAvgConversion: 1.8,
      subscriberHistory: [
        { date: "2024-06-01", gained: 8500, lost: 200 },
        { date: "2024-06-02", gained: 6200, lost: 150 },
        { date: "2024-06-03", gained: 4800, lost: 120 },
        { date: "2024-06-04", gained: 3200, lost: 100 },
        { date: "2024-06-05", gained: 2400, lost: 80 },
        { date: "2024-06-06", gained: 1800, lost: 70 },
        { date: "2024-06-07", gained: 1600, lost: 130 },
      ],
    },
    {
      title: "React vs Vue: Which to Choose?",
      views: 680000,
      newSubscribers: 8200,
      subscribersLost: 320,
      publishedAt: "2024-06-07T15:30:00Z",
      channelSubscribers: 180000,
      channelAvgConversion: 1.2,
      subscriberHistory: [
        { date: "2024-06-07", gained: 2100, lost: 80 },
        { date: "2024-06-08", gained: 1900, lost: 60 },
        { date: "2024-06-09", gained: 1650, lost: 55 },
        { date: "2024-06-10", gained: 1450, lost: 65 },
        { date: "2024-06-11", gained: 1100, lost: 60 },
      ],
    },
    {
      title: "5 Coding Mistakes Beginners Make",
      views: 425000,
      newSubscribers: 2800,
      subscribersLost: 180,
      publishedAt: "2024-06-09T12:00:00Z",
      channelSubscribers: 95000,
      channelAvgConversion: 0.8,
      subscriberHistory: [
        { date: "2024-06-09", gained: 850, lost: 45 },
        { date: "2024-06-10", gained: 920, lost: 55 },
        { date: "2024-06-11", gained: 1030, lost: 80 },
      ],
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Subscriber Conversion Analytics
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleVideos.map((video, index) => (
            <SubscriberConversionCard key={index} videoData={video} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Benchmarks */}
          <div className="p-4 bg-white rounded-lg border">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Conversion Benchmarks
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-600 font-medium">
                  🌟 Excellent
                </span>
                <span className="text-gray-600">&gt; 3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600 font-medium">🎯 Very Good</span>
                <span className="text-gray-600">2% - 3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600 font-medium">📈 Good</span>
                <span className="text-gray-600">1% - 2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-yellow-600 font-medium">📊 Average</span>
                <span className="text-gray-600">0.5% - 1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600 font-medium">📉 Below Avg</span>
                <span className="text-gray-600">&lt; 0.5%</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-white rounded-lg border">
            <h3 className="font-semibold text-gray-900 mb-3">
              Optimization Tips
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>
                  Call-to-action: Ask viewers to subscribe at peak engagement
                  moments
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>
                  Value delivery: Provide clear value within first 30 seconds
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>
                  Content series: Multi-part content increases conversion rates
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>
                  Community building: Respond to comments to build loyalty
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriberConversionDashboard;

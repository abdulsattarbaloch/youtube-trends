// components/TimeAnalysis.tsx
import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Calendar, Clock, TrendingUp, Activity } from "lucide-react";
import { YouTubeVideo } from "@/lib/youtube";

interface Video {
  id: string;
  title: string;
  channelTitle: string;
  viewCount: string;
  likeCount: string;
  publishedAt: string;
  categoryId: string;
  thumbnailUrl: string;
}

interface TimeAnalysisProps {
  // videos: Video[];
  videos: YouTubeVideo[];
}

export const TimeAnalysis: React.FC<TimeAnalysisProps> = ({ videos }) => {
  const timeData = useMemo(() => {
    const now = new Date();
    const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour.toString().padStart(2, "0")}:00`,
      videos: 0,
      totalViews: 0,
      avgViews: 0,
    }));

    const dailyData = Array.from({ length: 7 }, (_, day) => ({
      day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day],
      videos: 0,
      totalViews: 0,
      avgViews: 0,
    }));

    const monthlyData = Array.from({ length: 12 }, (_, month) => ({
      month: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][month],
      videos: 0,
      totalViews: 0,
      avgViews: 0,
    }));

    const ageData = [
      { range: "0-1 hours", videos: 0, totalViews: 0, avgViews: 0 },
      { range: "1-6 hours", videos: 0, totalViews: 0, avgViews: 0 },
      { range: "6-24 hours", videos: 0, totalViews: 0, avgViews: 0 },
      { range: "1-7 days", videos: 0, totalViews: 0, avgViews: 0 },
      { range: "1-4 weeks", videos: 0, totalViews: 0, avgViews: 0 },
      { range: "1+ months", videos: 0, totalViews: 0, avgViews: 0 },
    ];

    videos.forEach((video) => {
      const publishDate = new Date(video.publishedAt);
      const views = parseInt(video.viewCount) || 0;

      // Hourly distribution
      const hour = publishDate.getHours();
      hourlyData[hour].videos += 1;
      hourlyData[hour].totalViews += views;

      // Daily distribution
      const dayOfWeek = publishDate.getDay();
      dailyData[dayOfWeek].videos += 1;
      dailyData[dayOfWeek].totalViews += views;

      // Monthly distribution
      const month = publishDate.getMonth();
      monthlyData[month].videos += 1;
      monthlyData[month].totalViews += views;

      // Age-based distribution
      const ageInHours =
        (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60);
      let ageIndex;
      if (ageInHours <= 1) ageIndex = 0;
      else if (ageInHours <= 6) ageIndex = 1;
      else if (ageInHours <= 24) ageIndex = 2;
      else if (ageInHours <= 168) ageIndex = 3; // 7 days
      else if (ageInHours <= 672) ageIndex = 4; // 4 weeks
      else ageIndex = 5;

      ageData[ageIndex].videos += 1;
      ageData[ageIndex].totalViews += views;
    });

    // Calculate averages
    [hourlyData, dailyData, monthlyData, ageData].forEach((dataset) => {
      dataset.forEach((item) => {
        item.avgViews =
          item.videos > 0 ? Math.round(item.totalViews / item.videos) : 0;
      });
    });

    return { hourlyData, dailyData, monthlyData, ageData };
  }, [videos]);

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + "B";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{label}</p>
          <p className="text-blue-600">Videos: {data.videos}</p>
          <p className="text-green-600">
            Avg Views: {formatNumber(data.avgViews)}
          </p>
          <p className="text-purple-600">
            Total Views: {formatNumber(data.totalViews)}
          </p>
        </div>
      );
    }
    return null;
  };

  const bestHour = timeData.hourlyData.reduce(
    (max, curr) => (curr.avgViews > max.avgViews ? curr : max),
    timeData.hourlyData[0]
  );

  const bestDay = timeData.dailyData.reduce(
    (max, curr) => (curr.avgViews > max.avgViews ? curr : max),
    timeData.dailyData[0]
  );

  const mostRecentVideos = videos
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <h2 className="text-2xl md:text-3xl font-bold">Time Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Hour</p>
                <p className="text-2xl font-bold">{bestHour.hour}</p>
                <p className="text-sm text-gray-500">
                  {formatNumber(bestHour.avgViews)} avg views
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Day</p>
                <p className="text-2xl font-bold">{bestDay.day}</p>
                <p className="text-sm text-gray-500">
                  {formatNumber(bestDay.avgViews)} avg views
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Fresh Content
                </p>
                <p className="text-2xl font-bold">
                  {timeData.ageData[0].videos + timeData.ageData[1].videos}
                </p>
                <p className="text-sm text-gray-500">Under 6 hours</p>
              </div>
              <Activity className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Peak Performance
                </p>
                <p className="text-2xl font-bold">
                  {timeData.ageData[2].videos}
                </p>
                <p className="text-sm text-gray-500">24hr trending</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Publishing Time Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeData.hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="avgViews"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Daily Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Day of Week Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avgViews" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Publishing Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="videos"
                    stroke="#ff7300"
                    strokeWidth={2}
                    name="Video Count"
                  />
                  <Line
                    type="monotone"
                    dataKey="avgViews"
                    stroke="#387908"
                    strokeWidth={2}
                    name="Avg Views"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Content Age Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Content Age vs Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeData.ageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="range"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="videos" fill="#8884d8" name="Video Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Videos */}
      <Card>
        <CardHeader>
          <CardTitle>Most Recent Trending Videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mostRecentVideos.map((video, index) => {
              const publishedDate = new Date(video.publishedAt);
              const timeAgo = Math.round(
                (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60)
              );

              return (
                <div
                  key={video.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg truncate">
                      {video.title}
                    </h3>
                    <p className="text-gray-600">{video.channelTitle}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>
                        {formatNumber(parseInt(video.viewCount))} views
                      </span>
                      <span>•</span>
                      <span>{timeAgo}h ago</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Eye, Clock, ThumbsUp } from "lucide-react";
import { YouTubeVideo } from "@/lib/youtube";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
];

const CATEGORY_NAMES = {
  1: "Film & Animation",
  2: "Autos & Vehicles",
  10: "Music",
  15: "Pets & Animals",
  17: "Sports",
  19: "Travel & Events",
  20: "Gaming",
  22: "People & Blogs",
  23: "Comedy",
  24: "Entertainment",
  25: "News & Politics",
  26: "Howto & Style",
  27: "Education",
  28: "Science & Technology",
};

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

interface CategoryAnalysisProps {
  //   videos: Video[];
  videos: YouTubeVideo[];
}

export const CategoryAnalysis: React.FC<CategoryAnalysisProps> = ({
  videos,
}) => {
  const categoryData = useMemo(() => {
    const categoryStats = videos.reduce((acc, video) => {
      const categoryId = video.categoryId;
      const categoryName =
        CATEGORY_NAMES[categoryId as keyof typeof CATEGORY_NAMES] || "Other";

      if (!acc[categoryName]) {
        acc[categoryName] = {
          name: categoryName,
          count: 0,
          totalViews: 0,
          totalLikes: 0,
          videos: [],
        };
      }

      acc[categoryName].count += 1;
      acc[categoryName].totalViews += parseInt(video.viewCount) || 0;
      acc[categoryName].totalLikes += parseInt(video.likeCount) || 0;
      acc[categoryName].videos.push(video);

      return acc;
    }, {} as Record<string, any>);

    return Object.values(categoryStats).sort(
      (a: any, b: any) => b.count - a.count
    );
  }, [videos]);

  const pieData = categoryData.slice(0, 7).map((category: any) => ({
    name: category.name,
    value: category.count,
    views: category.totalViews,
    likes: category.totalLikes,
  }));

  const barData = categoryData.slice(0, 8).map((category: any) => ({
    name: category.name.split(" ")[0], // Shorten names for better display
    views: Math.round(category.totalViews / category.count), // Average views
    videos: category.count,
  }));

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
          <p className="font-semibold">{data.name}</p>
          <p className="text-blue-600">Videos: {data.videos || data.value}</p>
          <p className="text-green-600">
            Avg Views: {formatNumber(data.views)}
          </p>
          {data.likes && (
            <p className="text-red-600">
              Total Likes: {formatNumber(data.likes)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const topCategory = categoryData[0];

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <h2 className="text-2xl md:text-3xl font-bold">Category Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Categories
                </p>
                <p className="text-2xl font-bold">{categoryData.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Top Category
                </p>
                <p className="text-lg font-bold text-green-600">
                  {topCategory?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {topCategory?.count} videos
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Views/Category
                </p>
                <p className="text-2xl font-bold">
                  {formatNumber(
                    Math.round(
                      categoryData.reduce(
                        (sum: number, cat: any) => sum + cat.totalViews,
                        0
                      ) / categoryData.length
                    )
                  )}
                </p>
              </div>
              <ThumbsUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Most Viral</p>
                <p className="text-lg font-bold text-purple-600">
                  {
                    categoryData
                      .sort(
                        (a: any, b: any) =>
                          b.totalViews / b.count - a.totalViews / a.count
                      )[0]
                      ?.name?.split(" ")[0]
                  }
                </p>
                <p className="text-sm text-gray-500">By avg views</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Video Distribution by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Average Views by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis tickFormatter={formatNumber} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="views" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category List */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categoryData.slice(0, 10).map((category: any, index) => (
              <div
                key={category.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{category.name}</p>
                    <p className="text-sm text-gray-600">
                      {category.count} videos
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {formatNumber(category.totalViews)} total views
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatNumber(
                      Math.round(category.totalViews / category.count)
                    )}{" "}
                    avg views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

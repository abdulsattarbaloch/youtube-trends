// components/StatsCards.tsx
import { Card, CardContent } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { YouTubeVideo } from "@/lib/youtube";
import {
  Clock,
  Eye,
  MessageCircle,
  ThumbsUp,
  TrendingUp,
  Video,
} from "lucide-react";

interface StatsCardsProps {
  videos: YouTubeVideo[];
  regionCode: string;
}

export function StatsCards({ videos, regionCode }: StatsCardsProps) {
  console.log(regionCode);
  const totalViews = videos.reduce(
    (sum, video) => sum + parseInt(video.viewCount),
    0
  );
  const totalLikes = videos.reduce(
    (sum, video) => sum + parseInt(video.likeCount),
    0
  );
  const totalComments = videos.reduce(
    (sum, video) => sum + parseInt(video.commentCount),
    0
  );
  const avgViews = Math.floor(totalViews / videos.length);
  const recentVideos = videos.filter((video) => {
    const publishDate = new Date(video.publishedAt);
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return publishDate > oneDayAgo;
  }).length;

  const stats = [
    {
      title: "Total Videos",
      value: videos.length.toString(),
      icon: Video,
      color: "text-blue-600",
    },
    {
      title: "Total Views",
      value: formatNumber(totalViews.toString()),
      icon: Eye,
      color: "text-green-600",
    },
    {
      title: "Total Likes",
      value: formatNumber(totalLikes.toString()),
      icon: ThumbsUp,
      color: "text-red-600",
    },
    {
      title: "Total Comments",
      value: formatNumber(totalComments.toString()),
      icon: MessageCircle,
      color: "text-purple-600",
    },
    {
      title: "Average Views",
      value: formatNumber(avgViews.toString()),
      icon: TrendingUp,
      color: "text-indigo-600",
    },
    {
      title: "Recent (24h)",
      value: recentVideos.toString(),
      icon: Clock,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  {stat.title}
                </p>
                <p className="text-xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// components/TrendingChart.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { YouTubeVideo } from "@/lib/youtube";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TrendingChartProps {
  videos: YouTubeVideo[];
}

export function TrendingChart({ videos }: TrendingChartProps) {
  const chartData = videos.slice(0, 10).map((video, index) => ({
    rank: index + 1,
    title:
      video.title.length > 25
        ? video.title.substring(0, 25) + "..."
        : video.title,
    views: parseInt(video.viewCount),
    likes: parseInt(video.likeCount),
    comments: parseInt(video.commentCount),
    viewsFormatted: formatNumber(video.viewCount),
    likesFormatted: formatNumber(video.likeCount),
    commentsFormatted: formatNumber(video.commentCount),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Trending Videos Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="rank"
              tick={{ fontSize: 12 }}
              label={{
                value: "Ranking",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <YAxis
              tickFormatter={formatNumber}
              tick={{ fontSize: 12 }}
              label={{ value: "Count", angle: -90, position: "insideLeft" }}
            />
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={(value: any) => [
                formatNumber(value.toString()),
                "Views",
              ]}
              labelFormatter={(label) => `Rank #${label}`}
            />
            <Bar dataKey="views" fill="#ff0000" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  publishedAt: string;
  description: string;
  categoryId: string;
  categoryName: string;
  tags?: string[];
  videoUrl: string;
}

export interface TrendingResponse {
  videos: YouTubeVideo[];
  regionCode: string;
  totalResults: number;
}

// Video categories mapping
export const VIDEO_CATEGORIES = {
  "1": "Film & Animation",
  "2": "Autos & Vehicles",
  "10": "Music",
  "15": "Pets & Animals",
  "17": "Sports",
  "18": "Short Movies",
  "19": "Travel & Events",
  "20": "Gaming",
  "21": "Videoblogging",
  "22": "People & Blogs",
  "23": "Comedy",
  "24": "Entertainment",
  "25": "News & Politics",
  "26": "Howto & Style",
  "27": "Education",
  "28": "Science & Technology",
  "29": "Nonprofits & Activism",
  "30": "Movies",
  "31": "Anime/Animation",
  "32": "Action/Adventure",
  "33": "Classics",
  "34": "Documentary",
  "35": "Drama",
  "36": "Family",
  "37": "Foreign",
  "38": "Horror",
  "39": "Sci-Fi/Fantasy",
  "40": "Thriller",
  "41": "Shorts",
  "42": "Shows",
  "43": "Trailers",
};

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export async function getTrendingVideos(
  regionCode: string = "US",
  maxResults: number = 50
): Promise<TrendingResponse> {
  if (!YOUTUBE_API_KEY) {
    throw new Error("YouTube API key not configured");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/videos?part=snippet,statistics&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const videos: YouTubeVideo[] = data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      viewCount: item.statistics.viewCount || "0",
      likeCount: item.statistics.likeCount || "0",
      commentCount: item.statistics.commentCount || "0",
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description,
      categoryId: item.snippet.categoryId,
      categoryName:
        VIDEO_CATEGORIES[
          item.snippet.categoryId as keyof typeof VIDEO_CATEGORIES
        ] || "Unknown",
      tags: item.snippet.tags || [],
      videoUrl: `https://www.youtube.com/watch?v=${item.id}`,
    }));

    return {
      videos,
      regionCode,
      totalResults: data.pageInfo.totalResults,
    };
  } catch (error) {
    console.error("Error fetching trending videos:", error);
    throw error;
  }
}

export const REGION_CODES = {
  US: "United States",
  IN: "India",
  PK: "Pakistan",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  DE: "Germany",
  FR: "France",
  JP: "Japan",
  KR: "South Korea",
  BR: "Brazil",
  MX: "Mexico",
  RU: "Russia",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  SE: "Sweden",
  NO: "Norway",
  DK: "Denmark",
  FI: "Finland",
};

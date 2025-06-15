import HomePage from "@/components/pages/home-page";
import { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "YouTube Trends - Discover Viral Content & Trending Videos Worldwide",
  description:
    "Track trending YouTube videos across 50+ regions with real-time analytics. Advanced filtering by category, time, and engagement metrics. Perfect for content creators, marketers, and researchers.",
  keywords:
    "youtube trends, trending videos, viral content, youtube analytics, content discovery, trending youtube, video trends, social media trends, content marketing, youtube statistics, viral videos, trending analysis, youtube insights, content strategy, digital marketing",
  authors: [{ name: "YouTube Trends" }],
  robots: "index, follow",
  openGraph: {
    title:
      "YouTube Trends - Discover Viral Content & Trending Videos Worldwide",
    description:
      "Track trending YouTube videos across 50+ regions with real-time analytics and advanced filtering capabilities.",
    type: "website",
    url: "https://youtube-trends.xyz",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YouTube Trends - Viral Content Discovery Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Trends - Discover Viral Content Worldwide",
    description:
      "Track trending YouTube videos across 50+ regions with real-time analytics and advanced filtering.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return <HomePage />;
}

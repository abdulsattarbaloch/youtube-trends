import AboutPage from "@/components/pages/about-page";
import { Metadata } from "next";

export const aboutMetadata: Metadata = {
  title: "About YouTube Trends - Your Premier Viral Content Discovery Platform",
  description:
    "Learn about YouTube Trends, the leading platform for discovering viral content worldwide. Our mission is to provide comprehensive trend analysis tools for creators, marketers, and researchers.",
  keywords:
    "about youtube trends, trend analysis platform, viral content discovery, youtube analytics tool, content marketing platform, digital trend analysis, social media analytics, youtube trend tracker",
  authors: [{ name: "YouTube Trends" }],
  robots: "index, follow",
  openGraph: {
    title:
      "About YouTube Trends - Your Premier Viral Content Discovery Platform",
    description:
      "Learn about our mission to provide comprehensive trend analysis tools for creators, marketers, and researchers worldwide.",
    type: "website",
    url: "https://youtube-trends.xyz/about",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "About YouTube Trends Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About YouTube Trends Platform",
    description:
      "Learn about our mission to provide comprehensive trend analysis tools for creators and marketers.",
    images: ["/og-image.png"],
  },
};

export default function About() {
  return <AboutPage />;
}

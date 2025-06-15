import HowToUsePage from "@/components/pages/how-to-use-page";
import { Metadata } from "next";

export const howItWorksMetadata: Metadata = {
  title: "How YouTube Trends Works - Complete Guide to Trend Analysis",
  description:
    "Learn how to use YouTube Trends platform step-by-step. Discover trending videos, apply filters, analyze regional data, and leverage insights for content strategy.",
  keywords:
    "how youtube trends works, trend analysis guide, youtube analytics tutorial, viral content discovery guide, trending videos how to, content strategy guide, youtube trend analysis tutorial",
  authors: [{ name: "YouTube Trends" }],
  robots: "index, follow",
  openGraph: {
    title: "How YouTube Trends Works - Complete Guide to Trend Analysis",
    description:
      "Learn step-by-step how to discover trending videos, apply filters, and analyze regional data for content strategy.",
    type: "website",
    url: "https://youtube-trends.xyz/how-to-use",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "How YouTube Trends Works Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How YouTube Trends Works Guide",
    description:
      "Learn step-by-step how to discover trending videos and analyze data for content strategy.",
    images: ["/og-image.png"],
  },
};

export default function HowToUse() {
  return <HowToUsePage />;
}

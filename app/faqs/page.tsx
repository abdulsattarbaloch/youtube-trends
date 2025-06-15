import FAQsPage from "@/components/pages/faqs-page";
import { Metadata } from "next";

export const faqsMetadata: Metadata = {
  title: "YouTube Trends FAQ - Common Questions About Trend Analysis",
  description:
    "Find answers to frequently asked questions about YouTube Trends platform. Learn how to use our trend analysis tools, filtering options, regional data, and more.",
  keywords:
    "youtube trends faq, trending videos questions, how to use youtube trends, trend analysis help, youtube analytics faq, viral content questions, trending data help, youtube trend tracker faq",
  authors: [{ name: "YouTube Trends" }],
  robots: "index, follow",
  openGraph: {
    title: "YouTube Trends FAQ - Common Questions About Trend Analysis",
    description:
      "Find answers to frequently asked questions about using our trend analysis platform and discovering viral content.",
    type: "website",
    url: "https://youtube-trends.xyz/faqs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YouTube Trends FAQ Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Trends FAQ",
    description:
      "Find answers to common questions about our trend analysis platform and viral content discovery.",
    images: ["/og-image.png"],
  },
};

export default function Faqs() {
  return <FAQsPage />;
}

import TermsOfServicePage from "@/components/pages/tos-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - YouTube Trends Usage Terms & Conditions",
  description:
    "Review YouTube Trends terms of service and usage conditions. Understand your rights and responsibilities when using our viral content discovery and trend analysis platform.",
  keywords:
    "youtube trends terms of service, terms and conditions, usage terms, service agreement, youtube analytics terms, trend analysis terms, platform terms",
  authors: [{ name: "YouTube Trends" }],
  robots: "index, follow",
  openGraph: {
    title: "Terms of Service - YouTube Trends Usage Terms & Conditions",
    description:
      "Review our terms of service and understand your rights when using our trend analysis platform.",
    type: "website",
    url: "https://youtube-trends.xyz/tos",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YouTube Trends Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Trends Terms of Service",
    description:
      "Review our terms of service and understand your rights when using our platform.",
    images: ["/og-image.png"],
  },
};

export default function TermsOfService() {
  return <TermsOfServicePage />;
}

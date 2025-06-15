import PrivacyPolicyPage from "@/components/pages/privacy-policy-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - YouTube Trends Data Protection & User Privacy",
  description:
    "Read YouTube Trends privacy policy to understand how we protect your data, what information we collect, and how we ensure your privacy while using our trend analysis platform.",
  keywords:
    "youtube trends privacy policy, data protection, user privacy, privacy policy, data security, personal information protection, youtube analytics privacy",
  authors: [{ name: "YouTube Trends" }],
  robots: "index, follow",
  openGraph: {
    title: "Privacy Policy - YouTube Trends Data Protection & User Privacy",
    description:
      "Learn about our commitment to protecting your privacy and data security while using our trend analysis platform.",
    type: "website",
    url: "https://youtube-trends.xyz/privacy-policy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YouTube Trends Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Trends Privacy Policy",
    description:
      "Learn about our commitment to protecting your privacy and data security.",
    images: ["/og-image.png"],
  },
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}

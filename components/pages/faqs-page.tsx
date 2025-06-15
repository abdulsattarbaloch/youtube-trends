"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import NavbarSimple from "../navbar-simple";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: "General",
    question: "What is YouTube Trending Tracker?",
    answer:
      "YouTube Trending Tracker is a web application that displays trending YouTube videos from different regions and categories. It provides insights into what's popular on YouTube with filtering, sorting, and analytics features.",
  },
  {
    category: "General",
    question: "How often is the trending data updated?",
    answer:
      "The trending data is fetched in real-time from YouTube's official API. However, YouTube's trending algorithm updates multiple times per day, so you may see changes when you refresh or switch regions.",
  },
  {
    category: "Features",
    question: "Which regions are supported?",
    answer:
      "We currently support multiple regions including United States, United Kingdom, Canada, Australia, Germany, France, Japan, and many more. You can switch between regions using the region selector in the navigation bar.",
  },
  {
    category: "Features",
    question: "Can I filter videos by category?",
    answer:
      "Yes! You can filter trending videos by various YouTube categories such as Music, Gaming, Entertainment, Sports, News & Politics, and more. Use the category filter in the FilterBar to narrow down your results.",
  },
  {
    category: "Features",
    question: "How do I search for specific videos or channels?",
    answer:
      "Use the search bar in the FilterBar to search through trending videos by title, channel name, or category. The search is case-insensitive and searches across all visible trending videos.",
  },
  {
    category: "Features",
    question: "What sorting options are available?",
    answer:
      "You can sort trending videos by Views (highest first), Likes (most liked first), Comments (most commented first), or Recent (newest first). The default sorting is by view count.",
  },
  {
    category: "Technical",
    question: "Why do I see different numbers of videos for different regions?",
    answer:
      "YouTube's trending algorithm varies by region, and some regions may have fewer trending videos available through the API. You can adjust the number of videos to fetch using the video count selector.",
  },
  {
    category: "Technical",
    question: "What happens if videos fail to load?",
    answer:
      "If there's an error loading videos, you'll see an error message with a 'Try Again' button. This could happen due to API rate limits, network issues, or temporary YouTube API problems.",
  },
  {
    category: "Usage",
    question: "Can I use this data for research or commercial purposes?",
    answer:
      "The data displayed comes from YouTube's public API and follows their terms of service. For commercial use or research, please ensure you comply with YouTube's API Terms of Service and consider their usage quotas.",
  },
  {
    category: "Usage",
    question: "How can I get the most out of the trending insights?",
    answer:
      "Try comparing trends across different regions, look for patterns in successful content types, use time filters to see recent vs. older trending content, and analyze the statistics to understand what makes content viral.",
  },
  {
    category: "Technical",
    question: "Is there a mobile version?",
    answer:
      "Yes! The website is fully responsive and works great on mobile devices. All features including filtering, sorting, and video browsing are optimized for mobile use.",
  },
  {
    category: "Features",
    question: "What information is shown for each video?",
    answer:
      "For each trending video, we display the title, channel name, view count, like count, comment count, publication date, category, and thumbnail. You can also see detailed statistics and charts.",
  },
];

export default function FAQsPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(faqs.map((faq) => faq.category))),
  ];

  const filteredFAQs =
    selectedCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSimple />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about YouTube Trending Tracker
          </p>
        </div>

        {/* Category Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              Browse by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full text-left"
              >
                <CardHeader className="hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
                        {faq.category}
                      </span>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </div>
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </CardHeader>
              </button>

              {openItems.includes(index) && (
                <CardContent className="border-t bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              If you couldn&apos;t find what you were looking for, feel free to
              explore our other help resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/how-to-use"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                How to Use Guide
              </a>
              <a
                href="/about"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Learn More About Us
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

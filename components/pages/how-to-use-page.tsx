"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Filter,
  Search,
  BarChart3,
  Grid3X3,
  List,
  RefreshCw,
  TrendingUp,
  Play,
  Eye,
  Heart,
  MessageCircle,
  Calendar,
} from "lucide-react";

import Link from "next/link";
import NavbarSimple from "../navbar-simple";

export default function HowToUsePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSimple />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Use YouTube Trending Tracker
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive guide to discovering and analyzing trending YouTube
            content
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-6 h-6 text-green-600" />
              Quick Start Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold">Choose Your Region</h3>
                    <p className="text-sm text-gray-600">
                      Select a country from the dropdown to see trending videos
                      from that region.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold">Set Video Count</h3>
                    <p className="text-sm text-gray-600">
                      Choose how many trending videos to display (10-50).
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <div>
                    <h3 className="font-semibold">Apply Filters</h3>
                    <p className="text-sm text-gray-600">
                      Use the filter bar to narrow down videos by category,
                      time, or search terms.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  <div>
                    <h3 className="font-semibold">Analyze & Explore</h3>
                    <p className="text-sm text-gray-600">
                      View detailed statistics, charts, and video information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Features */}
        <div className="space-y-8">
          {/* Region Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-600" />
                Region Selection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Choose from various regions to see what&paos;s trending in
                different countries:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Available Regions:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <span>🇺🇸 United States</span>
                  <span>🇬🇧 United Kingdom</span>
                  <span>🇨🇦 Canada</span>
                  <span>🇦🇺 Australia</span>
                  <span>🇩🇪 Germany</span>
                  <span>🇫🇷 France</span>
                  <span>🇯🇵 Japan</span>
                  <span>🇰🇷 South Korea</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filtering & Search */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-6 h-6 text-purple-600" />
                Filtering & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Search className="w-4 h-4" />
                      Search Videos
                    </h4>
                    <p className="text-sm text-gray-600">
                      Search through trending videos by title, channel name, or
                      category. The search is real-time and case-insensitive.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Category Filter</h4>
                    <p className="text-sm text-gray-600">
                      Filter videos by YouTube categories like Music, Gaming,
                      Entertainment, Sports, News & Politics, and more.
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Time Filter</h4>
                    <p className="text-sm text-gray-600">
                      Filter videos by when they were published: last 24 hours,
                      last week, last month, or all time.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Sort Options</h4>
                    <p className="text-sm text-gray-600">
                      Sort videos by views, likes, comments, or publication date
                      to find the most engaging content.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-6 h-6 text-orange-600" />
                Understanding Video Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>View Count:</strong> Total video views
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Like Count:</strong> Number of likes received
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Comment Count:</strong> Total comments
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Published Date:</strong> When the video was
                      uploaded
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Category:</strong> YouTube&apos;s assigned
                      category
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Thumbnail:</strong> Click to view on YouTube
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* View Modes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Grid3X3 className="w-6 h-6 text-indigo-600" />
                View Modes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <List className="w-6 h-6 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">List View</h4>
                    <p className="text-sm text-gray-600">
                      Detailed list showing all video information including
                      statistics, descriptions, and channel details.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Grid3X3 className="w-6 h-6 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-semibold">Grid View</h4>
                    <p className="text-sm text-gray-600">
                      Compact grid layout focusing on thumbnails and titles,
                      perfect for quick browsing.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-green-600" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  The analytics section provides insights into trending video
                  performance:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold text-sm">Stats Cards</h4>
                    <p className="text-xs text-gray-600">
                      View total videos, average views, and top performing
                      content
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold text-sm">Trending Chart</h4>
                    <p className="text-xs text-gray-600">
                      Visual representation of view counts across trending
                      videos
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="font-semibold text-sm">Regional Info</h4>
                    <p className="text-xs text-gray-600">
                      Current region statistics and last update time
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips & Best Practices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
                Tips & Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                  <p className="text-sm text-gray-700">
                    <strong>Compare regions:</strong> Switch between different
                    countries to see how trends vary globally.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                  <p className="text-sm text-gray-700">
                    <strong>Use time filters:</strong> Focus on recent content
                    to spot emerging trends.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                  <p className="text-sm text-gray-700">
                    <strong>Analyze patterns:</strong> Look for common themes in
                    titles, thumbnails, and categories.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-2 h-2 bg-red-600 rounded-full mt-2"></span>
                  <p className="text-sm text-gray-700">
                    <strong>Refresh regularly:</strong> Click the refresh button
                    to get the latest trending data.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-red-600" />
                Troubleshooting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    Videos Not Loading?
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Check your internet connection</li>
                    <li>• Try refreshing the page</li>
                    <li>• Switch to a different region</li>
                    <li>• Reduce the number of videos to fetch</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">
                    No Results After Filtering?
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>
                      • Try clearing all filters using the &paos;Clear
                      Filters&paos; button
                    </li>
                    <li>• Expand your time range filter</li>
                    <li>• Check if your search terms are too specific</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Slow Loading?</h4>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Reduce the number of videos to display</li>
                    <li>• Close other browser tabs to free up memory</li>
                    <li>• Try using a different browser</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="mt-12">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Explore Trending Videos?
            </h2>
            <p className="text-gray-600 mb-6">
              Now that you know how to use all the features, start discovering
              what&paos;s trending!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Start Exploring
              </Link>
              <a
                href="/faqs"
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                View FAQs
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

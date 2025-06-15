// app/about/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Eye,
  Filter,
  Globe,
  Search,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import NavbarSimple from "../navbar-simple";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSimple />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About YouTube Trending Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what&apos;s trending on YouTube across different regions
            and categories. Get insights into viral content and stay ahead of
            the curve.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-red-600" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              YouTube Trending Tracker was created to help content creators,
              marketers, and curious minds understand what&apos;s capturing
              global attention on YouTube. We believe that trending content
              insights should be accessible, organized, and actionable for
              everyone.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Global Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Access trending videos from multiple regions including US, UK,
                Canada, Australia, and more. Compare what&apos;s trending across
                different markets.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                Rich Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                View detailed statistics including view counts, likes, comments,
                and publication dates. Understand what makes content viral.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-600" />
                Smart Filtering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Filter by categories, time periods, and custom criteria. Find
                exactly the type of trending content you&apos;re looking for.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-orange-600" />
                Powerful Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Search through trending videos by title, channel, or category.
                Quickly find specific content or creators you&apos;re interested
                in.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Who We Serve */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-6 h-6 text-indigo-600" />
              Who We Serve
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Content Creators
                </h3>
                <p className="text-gray-700 text-sm">
                  Discover trending topics and formats to inspire your next
                  viral video.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Marketers</h3>
                <p className="text-gray-700 text-sm">
                  Identify trending content for campaign inspiration and
                  audience insights.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Researchers
                </h3>
                <p className="text-gray-700 text-sm">
                  Analyze viral content patterns and social media trends across
                  regions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Built with Modern Technology</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              Our platform is built using cutting-edge web technologies to
              ensure fast, reliable, and user-friendly experience:
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Explore Trending Content?
            </h2>
            <p className="text-gray-600 mb-6">
              Start discovering what&apos;s trending on YouTube right now.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Explore Trending Videos
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

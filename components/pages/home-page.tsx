"use client";

import { FilterBar, SortOption, TimeFilter } from "@/components/filterbar";
import Navbar from "@/components/navbar";
import { StatsCards } from "@/components/stats-card";
import { TrendingChart } from "@/components/trending-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VideoDisplay, ViewMode } from "@/components/video-card";
import { isWithinTimeRange } from "@/lib/utils";
import { getTrendingVideos, REGION_CODES, YouTubeVideo } from "@/lib/youtube";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [numOfVideos, setNumOfVideos] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState("US");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("views");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const fetchTrendingVideos = async (regionCode: string, num: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTrendingVideos(regionCode, num);
      setVideos(data.videos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingVideos(selectedRegion, numOfVideos);
  }, [selectedRegion, numOfVideos]);

  // Filter and sort videos based on selected filters
  const filteredAndSortedVideos = useMemo(() => {
    let filtered = videos;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (video) => video.categoryId === selectedCategory
      );
    }

    // Apply time filter
    if (timeFilter !== "all") {
      filtered = filtered.filter((video) =>
        isWithinTimeRange(video.publishedAt, timeFilter)
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.channelTitle.toLowerCase().includes(query) ||
          video.categoryName.toLowerCase().includes(query)
      );
    }

    // Sort videos
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "views":
          return parseInt(b.viewCount) - parseInt(a.viewCount);
        case "likes":
          return parseInt(b.likeCount) - parseInt(a.likeCount);
        case "comments":
          return parseInt(b.commentCount) - parseInt(a.commentCount);
        case "recent":
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
        default:
          return 0;
      }
    });

    return sorted;
  }, [videos, selectedCategory, timeFilter, searchQuery, sortBy]);

  // Get unique categories from current videos
  const availableCategories = useMemo(() => {
    const categories = videos.reduce((acc, video) => {
      if (!acc.find((cat) => cat.id === video.categoryId)) {
        acc.push({
          id: video.categoryId,
          name: video.categoryName,
        });
      }
      return acc;
    }, [] as Array<{ id: string; name: string }>);

    return categories.sort((a, b) => a.name.localeCompare(b.name));
  }, [videos]);

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setTimeFilter("all");
    setSearchQuery("");
    setSortBy("views");
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    timeFilter !== "all",
    searchQuery.trim() !== "",
    sortBy !== "views",
  ].filter(Boolean).length;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error Loading Videos</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => fetchTrendingVideos(selectedRegion, numOfVideos)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        numOfVideos={numOfVideos}
        onNumOfVideos={setNumOfVideos}
        selectedRegion={selectedRegion}
        onSelectedRegion={setSelectedRegion}
        loading={loading}
        fetchTrendingVideos={fetchTrendingVideos}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-red-600" />
            <span className="ml-2 text-gray-600">
              Loading trending videos...
            </span>
          </div>
        ) : (
          <>
            <div className=" bg-white rounded-md py-2 px-3 mb-4">
              <FilterBar
                selectedCategory={selectedCategory}
                timeFilter={timeFilter}
                sortBy={sortBy}
                searchQuery={searchQuery}
                showFilters={showFilters}
                availableCategories={availableCategories}
                setSelectedCategory={setSelectedCategory}
                setTimeFilter={setTimeFilter}
                setSortBy={setSortBy}
                setSearchQuery={setSearchQuery}
                setShowFilters={setShowFilters}
                clearAllFilters={clearAllFilters}
                activeFiltersCount={activeFiltersCount}
                totalVideos={videos.length}
                filteredVideos={filteredAndSortedVideos.length}
                numOfVideos={numOfVideos}
                onNumOfVideos={setNumOfVideos}
                selectedRegion={selectedRegion}
                onSelectedRegion={setSelectedRegion}
                loading={loading}
              />
            </div>
            <StatsCards
              videos={filteredAndSortedVideos}
              regionCode={selectedRegion}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <TrendingChart videos={filteredAndSortedVideos} />
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Current Region:{" "}
                      {
                        REGION_CODES[
                          selectedRegion as keyof typeof REGION_CODES
                        ]
                      }
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Total Videos:
                        </span>
                        <span className="font-semibold">{videos.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Filtered Videos:
                        </span>
                        <span className="font-semibold">
                          {filteredAndSortedVideos.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Categories:
                        </span>
                        <span className="font-semibold">
                          {availableCategories.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Last Updated:
                        </span>
                        <span className="font-semibold">
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {filteredAndSortedVideos.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No videos found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms to find more
                    videos.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Clear Filters
                  </button>
                </CardContent>
              </Card>
            ) : (
              <VideoDisplay
                videos={filteredAndSortedVideos}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

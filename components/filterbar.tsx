// components/filter-bar.tsx
"use client";

import React from "react";
import { Filter, X, Search } from "lucide-react";
import { REGION_CODES } from "@/lib/youtube";

export type TimeFilter = "24h" | "7d" | "30d" | "all";
export type SortOption = "views" | "likes" | "comments" | "recent";

interface Category {
  id: string;
  name: string;
}

interface FilterBarProps {
  // Filter states
  selectedCategory: string;
  timeFilter: TimeFilter;
  sortBy: SortOption;
  searchQuery: string;
  showFilters: boolean;

  // Available options
  availableCategories: Category[];

  // State setters
  setSelectedCategory: (category: string) => void;
  setTimeFilter: (filter: TimeFilter) => void;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (query: string) => void;
  setShowFilters: (show: boolean) => void;

  // Actions
  clearAllFilters: () => void;

  // Computed values
  activeFiltersCount: number;
  totalVideos: number;
  filteredVideos: number;

  numOfVideos: number;
  onNumOfVideos: React.Dispatch<React.SetStateAction<number>>;
  selectedRegion: string;
  onSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

export function FilterBar({
  selectedCategory,
  timeFilter,
  sortBy,
  searchQuery,
  showFilters,
  availableCategories,
  setSelectedCategory,
  setTimeFilter,
  setSortBy,
  setSearchQuery,
  setShowFilters,
  clearAllFilters,
  activeFiltersCount,
  totalVideos,
  filteredVideos,
  numOfVideos,
  onNumOfVideos,
  selectedRegion,
  onSelectedRegion,
  loading,
}: FilterBarProps) {
  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center space-x-2 px-4 py-2 border rounded-md transition-colors mb-2 ${
          showFilters
            ? "bg-red-50 border-red-300 text-red-700"
            : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col flex-start gap-2 md:hidden ">
                <div className="flex gap-2 items-center justify-start">
                  Videos count:
                  <select
                    value={numOfVideos}
                    onChange={(e) => onNumOfVideos(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  >
                    {[10, 20, 30, 50].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <select
                  value={selectedRegion}
                  onChange={(e) => onSelectedRegion(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                  disabled={loading}
                >
                  {Object.entries(REGION_CODES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <option value="all">All Categories</option>
                {availableCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Time Filter */}
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <option value="all">All Time</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
              >
                <option value="views">Sort by Views</option>
                <option value="likes">Sort by Likes</option>
                <option value="comments">Sort by Comments</option>
                <option value="recent">Sort by Recent</option>
              </select>
            </div>

            {/* Active Filters & Clear */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Active filters:</span>
                  {selectedCategory !== "all" && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {
                        availableCategories.find(
                          (cat) => cat.id === selectedCategory
                        )?.name
                      }
                    </span>
                  )}
                  {timeFilter !== "all" && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {timeFilter === "24h"
                        ? "Last 24h"
                        : timeFilter === "7d"
                        ? "Last 7 days"
                        : "Last 30 days"}
                    </span>
                  )}
                  {searchQuery.trim() && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      &apos;{searchQuery}&apos;
                    </span>
                  )}
                  {sortBy !== "views" && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                      Sort: {sortBy}
                    </span>
                  )}
                </div>
                <button
                  onClick={clearAllFilters}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                >
                  <X className="w-4 h-4" />
                  <span>Clear all</span>
                </button>
              </div>
            )}

            {/* Results Summary */}
            <div className="mt-4">
              <p className="text-gray-600 text-sm">
                Showing {filteredVideos} of {totalVideos} videos
                {selectedCategory !== "all" &&
                  ` in ${
                    availableCategories.find(
                      (cat) => cat.id === selectedCategory
                    )?.name
                  }`}
                {timeFilter !== "all" &&
                  ` from ${
                    timeFilter === "24h"
                      ? "last 24 hours"
                      : timeFilter === "7d"
                      ? "last 7 days"
                      : "last 30 days"
                  }`}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

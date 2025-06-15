// components/RegionMap.tsx
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getTrendingVideos, REGION_CODES } from "@/lib/youtube";
import { formatNumber } from "@/lib/utils";
import { Globe, Video } from "lucide-react";

interface RegionStats {
  regionCode: string;
  regionName: string;
  totalVideos: number;
  totalViews: number;
  totalLikes: number;
  avgViews: number;
  loading: boolean;
}

interface RegionMapProps {
  currentRegion: string;
  onRegionSelect: (regionCode: string) => void;
}

export function RegionMap({ currentRegion, onRegionSelect }: RegionMapProps) {
  const [regionStatsList, setRegionStatsList] = useState<RegionStats[]>([]);
  const [loadingRegions, setLoadingRegions] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with current region
    initializeRegionStats();
  }, []);

  const initializeRegionStats = () => {
    const initialStats: RegionStats[] = Object.entries(REGION_CODES).map(
      ([code, name]) => ({
        regionCode: code,
        regionName: name,
        totalVideos: 0,
        totalViews: 0,
        totalLikes: 0,
        avgViews: 0,
        loading: false,
      })
    );
    setRegionStatsList(initialStats);
  };

  const loadRegionStats = async (regionCode: string) => {
    if (loadingRegions.includes(regionCode)) return;

    setLoadingRegions((prev) => [...prev, regionCode]);

    try {
      const data = await getTrendingVideos(regionCode, 20);
      const totalViews = data.videos.reduce(
        (sum, video) => sum + parseInt(video.viewCount),
        0
      );
      const totalLikes = data.videos.reduce(
        (sum, video) => sum + parseInt(video.likeCount),
        0
      );
      const avgViews = Math.floor(totalViews / data.videos.length);

      setRegionStatsList((prev) =>
        prev.map((region) =>
          region.regionCode === regionCode
            ? {
                ...region,
                totalVideos: data.videos.length,
                totalViews,
                totalLikes,
                avgViews,
                loading: false,
              }
            : region
        )
      );
    } catch (error) {
      console.error(`Error loading stats for ${regionCode}:`, error);
    } finally {
      setLoadingRegions((prev) => prev.filter((code) => code !== regionCode));
    }
  };

  const handleRegionClick = (regionCode: string) => {
    onRegionSelect(regionCode);
    if (
      !regionStatsList.find(
        (r) => r.regionCode === regionCode && r.totalVideos > 0
      )
    ) {
      loadRegionStats(regionCode);
    }
  };

  const sortedRegions = [...regionStatsList].sort((a, b) => {
    if (a.regionCode === currentRegion) return -1;
    if (b.regionCode === currentRegion) return 1;
    return b.totalViews - a.totalViews;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Globe className="w-5 h-5" />
          <span>Regional Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedRegions.slice(0, 10).map((region) => {
            const isSelected = region.regionCode === currentRegion;
            const isLoading = loadingRegions.includes(region.regionCode);
            const hasData = region.totalVideos > 0;

            return (
              <div
                key={region.regionCode}
                onClick={() => handleRegionClick(region.regionCode)}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  isSelected
                    ? "bg-red-50 border-red-200 shadow-sm"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isSelected
                          ? "bg-red-500"
                          : hasData
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <div>
                      <h4
                        className={`font-medium ${
                          isSelected ? "text-red-900" : "text-gray-900"
                        }`}
                      >
                        {region.regionName}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {region.regionCode}
                      </p>
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600" />
                  ) : hasData ? (
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Video className="w-3 h-3" />
                        <span>{region.totalVideos}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatNumber(region.totalViews.toString())} views
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                      Click to load
                    </div>
                  )}
                </div>

                {hasData && (
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-1 bg-blue-50 rounded">
                      <div className="font-medium text-blue-800">
                        {formatNumber(region.totalViews.toString())}
                      </div>
                      <div className="text-blue-600">Views</div>
                    </div>
                    <div className="text-center p-1 bg-green-50 rounded">
                      <div className="font-medium text-green-800">
                        {formatNumber(region.totalLikes.toString())}
                      </div>
                      <div className="text-green-600">Likes</div>
                    </div>
                    <div className="text-center p-1 bg-purple-50 rounded">
                      <div className="font-medium text-purple-800">
                        {formatNumber(region.avgViews.toString())}
                      </div>
                      <div className="text-purple-600">Avg</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            Click on a region to switch and load trending videos
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

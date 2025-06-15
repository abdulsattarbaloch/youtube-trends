import { REGION_CODES } from "@/lib/youtube";
import { RefreshCw } from "lucide-react";
import Logo from "./logo";

interface NavbarProps {
  numOfVideos: number;
  onNumOfVideos: React.Dispatch<React.SetStateAction<number>>;
  selectedRegion: string;
  onSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  fetchTrendingVideos: (regionCode: string, num: number) => Promise<void>;
}

export default function Navbar({
  numOfVideos,
  onNumOfVideos,
  selectedRegion,
  onSelectedRegion,
  loading,
  fetchTrendingVideos,
}: NavbarProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Logo />
          </div>
          <div className="flex items-center space-x-4">
            <div className=" hidden md:flex space-x-4">
              <div className="flex gap-2 items-center justify-center">
                No. of videos
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

            <button
              onClick={() => fetchTrendingVideos(selectedRegion, numOfVideos)}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

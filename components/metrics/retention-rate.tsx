import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, TrendingDown, TrendingUp, Eye, BarChart3, AlertTriangle } from 'lucide-react';

const RetentionRateCard = ({ 
  videoData = {
    title: "Complete React Tutorial - Build Your First App",
    duration: 1800, // 30 minutes in seconds
    views: 450000,
    totalWatchTime: 13500000, // Total seconds watched across all views
    averageViewDuration: 900, // Average seconds watched per view
    publishedAt: "2024-06-05T14:00:00Z",
    retentionPoints: [
      { timestamp: 0, retention: 100 },
      { timestamp: 15, retention: 85 },
      { timestamp: 30, retention: 78 },
      { timestamp: 60, retention: 72 },
      { timestamp: 120, retention: 68 },
      { timestamp: 300, retention: 58 },
      { timestamp: 600, retention: 45 },
      { timestamp: 900, retention: 35 },
      { timestamp: 1200, retention: 28 },
      { timestamp: 1500, retention: 22 },
      { timestamp: 1800, retention: 18 }
    ],
    keyMoments: [
      { timestamp: 45, type: "drop", description: "Introduction ends", retention: 78 },
      { timestamp: 320, type: "peak", description: "Code demo starts", retention: 62 },
      { timestamp: 890, type: "drop", description: "Mid-video slump", retention: 35 }
    ],
    contentType: "tutorial" // tutorial, entertainment, review, etc.
  }
}) => {
  const [showDetailedChart, setShowDetailedChart] = useState(false);
  
  // Calculate retention metrics
  const avgRetentionRate = ((videoData.averageViewDuration / videoData.duration) * 100).toFixed(1);
  const totalRetentionRate = ((videoData.totalWatchTime / (videoData.views * videoData.duration)) * 100).toFixed(1);
  
  // Get retention category based on content type
  const getRetentionCategory = (rate, contentType) => {
    const benchmarks = {
      tutorial: { excellent: 50, good: 35, average: 25 },
      entertainment: { excellent: 45, good: 30, average: 20 },
      review: { excellent: 40, good: 28, average: 18 },
      default: { excellent: 45, good: 30, average: 20 }
    };
    
    const benchmark = benchmarks[contentType] || benchmarks.default;
    
    if (rate >= benchmark.excellent) return { 
      label: 'Excellent', 
      color: 'bg-green-500',
      icon: '🎯'
    };
    if (rate >= benchmark.good) return { 
      label: 'Good', 
      color: 'bg-blue-500',
      icon: '📈'
    };
    if (rate >= benchmark.average) return { 
      label: 'Average', 
      color: 'bg-yellow-500',
      icon: '📊'
    };
    return { 
      label: 'Needs Work', 
      color: 'bg-red-500',
      icon: '📉'
    };
  };
  
  // Format time duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };
  
  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const remainingSecs = seconds % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };
  
  // Calculate retention curve points for mini chart
  const getRetentionCurvePoints = () => {
    const width = 200;
    const height = 60;
    const points = videoData.retentionPoints.map((point, index) => {
      const x = (point.timestamp / videoData.duration) * width;
      const y = height - ((point.retention / 100) * height);
      return `${x},${y}`;
    }).join(' ');
    
    return points;
  };
  
  // Find critical drop-off points
  const findCriticalDrops = () => {
    const drops = [];
    for (let i = 1; i < videoData.retentionPoints.length; i++) {
      const current = videoData.retentionPoints[i];
      const previous = videoData.retentionPoints[i - 1];
      const dropPercentage = previous.retention - current.retention;
      
      if (dropPercentage > 10) { // Significant drop
        drops.push({
          timestamp: current.timestamp,
          drop: dropPercentage,
          retention: current.retention
        });
      }
    }
    return drops.slice(0, 3); // Top 3 drops
  };
  
  const category = getRetentionCategory(parseFloat(avgRetentionRate), videoData.contentType);
  const criticalDrops = findCriticalDrops();
  
  // Calculate early retention (first 30 seconds)
  const earlyRetention = videoData.retentionPoints.find(p => p.timestamp >= 30)?.retention || 100;
  
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Play className="h-5 w-5" />
            Retention Rate
          </CardTitle>
          <Badge className={`${category.color} text-white`}>
            {category.icon} {category.label}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-600">
          {videoData.title}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Retention Display */}
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            {avgRetentionRate}%
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Average Retention Rate
          </p>
        </div>

        {/* Mini Retention Curve */}
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Retention Curve</span>
            <button 
              onClick={() => setShowDetailedChart(!showDetailedChart)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              {showDetailedChart ? 'Hide' : 'Show'} Details
            </button>
          </div>
          
          <svg width="200" height="60" className="w-full h-12">
            <polyline
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              points={getRetentionCurvePoints()}
            />
            <defs>
              <linearGradient id="retentionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <polygon
              fill="url(#retentionGradient)"
              points={`0,60 ${getRetentionCurvePoints()} 200,60`}
            />
          </svg>
          
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0:00</span>
            <span>{formatTime(videoData.duration)}</span>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatDuration(videoData.averageViewDuration)}
            </div>
            <div className="text-xs text-gray-500">Avg Watch Time</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Eye className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {earlyRetention}%
            </div>
            <div className="text-xs text-gray-500">30s Retention</div>
          </div>
        </div>

        {/* Critical Insights */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Video Length:</span>
            <span className="font-medium">{formatDuration(videoData.duration)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Watch Time:</span>
            <span className="font-medium">
              {Math.round(videoData.totalWatchTime / 3600)}h
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Content Type:</span>
            <span className="font-medium capitalize">{videoData.contentType}</span>
          </div>
        </div>

        {/* Critical Drop Points */}
        {criticalDrops.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Critical Drops</span>
            </div>
            <div className="space-y-1">
              {criticalDrops.map((drop, index) => (
                <div key={index} className="flex justify-between items-center text-xs bg-orange-50 p-2 rounded">
                  <span className="text-gray-600">
                    {formatTime(drop.timestamp)}
                  </span>
                  <span className="text-orange-700 font-medium">
                    -{drop.drop.toFixed(1)}% drop
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Moments */}
        {videoData.keyMoments && videoData.keyMoments.length > 0 && showDetailedChart && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Key Moments</span>
            </div>
            <div className="space-y-2">
              {videoData.keyMoments.map((moment, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">
                    {formatTime(moment.timestamp)} - {moment.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {moment.type === 'peak' ? 
                      <TrendingUp className="h-3 w-3 text-green-500" /> : 
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    }
                    <span className={`font-medium ${
                      moment.type === 'peak' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {moment.retention}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Improvement Suggestions */}
        <div className="pt-4 border-t bg-blue-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Quick Tips</h4>
          <div className="space-y-1 text-xs text-blue-800">
            {parseFloat(avgRetentionRate) < 30 && (
              <div>• Hook viewers in first 15 seconds</div>
            )}
            {earlyRetention < 80 && (
              <div>• Improve your video opening</div>
            )}
            {criticalDrops.length > 2 && (
              <div>• Review content pacing at drop points</div>
            )}
            <div>• Add pattern interrupts every 2-3 minutes</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Dashboard component
const RetentionRateDashboard = () => {
  const sampleVideos = [
    {
      title: "JavaScript Fundamentals Course",
      duration: 2400, // 40 minutes
      views: 320000,
      totalWatchTime: 38400000,
      averageViewDuration: 1200,
      publishedAt: "2024-06-01T10:00:00Z",
      contentType: "tutorial",
      retentionPoints: [
        { timestamp: 0, retention: 100 },
        { timestamp: 15, retention: 88 },
        { timestamp: 30, retention: 82 },
        { timestamp: 60, retention: 78 },
        { timestamp: 120, retention: 75 },
        { timestamp: 300, retention: 68 },
        { timestamp: 600, retention: 58 },
        { timestamp: 1200, retention: 45 },
        { timestamp: 1800, retention: 35 },
        { timestamp: 2400, retention: 28 }
      ],
      keyMoments: [
        { timestamp: 35, type: "drop", description: "Intro ends", retention: 82 },
        { timestamp: 180, type: "peak", description: "First example", retention: 72 },
        { timestamp: 1100, type: "drop", description: "Complex topic", retention: 48 }
      ]
    },
    {
      title: "React vs Vue: The Ultimate Comparison",
      duration: 900, // 15 minutes
      views: 180000,
      totalWatchTime: 8100000,
      averageViewDuration: 450,
      publishedAt: "2024-06-08T15:00:00Z",
      contentType: "review",
      retentionPoints: [
        { timestamp: 0, retention: 100 },
        { timestamp: 15, retention: 82 },
        { timestamp: 30, retention: 75 },
        { timestamp: 60, retention: 68 },
        { timestamp: 180, retention: 58 },
        { timestamp: 450, retention: 42 },
        { timestamp: 720, retention: 28 },
        { timestamp: 900, retention: 22 }
      ],
      keyMoments: [
        { timestamp: 25, type: "drop", description: "Setup discussion", retention: 75 },
        { timestamp: 420, type: "peak", description: "Live demo", retention: 45 }
      ]
    },
    {
      title: "10 Funny Coding Memes Explained",
      duration: 480, // 8 minutes
      views: 95000,
      totalWatchTime: 2850000,
      averageViewDuration: 300,
      publishedAt: "2024-06-10T18:00:00Z",
      contentType: "entertainment",
      retentionPoints: [
        { timestamp: 0, retention: 100 },
        { timestamp: 15, retention: 85 },
        { timestamp: 30, retention: 78 },
        { timestamp: 60, retention: 72 },
        { timestamp: 120, retention: 65 },
        { timestamp: 240, retention: 55 },
        { timestamp: 360, retention: 45 },
        { timestamp: 480, retention: 38 }
      ],
      keyMoments: [
        { timestamp: 45, type: "peak", description: "First meme reaction", retention: 75 },
        { timestamp: 200, type: "drop", description: "Mid-video slump", retention: 58 }
      ]
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Retention Rate Analytics
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleVideos.map((video, index) => (
            <RetentionRateCard key={index} videoData={video} />
          ))}
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Benchmarks by Content Type */}
          <div className="p-4 bg-white rounded-lg border">
            <h3 className="font-semibold text-gray-900 mb-3">
              Retention Benchmarks by Content Type
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <div className="font-medium text-gray-700">Tutorials</div>
                <div className="text-gray-600">Excellent: >50% | Good: 35-50% | Average: 25-35%</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">Entertainment</div>
                <div className="text-gray-600">Excellent: >45% | Good: 30-45% | Average: 20-30%</div>
              </div>
              <div>
                <div className="font-medium text-gray-700">Reviews</div>
                <div className="text-gray-600">Excellent: >40% | Good: 28-40% | Average: 18-28%</div>
              </div>
            </div>
          </div>

          {/* Optimization Tips */}
          <div className="p-4 bg-white rounded-lg border">
            <h3 className="font-semibold text-gray-900 mb-3">
              Retention Optimization Tips
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Hook viewers within first 15 seconds with a preview/question</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Use pattern interrupts: graphics, cuts, music changes</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Create loops: reference future content throughout video</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>Analyze drop-off points and improve pacing there</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetentionRateDashboard;
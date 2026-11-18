import VideoCard from './VideoCard';

interface Video {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  views: number;
}

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
  loaderText: string;
  error: string | null;
  showFeatured?: boolean;
}

export default function VideoGrid({ videos, loading, loaderText, error, showFeatured = true }: VideoGridProps) {
  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center py-20">
            <div className="glass-strong rounded-3xl p-10 max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-red-400 mb-2 font-medium">Something went wrong</p>
              <p className="text-gray-500 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center py-20">
            <div className="loader"></div>
            <p className="text-gray-500 text-sm mt-6">{loaderText}</p>
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center py-20">
            <div className="glass-strong rounded-3xl p-10 max-w-md mx-auto">
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-gray-400 text-lg font-medium mb-2">No videos found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show featured first video if enabled
  const featuredVideo = showFeatured && videos.length > 0 ? videos[0] : null;
  const remainingVideos = showFeatured ? videos.slice(1) : videos;

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl md:text-2xl font-bold flex items-center gap-2">
            <span className="w-1 h-6 bg-yt rounded-full"></span>
            {showFeatured ? 'Latest Videos' : 'All Videos'}
          </h2>
          <span className="text-sm text-gray-500">{videos.length} videos</span>
        </div>

        {/* Featured Video */}
        {featuredVideo && (
          <div className="grid grid-cols-1 mb-8">
            <VideoCard
              id={featuredVideo.id}
              title={featuredVideo.title}
              publishedAt={featuredVideo.publishedAt}
              thumbnail={featuredVideo.thumbnail}
              views={featuredVideo.views}
              featured
            />
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {remainingVideos.map((video, index) => (
            <VideoCard
              key={`${video.id}-${index}`}
              id={video.id}
              title={video.title}
              publishedAt={video.publishedAt}
              thumbnail={video.thumbnail}
              views={video.views}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

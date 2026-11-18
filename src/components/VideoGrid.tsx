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
  onRetry: () => void;
}

export default function VideoGrid({ videos, loading, loaderText, error, onRetry }: VideoGridProps) {
  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="col-span-full text-center py-20">
            <div className="glass rounded-3xl p-10 max-w-md mx-auto">
              <p className="text-red-400 mb-4">⚠️ {error}</p>
              <button
                onClick={onRetry}
                className="glass px-6 py-3 rounded-full hover:bg-white/10 cursor-pointer transition-all"
              >
                Check API Key
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <VideoCard
              key={`${video.id}-${index}`}
              id={video.id}
              title={video.title}
              publishedAt={video.publishedAt}
              thumbnail={video.thumbnail}
              views={video.views}
            />
          ))}
        </div>

        {loading && (
          <div className="flex flex-col items-center py-12">
            <div className="loader"></div>
            <p className="text-gray-500 text-sm mt-4">{loaderText}</p>
          </div>
        )}

        {!loading && videos.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No videos found.</p>
          </div>
        )}
      </div>
    </section>
  );
}

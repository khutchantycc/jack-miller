import { formatNumber, formatDate } from '../utils/format';

interface VideoCardProps {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  views: number;
  index?: number;
  featured?: boolean;
}

export default function VideoCard({ id, title, publishedAt, thumbnail, views, index = 0, featured = false }: VideoCardProps) {
  const fallbackThumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  const staggerClass = index < 8 ? `stagger-${Math.min(index + 1, 5)}` : '';

  if (featured) {
    return (
      <a
        href={`https://www.youtube.com/watch?v=${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="featured-card glass-strong rounded-3xl overflow-hidden block fade-in-up col-span-full"
      >
        <div className="relative aspect-video md:aspect-[21/9] bg-dark-700 overflow-hidden">
          <img
            src={thumbnail || fallbackThumb}
            alt={title}
            className="w-full h-full object-cover card-thumbnail"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = fallbackThumb; }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-transparent"></div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="badge px-3 py-1 rounded-full text-xs font-semibold text-yt-light">
                ★ Featured
              </span>
              <span className="text-gray-400 text-xs">{formatDate(publishedAt)}</span>
            </div>
            <h2 className="font-display text-xl md:text-3xl font-bold mb-2 line-clamp-2">{title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              {views > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {formatNumber(views)} views
                </span>
              )}
            </div>
          </div>

          {/* Play button */}
          <div className="featured-overlay absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-yt rounded-full flex items-center justify-center pulse-glow">
              <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`video-card glass rounded-2xl overflow-hidden block fade-in ${staggerClass}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative aspect-video bg-dark-700 overflow-hidden">
        <img
          src={thumbnail || fallbackThumb}
          alt={title}
          className="w-full h-full object-cover card-thumbnail"
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = fallbackThumb; }}
        />
        {/* Duration-like badge */}
        <div className="absolute top-3 right-3 glass px-2 py-1 rounded-md text-xs font-mono">
          {formatDate(publishedAt)}
        </div>
        {/* Play overlay */}
        <div className="play-overlay absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-14 h-14 bg-yt rounded-full flex items-center justify-center shadow-lg shadow-yt/30">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-3 line-clamp-2 leading-snug">{title}</h3>
        <div className="flex items-center justify-between text-xs text-gray-500">
          {views > 0 ? (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {formatNumber(views)}
            </span>
          ) : (
            <span></span>
          )}
          <span className="text-gray-600">{formatDate(publishedAt)}</span>
        </div>
      </div>
    </a>
  );
}

import { formatNumber, formatDate } from '../utils/format';

interface VideoCardProps {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  views: number;
}

export default function VideoCard({ id, title, publishedAt, thumbnail, views }: VideoCardProps) {
  const fallbackThumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="video-card glass rounded-2xl overflow-hidden block fade-in"
    >
      <div className="relative aspect-video bg-dark-700 overflow-hidden">
        <img
          src={thumbnail || fallbackThumb}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackThumb;
          }}
        />
        <div className="play-overlay absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-14 h-14 bg-yt rounded-full flex items-center justify-center">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 leading-snug">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {views > 0 && <span>{formatNumber(views)} views</span>}
          {views > 0 && <span>•</span>}
          <span>{formatDate(publishedAt)}</span>
        </div>
      </div>
    </a>
  );
}

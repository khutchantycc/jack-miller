import { formatNumber } from '../utils/format';

interface HeroProps {
  channelInfo: {
    title: string;
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
  } | null;
  statusText: string;
  totalVideos: number;
}

export default function Hero({ channelInfo, statusText, totalVideos }: HeroProps) {
  return (
    <section className="hero-bg pt-28 md:pt-32 pb-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-yt/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left - Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 badge px-4 py-2 rounded-full mb-6 fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">{statusText}</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 fade-in-up">
              All <span className="gradient-text">Videos</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 fade-in-up stagger-2">
              Every video from the channel — fetched live from YouTube. Browse, search, and discover content.
            </p>

            {/* Channel Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 fade-in-up stagger-3">
              <div className="glass-strong px-5 py-3 rounded-2xl min-w-[100px]">
                <div className="text-xl md:text-2xl font-display font-bold gradient-text">
                  {channelInfo ? formatNumber(channelInfo.subscriberCount) : '—'}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Subscribers</div>
              </div>
              <div className="glass-strong px-5 py-3 rounded-2xl min-w-[100px]">
                <div className="text-xl md:text-2xl font-display font-bold gradient-text-purple">
                  {channelInfo ? formatNumber(channelInfo.videoCount) : '—'}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Videos</div>
              </div>
              <div className="glass-strong px-5 py-3 rounded-2xl min-w-[100px]">
                <div className="text-xl md:text-2xl font-display font-bold gradient-text">
                  {channelInfo ? formatNumber(channelInfo.viewCount) : '—'}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">Total Views</div>
              </div>
            </div>
          </div>

          {/* Right - Channel Card */}
          {channelInfo && (
            <div className="shrink-0 fade-in-up stagger-4">
              <div className="glass-strong rounded-3xl p-6 max-w-xs">
                <div className="flex items-center gap-4 mb-4">
                  {channelInfo.thumbnail && (
                    <img
                      src={channelInfo.thumbnail}
                      alt={channelInfo.title}
                      className="w-16 h-16 rounded-full object-cover border-2 border-yt/30"
                    />
                  )}
                  <div>
                    <h3 className="font-display font-bold text-lg">{channelInfo.title}</h3>
                    <p className="text-gray-500 text-sm">@{channelInfo.title.toLowerCase().replace(/\s/g, '')}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {channelInfo.description || 'Welcome to the channel!'}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Joined {new Date(channelInfo.publishedAt).getFullYear()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

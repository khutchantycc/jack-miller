import { useState } from 'react';

interface NavbarProps {
  channelName: string;
  onOpenApiModal: () => void;
}

export default function Navbar({ channelName, onOpenApiModal }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yt rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
              <path fill="#0a0a0f" d="M9.545 15.56V8.44L15.818 12z" />
            </svg>
          </div>
          <span className="font-display font-bold text-xl">{channelName}</span>
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenApiModal}
            className="glass px-4 py-2 rounded-full text-sm hover:bg-white/10 transition-all cursor-pointer"
          >
            ⚙️ API Key
          </button>
          <a
            href="https://www.youtube.com/channel/UCFW399C6JkpIkSnUQ0LYJ_Q?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-btn bg-yt text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
          >
            Subscribe
          </a>
        </div>
      </div>
    </nav>
  );
}

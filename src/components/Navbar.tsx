import { useState } from 'react';

type MenuTab = 'home' | 'popular' | 'recent' | 'about';

interface NavbarProps {
  channelName: string;
  activeTab: MenuTab;
  onTabChange: (tab: MenuTab) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function Navbar({
  channelName,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems: { label: string; value: MenuTab; icon: string }[] = [
    { label: 'Home', value: 'home', icon: '🏠' },
    { label: 'Popular', value: 'popular', icon: '🔥' },
    { label: 'Recent', value: 'recent', icon: '✨' },
    { label: 'About', value: 'about', icon: 'ℹ️' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-yt rounded-xl flex items-center justify-center pulse-glow">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                <path fill="#0a0a0f" d="M9.545 15.56V8.44L15.818 12z" />
              </svg>
            </div>
            <span className="font-display font-bold text-lg md:text-xl hidden sm:block">{channelName}</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onTabChange(item.value)}
                className={`menu-item px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeTab === item.value
                    ? 'active text-white bg-white/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Search & Subscribe */}
          <div className="flex items-center gap-3">
            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center glass rounded-full px-4 py-2 w-64">
              <svg className="w-4 h-4 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search videos..."
                className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full"
              />
            </div>

            <a
              href="https://www.youtube.com/channel/UCFW399C6JkpIkSnUQ0LYJ_Q?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn bg-yt text-white px-4 md:px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2 shrink-0"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.56V8.44L15.818 12z" />
              </svg>
              <span className="hidden sm:inline">Subscribe</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden glass w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-3">
          <div className="flex items-center glass rounded-full px-4 py-2.5">
            <svg className="w-4 h-4 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search videos..."
              className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 right-0 h-full w-72 bg-dark-900/95 backdrop-blur-xl z-50 p-6 ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="flex items-center justify-between mb-8">
          <span className="font-display font-bold text-lg">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="glass w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.value}
              onClick={() => { onTabChange(item.value); setMobileMenuOpen(false); }}
              className={`sidebar-item px-4 py-3 rounded-xl text-left cursor-pointer ${
                activeTab === item.value ? 'active text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}

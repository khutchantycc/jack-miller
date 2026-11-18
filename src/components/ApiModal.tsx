import { useState, useEffect } from 'react';
import { getApiKey, setApiKey } from '../utils/api';

interface ApiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ApiModal({ isOpen, onClose, onSave }: ApiModalProps) {
  const [key, setKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      setKey(getApiKey());
    }
  }, [isOpen]);

  const handleSave = () => {
    const trimmed = key.trim();
    if (!trimmed) {
      alert('Please enter a valid API key');
      return;
    }
    setApiKey(trimmed);
    onClose();
    onSave();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="glass rounded-3xl p-8 max-w-lg w-full">
        <h2 className="font-display text-2xl font-bold mb-2">YouTube API Key</h2>
        <p className="text-gray-400 text-sm mb-4">
          Change your YouTube Data API v3 key below.
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="AIza..."
          className="w-full glass rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-yt/50 mb-4 bg-transparent"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
        />
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-yt text-white py-3 rounded-xl font-semibold glow-btn cursor-pointer"
          >
            Save & Reload
          </button>
          <button
            onClick={onClose}
            className="flex-1 glass py-3 rounded-xl font-semibold hover:bg-white/10 cursor-pointer transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

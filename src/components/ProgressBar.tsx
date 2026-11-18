interface ProgressBarProps {
  progress: number;
  visible: boolean;
}

export default function ProgressBar({ progress, visible }: ProgressBarProps) {
  if (!visible) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
      <div
        className="progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

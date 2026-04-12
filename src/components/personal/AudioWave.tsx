interface AudioWaveProps {
  bars?: number;
  color?: string;
  animate?: boolean;
}

const AudioWave: React.FC<AudioWaveProps> = ({ 
  bars = 4,
  color = "bg-theme-main",
  animate = true
}: AudioWaveProps) => {
  const offsets = ["-0.6s", "-0.1s", "-0.4s", "-0.7s"];
  // Static heights for when animation is off
  const staticHeights = ["40%", "70%", "50%", "85%"];

  return (
    <div className="flex items-end space-x-px h-2.5">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-0.5 rounded-sm ${color} ${animate ? 'animate-audio-wave' : ''}`}
          style={{ 
            animationDelay: offsets[i % offsets.length],
            height: animate ? undefined : staticHeights[i % staticHeights.length]
          }}
        />
      ))}
    </div>
  );
}

export default AudioWave;
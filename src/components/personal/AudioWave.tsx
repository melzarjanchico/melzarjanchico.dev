export default function AudioWave({ bars = 4, color = "bg-green-400" }) {
  const offsets = ["-0.6s", "-0.1s", "-0.4s", "-0.7s"];

  return (
    <div className="flex items-end space-x-px h-[10px]">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-[2px] rounded-sm ${color} animate-audio-wave`}
          style={{ animationDelay: offsets[i % offsets.length] }}
        />
      ))}
    </div>
  );
}
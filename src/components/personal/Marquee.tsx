import { useEffect, useRef, useState } from "react";

type MarqueeTextProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number; 
  gap?: number;
};

const MarqueeText: React.FC<MarqueeTextProps> = ({
  children,
  className = "",
  speed = 50,
  gap = 30,
}: MarqueeTextProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const calculate = () => {
      if (!containerRef.current || !textRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;

      // Only enable animation if text exceeds the container
      if (textWidth > containerWidth) {
        setShouldAnimate(true);
        setDuration((textWidth + gap) / speed);
      } else {
        setShouldAnimate(false);
      }
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [children, gap, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden flex items-center ${className}`}
      style={{
        WebkitMaskImage: shouldAnimate 
          ? 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' 
          : 'none',
        maskImage: shouldAnimate 
          ? 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' 
          : 'none',
      }}
    >
      <div
        className="flex flex-row whitespace-nowrap"
        style={{
          animation: shouldAnimate ? `marquee-percent ${duration}s linear infinite` : 'none',
          willChange: shouldAnimate ? 'transform' : 'auto',
        }}
      >
        <span ref={textRef} style={{ paddingRight: shouldAnimate ? `${gap}px` : "0px" }} className="shrink-0">
          {children}
        </span>

        {shouldAnimate && (
          <span style={{ paddingRight: `${gap}px` }} className="shrink-0">
            {children}
          </span>
        )}
      </div>

      <style>{`
        @keyframes marquee-percent {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default MarqueeText;
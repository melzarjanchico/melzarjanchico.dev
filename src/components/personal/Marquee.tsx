import { useEffect, useRef, useState, useId } from "react";

type MarqueeTextProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  pauseDuration?: number;
};

const MarqueeText: React.FC<MarqueeTextProps> = ({
  children,
  className = "",
  speed = 25,
  pauseDuration = 5,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const uniqueId = useId().replace(/:/g, "");
  
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isFirstRun, setIsFirstRun] = useState(true);

  useEffect(() => {
    const calculateDimensions = () => {
      const container = containerRef.current;
      const text = textRef.current;
      if (!container || !text) return;

      const containerWidth = container.offsetWidth;
      const textWidth = text.scrollWidth;

      if (textWidth > containerWidth) {
        const moveDistance = Math.round(textWidth - containerWidth);
        setDistance(moveDistance);
        setDuration(moveDistance / speed);
        setShouldAnimate(true);
      } else {
        setShouldAnimate(false);
        setIsFirstRun(true);
      }
    };

    const resizeObserver = new ResizeObserver(calculateDimensions);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    calculateDimensions();
    return () => resizeObserver.disconnect();
  }, [children, speed]);

  const totalCycleTime = (duration * 2) + pauseDuration;
  
  // Timing Percentages
  const moveEndPercent = (duration / totalCycleTime) * 100;
  const pauseEndPercent = ((duration + pauseDuration / 2) / totalCycleTime) * 100;
  
  const loopStartPause = ((pauseDuration / 4) / totalCycleTime) * 100;
  const loopMoveEnd = ((duration + (pauseDuration / 4)) / totalCycleTime) * 100;
  const loopPauseEnd = ((duration + (3 * pauseDuration / 4)) / totalCycleTime) * 100;

  const containerStyle = {
    "--move-distance": `-${distance}px`,
    "--total-cycle": `${totalCycleTime}s`,
  } as React.CSSProperties;

  // Mask Definitions
  const maskFull = 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)';
  const maskAtStart = 'linear-gradient(to right, black, black 95%, transparent)';
  const maskAtEnd = 'linear-gradient(to right, transparent, black 5%, black)';

  const animationClass = isFirstRun ? `first-${uniqueId}` : `loop-${uniqueId}`;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden flex items-center marquee-cnt-${uniqueId} ${className}`}
      style={containerStyle}
    >
      <div
        className={shouldAnimate ? animationClass : ""}
        onAnimationEnd={() => { if (isFirstRun) setIsFirstRun(false); }}
        style={{
          whiteSpace: "nowrap",
          display: "inline-block",
          willChange: "transform",
        }}
      >
        <span ref={textRef} className="inline-block">
          {children}
        </span>
      </div>

      {shouldAnimate && (
        <style>{`
          .marquee-cnt-${uniqueId} {
            mask-image: ${maskAtStart};
            -webkit-mask-image: ${maskAtStart};
            animation: mask-logic-${uniqueId} var(--total-cycle) linear ${isFirstRun ? 'forwards' : 'infinite'};
          }

          .${animationClass} {
            animation: kb-${animationClass} var(--total-cycle) linear ${isFirstRun ? 'forwards' : 'infinite'};
          }

          @keyframes mask-logic-${uniqueId} {
            /* Logic for First Run */
            ${isFirstRun ? `
              0%, 1% { mask-image: ${maskAtStart}; -webkit-mask-image: ${maskAtStart}; }
              2%, ${(moveEndPercent - 2).toFixed(2)}% { mask-image: ${maskFull}; -webkit-mask-image: ${maskFull}; }
              ${moveEndPercent.toFixed(2)}%, ${pauseEndPercent.toFixed(2)}% { mask-image: ${maskAtEnd}; -webkit-mask-image: ${maskAtEnd}; }
              ${(pauseEndPercent + 2).toFixed(2)}%, 98% { mask-image: ${maskFull}; -webkit-mask-image: ${maskFull}; }
              100% { mask-image: ${maskAtStart}; -webkit-mask-image: ${maskAtStart}; }
            ` : `
              /* Logic for Continuous Loop */
              0%, ${loopStartPause.toFixed(2)}% { mask-image: ${maskAtStart}; -webkit-mask-image: ${maskAtStart}; }
              ${(loopStartPause + 2).toFixed(2)}%, ${(loopMoveEnd - 2).toFixed(2)}% { mask-image: ${maskFull}; -webkit-mask-image: ${maskFull}; }
              ${loopMoveEnd.toFixed(2)}%, ${loopPauseEnd.toFixed(2)}% { mask-image: ${maskAtEnd}; -webkit-mask-image: ${maskAtEnd}; }
              ${(loopPauseEnd + 2).toFixed(2)}%, 98% { mask-image: ${maskFull}; -webkit-mask-image: ${maskFull}; }
              100% { mask-image: ${maskAtStart}; -webkit-mask-image: ${maskAtStart}; }
            `}
          }

          @keyframes kb-first-${uniqueId} {
            0% { transform: translateX(0); }
            ${moveEndPercent.toFixed(2)}% { transform: translateX(var(--move-distance)); }
            ${pauseEndPercent.toFixed(2)}% { transform: translateX(var(--move-distance)); }
            100% { transform: translateX(0); }
          }

          @keyframes kb-loop-${uniqueId} {
            0%, ${loopStartPause.toFixed(2)}% { transform: translateX(0); }
            ${loopMoveEnd.toFixed(2)}% { transform: translateX(var(--move-distance)); }
            ${loopPauseEnd.toFixed(2)}% { transform: translateX(var(--move-distance)); }
            100% { transform: translateX(0); }
          }
        `}</style>
      )}
    </div>
  );
};

export default MarqueeText;
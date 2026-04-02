import { useEffect, useState } from "react";

export const usePerformanceCheck = () => {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    let lowFPSCount = 0; // Track how many times we hit low FPS

    const check = () => {
      frameCount++;
      const currentTime = performance.now();

      // Run the check every 1 second
      if (currentTime - startTime >= 1000) {
        const fps = frameCount;
        
        // Only count as "slow" if it's below 35 FPS
        // (40 can be triggered by simple tab switching)
        if (fps < 35) {
          lowFPSCount++;
        } else {
          // If it speeds back up, reset the strike count
          lowFPSCount = 0;
        }

        // Only commit to "isSlow" if we fail 3 checks in a row
        if (lowFPSCount >= 3) {
          setIsSlow(true);
          return; // Stop the loop
        }

        frameCount = 0;
        startTime = currentTime;
      }
      
      if (!isSlow) {
        requestAnimationFrame(check);
      }
    };

    // Wait 4 seconds before starting the check to let 
    // the initial hydration and asset loading finish.
    const timeout = setTimeout(() => {
      requestAnimationFrame(check);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [isSlow]);

  return isSlow;
}

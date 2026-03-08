import React from "react";
import Grainient from "../components/Grainient";

interface BackgroundGrainientProps {
  className?: string;
}

const BackgroundGrainient: React.FC<BackgroundGrainientProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
    >
      <Grainient
        color1="#fdfce8"
        color2="#e2ceb1"
        color3="#c7a07a"
        timeSpeed={0.5}
        colorBalance={-1}
        warpStrength={1}
        warpFrequency={5}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={180}
        blendSoftness={1}
        rotationAmount={500}
        noiseScale={4}
        grainAmount={0.05}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </div>
  );
};

export default BackgroundGrainient;
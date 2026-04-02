import React from "react";
import { motion } from "framer-motion";
import Grainient from "../Grainient";
import type { ThemeItem } from "@/data/themes";

interface BackgroundGrainientProps {
  theme: ThemeItem;
  className?: string;
}

const BackgroundGrainient: React.FC<BackgroundGrainientProps> = ({
  theme,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
    >
      <Grainient
        color1={theme.bgColor1}
        color2={theme.bgColor2}
        color3={theme.bgColor3}
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
        grainAmount={0.03}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
    </motion.div>
  );
};

export default BackgroundGrainient;

import type { SpringOptions } from 'motion/react';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface TiltedCardProps {
  imageSrc: React.ComponentProps<'img'>['src'];
  altText?: string;
  caption?: React.ReactNode;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  themeContent: React.ReactNode;
  displayOverlayContent?: boolean;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  caption = '',
  containerHeight = "350px",
  containerWidth = "100%",
  imageHeight = "350px",
  imageWidth = "100%",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  themeContent,
  displayOverlayContent = false
}: TiltedCardProps) {
  // Logic to handle string vs object for dimensions
  const containerH = containerHeight;
  const containerW = containerWidth;
  const imageH = imageHeight;
  const imageW = imageWidth;

  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Clean spring initializations
  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);
  const scale = useSpring(1, springValues);
  const opacity = useMotionValue(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  // Ref for velocity to avoid re-renders during mouse move
  const lastY = useRef(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY.current;
    rotateFigcaption.set(-velocityY * 0.6);
    lastY.current = offsetY;
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full h-full perspective-midrange flex flex-col items-center justify-center"
      style={{
        height: containerH,
        width: containerW
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="relative group transform-3d"
        style={{
          width: imageW,
          height: imageH,
          rotateX,
          rotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-t-lg shadow-sm will-change-transform transform-[translateZ(0)] duration-300 no-img-select group-hover:rounded-lg"
          style={{
            width: imageW,
            height: imageH
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-2 will-change-transform transform-[translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}

        <motion.div className='absolute bottom-0 right-0 z-2 p-2 will-change-transform transform-[translateZ(30px)]'>
          {themeContent}
        </motion.div>

      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute border left-0 top-0 rounded-lg bg-white ms-4 px-2.5 py-1 text-[10px] text-[#2d2d2d] opacity-0 z-3 max-w-3xs hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
          // Add this to ensure opacity is snappy and doesn't "get lost"
          transition={{
            opacity: { duration: 0.15, ease: "linear" }
          }}
        >
          {caption}
        </motion.figcaption>
      )}
    </figure>
  );
}

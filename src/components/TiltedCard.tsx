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

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia("(pointer: coarse)").matches;
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  caption = '',
  containerHeight = "100%",
  containerWidth = "100%",
  imageHeight = "100%",
  imageWidth = "100%",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  themeContent,
  displayOverlayContent = false
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);
  const scale = useSpring(1, springValues);
  const opacity = useMotionValue(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const lastY = useRef(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    // Existing mobile width check + touch check
    if (!ref.current || window.innerWidth < 640 || isTouchDevice()) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY.current;
    rotateFigcaption.set(-velocityY * 0.6);
    lastY.current = offsetY;
  }

  function handleMouseEnter() {
    // If it's mobile/touch, we don't want the card to stay "stuck" zoomed in
    if (isTouchDevice()) return;

    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    rotateFigcaption.set(0);
    opacity.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative w-full shrink min-h-0 perspective-midrange flex flex-col items-center justify-center transition-all duration-300 ease-out"
      style={{
        height: containerHeight,
        width: containerWidth,
        maxHeight: "350px" 
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden z-10 bg-black/50 text-white px-2 py-1 rounded">
          This effect is not optimized for mobile.
        </div>
      )}

      <motion.div
        className="relative group transform-3d w-full h-full min-h-0 transition-all duration-300 ease-out"
        style={{
          width: imageWidth,
          height: imageHeight,
          maxHeight: "350px", 
          rotateX,
          rotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="block w-full h-full object-cover rounded-t-lg shadow-sm will-change-transform transform-[translateZ(0)] duration-300 no-img-select group-hover:rounded-lg"
          style={{ maxHeight: "350px" }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="w-full absolute top-0 left-0 z-2 will-change-transform transform-[translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}

        <motion.div className='w-full absolute bottom-0 right-0 z-2 will-change-transform transform-[translateZ(30px)]'>
          {themeContent}
        </motion.div>
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute border left-0 top-0 rounded-lg bg-white ms-4 px-2.5 py-1 text-[10px] text-[#2d2d2d] opacity-0 z-3 max-w-3xs hidden sm:block"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
          transition={{ opacity: { duration: 0.15, ease: "linear" } }}
        >
          {caption}
        </motion.figcaption>
      )}
    </figure>
  );
}
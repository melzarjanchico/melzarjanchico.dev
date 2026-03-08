import type { SpringOptions } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';


interface ResponsiveSize {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}

interface TiltedCardProps {
  imageSrc: React.ComponentProps<'img'>['src'];
  altText?: string;
  caption?: React.ReactNode;
  containerHeight?: string | ResponsiveSize;
  containerWidth?: string | ResponsiveSize;
  imageHeight?: string | ResponsiveSize;
  imageWidth?: string | ResponsiveSize;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

function useResponsiveValue(value: string | ResponsiveSize) {
  const [current, setCurrent] = useState<string>(
    typeof value === 'string' ? value : value.sm || '300px'
  );

  useEffect(() => {
    function update() {
      const w = window.innerWidth;

      if (typeof value === 'string') {
        setCurrent(value);
        return;
      }

      if (w >= 1536 && value['2xl']) setCurrent(value['2xl']);
      else if (w >= 1280 && value.xl) setCurrent(value.xl);
      else if (w >= 1024 && value.lg) setCurrent(value.lg);
      else if (w >= 768 && value.md) setCurrent(value.md);
      else setCurrent(value.sm || '300px');
    }

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [value]);

  return current;
}

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  caption = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false
}: TiltedCardProps) {
  const containerH = useResponsiveValue(containerHeight);
  const containerW = useResponsiveValue(containerWidth);
  const imageH = useResponsiveValue(imageHeight);
  const imageW = useResponsiveValue(imageWidth);

  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

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

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
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
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
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
        className="relative group [transform-style:preserve-3d]"
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
          className="absolute top-0 left-0 object-cover rounded-t-lg shadow-sm will-change-transform [transform:translateZ(0)] lg:rounded-l-l lg:rounded-t-none no-img-select group-hover:rounded-[15px] duration-300"
          style={{
            width: imageW,
            height: imageH
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute border left-0 top-0 rounded-[4px] bg-white ms-4 px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] max-w-3xs hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {caption}
        </motion.figcaption>
      )}
    </figure>
  );
}

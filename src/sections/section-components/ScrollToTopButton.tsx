import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust based on your button location
import { RiArrowUpLine } from 'react-icons/ri';

interface ScrollToTopProps {
  scrollRef: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}

const ScrollToTopButton: React.FC<ScrollToTopProps> = ({ scrollRef, isVisible }) => {
  const handleScrollToTop = () => {
    scrollRef.current?.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <Button
      onClick={handleScrollToTop}
      variant="ghost"
      className={`
        fixed bottom-5 right-7 lg:bottom-8 lg:right-11 z-999 transition-all duration-500 ease-in-out hover:scale-110 active:scale-95 rounded-full h-12 w-12 shadow-xl border border-theme-primary-dark bg-zinc-50 dark:bg-zinc-800
        ${isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none'
        }
      `}
    >
        <RiArrowUpLine className="text-theme-primary-dark" />
    </Button>
  );
};

export default ScrollToTopButton;

import type { ThemeItem } from '@/data/models';
import React, { useState } from 'react';
import { RiCheckboxBlankCircleFill, RiPaletteFill } from 'react-icons/ri';
import { THEMES_LIST as themes } from '@/data/themes';

export interface ThemeTogglerProps {
  themeColor: ThemeItem;
  setThemeColor: (theme: ThemeItem) => void;
  handleOnMouseEnter?: (text: string) => void;
  handleOnMouseLeave?: () => void;
  cycleMode?: boolean; // New prop to enable cycling behavior
  className?: string;
}

const ThemeToggler: React.FC<ThemeTogglerProps> = ({
  themeColor,
  setThemeColor,
  handleOnMouseEnter,
  handleOnMouseLeave,
  cycleMode = false,
  className = "text-theme-main filter-[drop-shadow(0_0_1px_var(--color-zinc-900))]",
}) => {
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);

  const handleToggleClick = () => {
    if (cycleMode) {
      // Find the current index and move to the next item, looping back at the end
      const currentIndex = themes.findIndex((t) => t.name === themeColor.name);
      const nextIndex = (currentIndex + 1) % themes.length;
      setThemeColor(themes[nextIndex]);
    } else {
      // Original behavior
      setIsThemePickerOpen(!isThemePickerOpen);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Theme Color Picker */}
      <div className="relative flex flex-col items-center mb-3">
        {themes
          .filter((color) => color.name !== themeColor.name)
          .map((color, index) => (
            <button
              key={color.name}
              onClick={() => {
                setThemeColor(color);
                setIsThemePickerOpen(!isThemePickerOpen);
                handleOnMouseLeave?.();
              }}
              onMouseEnter={() => handleOnMouseEnter?.(color.name)}
              onMouseLeave={() => handleOnMouseLeave?.()}
              className="relative w-5 flex items-center justify-center"
            >
              <span
                className={`absolute rounded-full transition-all duration-500 ease-out cursor-pointer text-xl ${
                  isThemePickerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                  color: color.mainColor,
                  transform: isThemePickerOpen
                    ? `translateY(-${index * 20}px)`
                    : `translateY(0px)`,
                  zIndex: themes.length - index,
                  transitionDelay: isThemePickerOpen
                    ? `${index * 30}ms`
                    : `${(themes.length - index) * 30}ms`,
                }}
              >
                <RiCheckboxBlankCircleFill />
              </span>
            </button>
          ))}
      </div>

      {/* Theme Color Button */}
      <div
        className="relative flex items-center justify-center"
        onMouseEnter={() => handleOnMouseEnter?.("Change Themes")}
        onMouseLeave={() => handleOnMouseLeave?.()}
      >
        <button
          onClick={handleToggleClick}
          className="rounded-full transition-all duration-500 ease-out cursor-pointer hover:scale-110 active:scale-90"
        >
          <span className={`block transition-colors duration-500 text-xl ${className}`}>
            <RiPaletteFill />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ThemeToggler;

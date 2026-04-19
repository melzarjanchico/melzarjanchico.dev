import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

interface ModeTogglerProps {
  themeMode: string;
  toggleMode: () => void;
  setCaption?: (caption: string) => void;
  handleOnMouseEnter?: (modeLabel: string) => void;
  handleOnMouseLeave?: () => void;
  className?: string;
}

const ModeToggler = ({ 
  themeMode, 
  toggleMode, 
  handleOnMouseEnter, 
  handleOnMouseLeave, 
  setCaption,
  className = "text-theme-main filter-[drop-shadow(0_0_1px_var(--color-zinc-900))]"
}: ModeTogglerProps) => {
  return (
    <div
      className="flex items-end"
      onMouseEnter={() => handleOnMouseEnter?.(`${(themeMode === "light") ? "Dark" : "Light"} Mode`)}
      onMouseLeave={handleOnMouseLeave}
    >
      <button
        onClick={() => {
          toggleMode();
          setCaption?.((themeMode === "light") ? "Light Mode" : "Dark Mode");
        }}
        className="rounded-full transition-all duration-500 ease-out cursor-pointer hover:scale-110 active:scale-90"
      >
        <span className={`block transition-all duration-500 text-xl ${className}`}>
          {themeMode === "light" ? <RiMoonClearFill /> : <RiSunFill />}
        </span>
      </button>
    </div>
  );
};

export default ModeToggler; 
import { useState } from 'react';
import './App.css'
import ClickSpark from './components/ClickSpark'
import BackgroundGrainient from './components/personal/BackgroundGrainient'
import Home from './sections/Home'
import { getTheme, type ThemeItem } from './data/themes';
import { usePerformanceCheck } from './hooks/usePeformanceCheck';
import { useIsLowEndDevice } from './hooks/useIsLowEndDevice';

function App() {
  const [isVisible, setIsVisible] = useState(true);

  const [themeMode, setThemeMode] = useState(() => {
    const storedMode = localStorage.getItem("mode") || "light"
    return storedMode;
  })

  const [themeColor, setThemeColor] = useState<ThemeItem>(() => {
    const storedTheme = localStorage.getItem("theme") || "sweetener"
    return getTheme(storedTheme);
  }); 

  const toggleMode = () => {
    const mode = (themeMode === "light") ? "dark" : "light";

    setThemeMode(mode);
    localStorage.setItem("mode", mode);
  }

  const toggleTheme = (color: ThemeItem) => {
    setThemeColor(color);
    localStorage.setItem("theme", color.name);
  }

  const isLowEndDevice = useIsLowEndDevice();
  const isSlow = usePerformanceCheck();

  return (
    <>
      <ClickSpark
        sparkColor={themeColor.secondaryColor}
        sparkSize={5}
        sparkRadius={10}
        sparkCount={6}
        duration={200}
      >
        <div
          className="relative h-dvh overflow-hidden"
          style={{
            '--color-theme-primary': themeColor.primaryColor,
            '--color-theme-primary-variant': themeColor.primaryColorVariant,
            '--color-theme-secondary': themeColor.secondaryColor,
          } as React.CSSProperties}
        >
          {/* Conditional Rendering based on hardware */}
          {isLowEndDevice || isSlow ? (
             <div style={{ 
                backgroundColor: themeColor.bgColor1,
                transition: 'background-color 0.5s ease, --color-theme-primary 0.5s ease, --color-theme-primary-variant 0.5s ease, --color-theme-secondary 0.5s ease',
            }} className="absolute inset-0" />
          ) : (
             <BackgroundGrainient theme={themeColor}/>
          )}

          {/* Content area */}
          <div className="relative h-dvh flex flex-row items-start justify-start transition-all duration-700">
            
            {/* Home Section */}
            <Home 
              isVisible={isVisible} 
              setIsVisible={setIsVisible} 
              themeColor={themeColor} 
              setThemeColor={toggleTheme}
              themeMode={themeMode}
              toggleMode={toggleMode}
            />

          </div>
        </div>
      </ClickSpark>
    </>
  )
}

export default App

import { useEffect, useState } from 'react';
import './App.css'
import ClickSpark from './components/ClickSpark'
import BackgroundGrainient from './components/personal/BackgroundGrainient'
import Home from './sections/Home'
import { getTheme, type ThemeItem } from './data/themes';
import { usePerformanceCheck } from './hooks/usePeformanceCheck';
import { useIsLowEndDevice } from './hooks/useIsLowEndDevice';
import { Button } from './components/ui/button';

function App() {
  const [showContent, setShowContent] = useState(false);

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

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

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
          className="relative h-dvh overflow-hidden bg-white dark:bg-zinc-900"
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
                filter: themeMode === 'dark' ? 'brightness(0.2)' : 'brightness(1)',
                transition: 'background-color 0.5s ease, filter 0.5s ease, --color-theme-primary 0.5s ease, --color-theme-primary-variant 0.5s ease, --color-theme-secondary 0.5s ease',
            }} className="absolute inset-0" />
          ) : (
             <BackgroundGrainient theme={themeColor} mode={themeMode}/>
          )}

          {/* Content area */}
          <div className="relative h-dvh flex flex-row items-start justify-start transition-all duration-500">
            
            {/* Home Section */}
            <Home
              className={`h-dvh flex items-center justify-center transition-all duration-700 ease-in-out will-change-[flex,width]
                ${showContent ? 'flex-[0.0001] opacity-0 pointer-events-none lg:flex-[0.3] lg:opacity-100 lg:pointer-events-auto' : 'flex-1 opacity-100'}
              `}
              isVisible={!showContent} 
              setIsVisible={setShowContent} 
              themeColor={themeColor} 
              setThemeColor={toggleTheme}
              themeMode={themeMode}
              toggleMode={toggleMode}
            />

            {/* Side Content */}
            <div className={`@container h-dvh flex items-center justify-center transition-all duration-700 ease-in-out 
              ${showContent ? 'flex-1 lg:flex-[0.7] opacity-100 visible' : 'flex-[0.0001] opacity-0 invisible pointer-events-none'}
            `}>

              <Button 
                  onClick={() => setShowContent(!showContent)} 
                  variant="outline"
                  className="mt-4 hover:border-theme-primary-variant dark:hover:border-theme-primary/50 hover:bg-theme-primary/20 shrink-0 transition-colors duration-500"
              >
                  <span className="truncate">{!showContent ? "More About Me" : "Back to Home"}</span>
              </Button>
              
            </div>

          </div>
        </div>
      </ClickSpark>
    </>
  )
}

export default App

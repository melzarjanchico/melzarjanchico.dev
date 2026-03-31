import { useState } from 'react';
import './App.css'
import ClickSpark from './components/ClickSpark'
import BackgroundGrainient from './components/personal/BackgroundGrainient'
import Home from './sections/Home'
import { initialTheme, type ThemeItem } from './data/themes';

function App() {
  const [isVisible, setIsVisible] = useState(true);
  // Default theme color
  const [themeColor, setThemeColor] = useState<ThemeItem>(initialTheme); 

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
          className="relative bg-white h-dvh overflow-hidden"
          style={{
            '--color-theme-primary': themeColor.primaryColor,
            '--color-theme-primary-variant': themeColor.primaryColorVariant,
            '--color-theme-secondary': themeColor.secondaryColor,
          } as React.CSSProperties}
        >
          {/* Grainient background */}
          <BackgroundGrainient theme={themeColor}/>

          {/* Content area */}
          <div className="relative h-dvh flex flex-row items-start justify-start transition-all duration-700">
            
            {/* Home Section */}
            <Home 
              isVisible={isVisible} 
              setIsVisible={setIsVisible} 
              themeColor={themeColor} 
              setThemeColor={setThemeColor}
            />

          </div>
        </div>
      </ClickSpark>
    </>
  )
}

export default App

import { useRef, useState } from 'react';
import './App.css'
import ClickSpark from './components/ClickSpark'
import BackgroundGrainient from './components/personal/BackgroundGrainient'
import Home from './sections/Home'
import History from './sections/History'
import { commonBgProperties, commonButtonProperties, getTheme, scrollbarProperties } from './data/themes';
import { usePerformanceCheck } from './hooks/usePeformanceCheck';
import { useIsLowEndDevice } from './hooks/useIsLowEndDevice';
import { Button } from './components/ui/button';
import { MY_EDUCATION, MY_EMPLOYMENT } from './data/experience';
import { RiArrowUpLine, RiHome9Fill } from 'react-icons/ri';
// import useIsMobile from './hooks/useIsMobile';
import type { ThemeItem } from './data/models';
import { useNavigate } from 'react-router-dom';
import Footer from './sections/Footer';

function App() {
  // App States
  const [showContent, setShowContent] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Site Performance Hooks
  const isLowEndDevice = useIsLowEndDevice();
  const isSlow = usePerformanceCheck();
  // const isMobile = useIsMobile();

  // Light/Dark Mode States and Handlers
  const handleModeSwitch = (themeMode: string) => {
    const root = window.document.documentElement;
    
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  const [themeMode, setThemeMode] = useState(() => {
    const storedMode = localStorage.getItem("mode") || "light"
    handleModeSwitch(storedMode);
    return storedMode;
  })

  const toggleMode = () => {
    const mode = (themeMode === "light") ? "dark" : "light";
    handleModeSwitch(mode);
    setThemeMode(mode);
    localStorage.setItem("mode", mode);
  }

  // Color Themes States and Handlers
  const [themeColor, setThemeColor] = useState<ThemeItem>(() => {
    const storedTheme = localStorage.getItem("theme") || "sweetener"

    return getTheme(storedTheme);
  }); 

  const toggleTheme = (color: ThemeItem) => {
    setThemeColor(color);
    localStorage.setItem("theme", color.name);
  }

  // Scroll-related Code
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const position = e.currentTarget.scrollTop;
  
    // Update state only when crossing the 300px threshold
    if (position > 100 && !showScrollToTop) {
      setShowScrollToTop(true);
    } else if (position <= 100 && showScrollToTop) {
      setShowScrollToTop(false);
    }
  };

  // Hooks
  const navigate = useNavigate();

  return (
    <>
      <ClickSpark
        sparkColor={themeColor.primaryDark}
        sparkSize={5}
        sparkRadius={10}
        sparkCount={6}
        duration={200}
      >
        <div
          className="relative h-dvh overflow-hidden bg-theme-bg dark:bg-zinc-900"
          style={{
            '--color-theme-main': themeColor.mainColor,
            '--color-theme-primary': themeColor.primary,
            '--color-theme-primary-light': themeColor.primaryLight,
            '--color-theme-primary-dark': themeColor.primaryDark,
            '--color-theme-bg': themeColor.bgColor1,
          } as React.CSSProperties}
        >
          {/* Conditional rendering of gradient background if device is lowend, slowing down, or mobile*/}
          {isLowEndDevice || isSlow ? (
             <div style={commonBgProperties(themeMode)} className="absolute inset-0" />
          ) : (
             <BackgroundGrainient theme={themeColor} mode={themeMode}/>
          )}

          {/* Content area */}
          <div className="relative h-dvh flex flex-row items-start justify-start overflow-hidden">
            
            {/* Home Section */}
            <Home
              className={`h-dvh flex items-center justify-center transition-all ease-in-out z-999 will-change-[flex,width]
                ${/* Mobile */
                  showContent ? 'hidden' : 'flex w-full'
                } 
                ${/* Desktop */
                  showContent 
                    ? 'lg:flex lg:flex-[30%] lg:max-w-[30%] lg:opacity-100' 
                    : 'lg:flex lg:flex-[100%] lg:max-w-full lg:opacity-100'
                }
                duration-0 lg:duration-700 
              `}
              isVisible={!showContent} 
              setIsVisible={setShowContent} 
              themeColor={themeColor} 
              setThemeColor={toggleTheme}
              themeMode={themeMode}
              toggleMode={toggleMode}
            />

            {/* Content Section */}
            <div className={`h-dvh transition-all ease-in-out will-change-[flex,width]
              ${/* Mobile */
                showContent ? 'flex w-full' : 'hidden'
              }
              ${/* Desktop */
                showContent 
                  ? 'lg:flex lg:flex-[70%] lg:max-w-[70%] lg:opacity-100 lg:visible' 
                  : 'lg:flex lg:flex-[0%] lg:max-w-[0%] lg:opacity-0 lg:invisible lg:pointer-events-none'
              }
              duration-0 lg:duration-700
            `}>
              <div ref={scrollRef} onScroll={handleScroll} className={`w-full h-full overflow-y-auto overflow-x-hidden p-6 lg:p-10 ${scrollbarProperties()}`}>

                {/* Persistent Scroll-to-Top Button */}
                <Button 
                  onClick={() => {
                    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' }); 
                  }}
                  variant="secondary"
                  className={`
                    fixed bottom-6 right-7 sm:bottom-6 sm:right-8 lg:bottom-9 lg:right-11 z-999 rounded-full shadow-lg p-3 transition-all duration-300 ease-in-out 
                    border border-theme-primary-dark text-theme-primary-dark dark:border-theme-main dark:text-theme-main
                    ${showScrollToTop 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 translate-y-4 pointer-events-none'
                    }
                    hover:scale-110 active:scale-95
                  `}
                >
                  <span><RiArrowUpLine/></span>
                </Button>

                {/* Redirection Buttons */}
                <Button 
                    onClick={() => {
                      setShowContent(!showContent)
                      navigate('/');;
                    }} 
                    variant="outline"
                    className={`mb-6 ${commonButtonProperties()}`}
                >
                    <span><RiHome9Fill/></span>
                </Button>

                {/* Pages */}
                <div className='w-full flex justify-center'>

                  {/* History */}
                  <History history={[
                    ...MY_EMPLOYMENT.map(job => ({ ...job, itemType: "work" })),
                    ...MY_EDUCATION.map(school => ({ ...school, itemType: "school" }))
                  ]}/>

                </div>

                {/* Footer */}
                <div>
                  <Footer/>
                </div>

              </div>
            </div>

          </div>          
        </div>
      </ClickSpark>
    </>
  )
}

export default App

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css'
import ClickSpark from './components/ClickSpark'
import BackgroundGrainient from './sections/section-components/BackgroundGrainient'
import Home from './sections/Home'
import History from './sections/History'
import { commonBgProperties, getTheme, scrollbarProperties } from './data/themes';
import { usePerformanceCheck } from './hooks/usePeformanceCheck';
import { useIsLowEndDevice } from './hooks/useIsLowEndDevice';
import { MY_EDUCATION as educationList, MY_EMPLOYMENT as employmentList } from './data/experience';
import { MY_PROJECTS as projectList } from './data/projects';
import type { ThemeItem } from './data/models';
import { useLocation, useNavigate } from 'react-router-dom';
import { VALID_PATHS as paths, SECTIONS as sections } from './data/links';
import Footer from './sections/Footer';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import Projects from './sections/Projects';
import Navbar from './sections/Navbar';
import ScrollToTopButton from './sections/section-components/ScrollToTopButton';
import UnderConstruction from './sections/section-components/UnderConstruction';

function App() {
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();

  // App States
  // Derived state to ensure layout syncs with URL immediately
  const showContent = paths.includes(location.pathname) && location.pathname !== '/';

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Site Performance Hooks
  const isLowEndDevice = useIsLowEndDevice();
  const isSlow = usePerformanceCheck();

  // Light/Dark Mode States and Handlers
  const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("mode") || "light"
  })

  const toggleMode = () => {
    const mode = (themeMode === "light") ? "dark" : "light";
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

  // Use LayoutEffect to handle color themes and modes
  useLayoutEffect(() => {
    const root = window.document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.style.setProperty('--color-theme-main', themeColor.mainColor);
    root.style.setProperty('--color-theme-primary', themeColor.primary);
    root.style.setProperty('--color-theme-primary-light', themeColor.primaryLight);
    root.style.setProperty('--color-theme-primary-dark', themeColor.primaryDark);
    root.style.setProperty('--color-theme-bg', themeColor.bgColor1);
  }, [themeMode, themeColor]);

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

  // Path Checks
  const [page, setPage] = useState(() => {
    // Initialize with current path if valid, otherwise fallback to storage
    return (paths.includes(location.pathname) && location.pathname !== '/') 
      ? location.pathname 
      : localStorage.getItem("page") || '/about';
  });

  // Adjusting state during render (Official React Pattern)
  // This avoids useEffect cascading renders AND useRef access-during-render errors.
  if (paths.includes(location.pathname) && location.pathname !== '/' && page !== location.pathname) {
    setPage(location.pathname);
    localStorage.setItem("page", location.pathname);
  }

  // Effect handles ONLY the external system sync (Toasts)
  useEffect(() => {
    const isInvalid = !paths.includes(location.pathname);
    
    if (isInvalid) {
      toast.error(`404: Invalid URL`, {
        id: "invalid-path-error",
        position: "top-right",
        description: (
          <span className="text-black dark:text-white text-xs leading-none">
            <code className="text-red-500 font-bold">{location.pathname}</code> is not a valid subpage.
          </span>
        ),
      });
    }
  }, [location.pathname]);

  const togglePage = (pagePath: string) => {
    navigate(pagePath);
  }

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
              setIsVisible={() => navigate('/')} 
              themeColor={themeColor} 
              setThemeColor={toggleTheme}
              themeMode={themeMode}
              toggleMode={toggleMode}
              togglePage={togglePage}
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
              <div ref={scrollRef} onScroll={handleScroll} className={`w-full overflow-y-auto p-6 lg:p-10 ${scrollbarProperties()}`}>

                {/* Navbar */}
                <Navbar sections={sections} togglePage={togglePage} themeMode={themeMode} toggleMode={toggleMode} themeColor={themeColor} setThemeColor={toggleTheme}/>

                {/* Pages */}
                <div className='w-full flex justify-center'>

                  {/* History */}
                  {page === '/history' &&
                    <History history={[
                      ...employmentList.map(job => ({ ...job, itemType: "work" })),
                      ...educationList.map(school => ({ ...school, itemType: "school" }))
                    ]}/>
                  }

                  {/* Project */}
                  {page === '/projects' &&
                    <Projects projects={projectList}/>
                  }

                  {['/about', '/skills', '/stats'].includes(page) &&
                    <UnderConstruction pageName={page}/>
                  }

                </div>

                {/* Persistent Scroll-to-Top Button */}
                <ScrollToTopButton scrollRef={scrollRef} isVisible={showScrollToTop}/>

                {/* Footer */}
                <Footer/>
                
              </div>
            </div> 

          </div>          
        </div>
      </ClickSpark>
      <Toaster />
    </>
  )
}

export default App

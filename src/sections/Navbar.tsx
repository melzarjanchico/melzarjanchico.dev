import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { SectionItem, ThemeItem } from "@/data/models";
import { useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RiMenu3Line } from "react-icons/ri"; // Example icons
import ModeToggler from "./section-components/ModeToggler";
import ThemeToggler from "./section-components/ThemeToggler";

interface NavbarProps {
  sections: SectionItem[];
  togglePage: (link: string) => void;
  themeMode: string;
  toggleMode: () => void;
  themeColor: ThemeItem;
  setThemeColor: (theme: ThemeItem) => void;
}

const Navbar = ({ sections, togglePage, themeMode, toggleMode, themeColor, setThemeColor }: NavbarProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavButtons = (isMobile: boolean) => {
    const visibleSections = isMobile 
      ? sections 
      : sections.filter(section => section.link !== "/");

    return (
      <>
        {visibleSections.map((section) => {
          const isActive = location.pathname === section.link;

          return (
            <button
              key={section.link}
              onClick={() => {
                togglePage(section.link);
                if (isMobile) setIsOpen(false);
              }}
              aria-current={isActive ? "page" : undefined}
              title={section.name}
              className={`transition-all duration-500 flex items-center font-bold group relative outline-none cursor-pointer ${
                isMobile 
                  ? "w-full rounded-xl flex-col justify-center text-center"
                  : "p-2 rounded-md gap-3"
              } ${
                isActive
                  ? "text-theme-primary-dark dark:text-theme-primary-light filter-[drop-shadow(0_0_10px_var(--color-theme-primary-dark))]"
                  : "text-zinc-700 dark:text-zinc-400 hover:text-theme-primary-dark dark:hover:text-theme-primary-light"
              }`}
            >
              <span className={`text-xl transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                {section.icon}
              </span>
              
              <span className="relative py-0.5 text-[10px] lg:text-xs tracking-widest uppercase whitespace-nowrap">
                {section.name}
                <span 
                  className={`absolute left-0 bottom-0 h-0.5 bg-theme-primary-dark dark:bg-theme-primary-light transition-all duration-500 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </span>
            </button>
          );
        })}
      </>
    );
  };

  return (
    <div className="mb-10">
      {/* --- DESKTOP VIEW --- */}
      <nav className="hidden lg:flex flex-wrap items-center gap-3" aria-label="Main Navigation">
        {NavButtons(false)}
      </nav>

      {/* --- MOBILE VIEW --- */}
      <div className="lg:hidden fixed right-7 z-999">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button 
              size="icon" 
              variant="ghost" 
              className="transition-all duration-500 ease-in-out hover:scale-110 active:scale-95 rounded-full h-12 w-12 shadow-xl border border-theme-primary-dark bg-zinc-50 dark:bg-zinc-800"
            >
              <RiMenu3Line size={24} className="text-theme-primary-dark" />
            </Button>
          </SheetTrigger>
          
          <SheetContent 
            side="top" 
            className="gap-0 bg-zinc-50 dark:bg-zinc-900 p-10 z-1000 border-b-2 border-theme-main"
          >
            <div className="flex w-full"> 
              
              <div className="w-[40%] flex flex-col justify-between gap-3 pr-2">
                <div className="flex flex-col gap-1.5">
                  <div className="text-xl font-black uppercase leading-none tracking-wide text-zinc-800 dark:text-zinc-100">
                    Melzar Jan Chico
                  </div>
                  <div className="text-xs uppercase tracking-wider text-zinc-500">
                    Software Engineer
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <ModeToggler
                    themeMode={themeMode}
                    toggleMode={toggleMode}
                    className="rounded-full p-1.5 text-sm border border-theme-primary-dark dark:border-theme-primary-light text-theme-primary-dark dark:text-theme-primary-light filter-[drop-shadow(0_0_10px_var(--color-theme-primary-dark))]"
                  />
                  <ThemeToggler
                    themeColor={themeColor}
                    setThemeColor={setThemeColor}
                    cycleMode={true}
                    className="rounded-full p-1.5 text-sm border border-theme-primary-dark dark:border-theme-primary-light text-theme-primary-dark dark:text-theme-primary-light filter-[drop-shadow(0_0_10px_var(--color-theme-primary-dark))]"
                  />
                </div>
              </div>

              <div className="w-[60%] grid grid-cols-2 gap-y-6">
                {NavButtons(true)}
              </div>

            </div>
          </SheetContent>

        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;

import type { ThemeItem } from "./models";

export const THEMES_LIST: ThemeItem[] = [
  {
    name: "sweetener",
    bgColor1: "#FDFCE8",
    bgColor2: "#E2CEB1",
    bgColor3: "#C7A07A",
    mainColor: "#fdba74", // orange-300
    primary: "#fed7aa", // orange-200
    primaryLight: "#ffedd5", // orange-100
    primaryDark: "#f97316", // orange-500
    secondary: "",
    secondaryLight: "",
    secondaryDark: "",
  },
  {
    name: "happier",
    bgColor1: "#A8A4D8",
    bgColor2: "#AAA9D1",
    bgColor3: "#8379B3",
    mainColor: "#c4b5fd", // violet-300
    primary: "#ddd6fe", // violet-200
    primaryLight: "#ede9fe", // violet-100
    primaryDark: "#8b5cf6", // violet-500
    secondary: "",
    secondaryLight: "",
    secondaryDark: "",
  },
  {
    name: "afterglow",
    bgColor1: "#fdc0cc",
    bgColor2: "#d5b9e4",
    bgColor3: "#7dbedf",
    mainColor: "#f9a8d4", // pink-300
    primary: "#fbcfe8", // pink-200
    primaryLight: "#fce7f3", // pink-100
    primaryDark: "#ec4899", // pink-500
    secondary: "",
    secondaryLight: "",
    secondaryDark: "",
  },
  {
    name: "wildflower",
    bgColor1: "#E2E8F0",
    bgColor2: "#B2C1D3",
    bgColor3: "#8BA1B4",
    mainColor: "#93c5fd", // blue-300
    primary: "#bfdbfe", // blue-200
    primaryLight: "#dbeafe", // blue-100
    primaryDark: "#3b82f6", // blue-500
    secondary: "",
    secondaryLight: "",
    secondaryDark: "",
  },
  {
    name: "stateside",
    bgColor1: "#F9EAEA",
    bgColor2: "#D9AFAF",
    bgColor3: "#B08282",
    mainColor: "#fca5a5", // red-300
    primary: "#fecaca",// red-200
    primaryLight: "#fee2e2", // red-100
    primaryDark: "#ef4444", // red-500
    secondary: "",
    secondaryLight: "",
    secondaryDark: "",
  }
];

export const getTheme = (name: string): ThemeItem => {
  return THEMES_LIST.find((theme) => theme.name === name) || THEMES_LIST[0];
}

// Common Styles
export const commonBgProperties = (themeMode: string): React.CSSProperties => {
  return { 
      backgroundColor: 'var(--color-theme-bg)',
      filter: themeMode === 'dark' ? 'brightness(0.2)' : 'brightness(1)',
      transition: 'background-color 0.5s ease, filter 0.5s ease, --color-theme-primary 0.5s ease, --color-theme-primary-variant 0.5s ease, --color-theme-secondary 0.5s ease',
  }
}

export const commonButtonProperties = () => {
  return 'hover:border-theme-main dark:hover:border-theme-main/50 hover:bg-theme-primary-light/50 dark:hover:bg-theme-primary-light/10 shrink-0 transition-colors duration-500';
}

export const commonFilterButtonProperties = () => {
  return 'hover:border-theme-primary-dark/70 dark:hover:border-theme-main/70 hover:bg-theme-primary-light dark:hover:bg-theme-primary-light/10 shrink-0 transition-colors duration-500';
}

export const scrollbarProperties = () => {
  return '[&::-webkit-scrollbar]:w-1 sm:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-theme-primary-dark [&::-webkit-scrollbar-track]:bg-theme-primary dark:[&::-webkit-scrollbar-track]:bg-zinc-900 transition-all duration-500';
}
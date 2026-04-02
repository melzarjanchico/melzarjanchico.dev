export type ThemeItem = {
  name: string;
  bgColor1: string;
  bgColor2: string;
  bgColor3: string;
  primaryColor: string;
  primaryColorVariant: string;
  secondaryColor: string;
};

const sweetener: ThemeItem = {
  name: "sweetener",
  bgColor1: "#FDFCE8",
  bgColor2: "#E2CEB1",
  bgColor3: "#C7A07A",
  primaryColor: "#FFD6A7",
  primaryColorVariant: "#FFB86A",
  secondaryColor: "#C7A07A"
};

const sour: ThemeItem = {
  name: "happier",
  bgColor1: "#837ec2",
  bgColor2: "#8584b9",
  bgColor3: "#5f558d",
  primaryColor: "#DDD6FF",
  primaryColorVariant: "#C4B4FF",
  secondaryColor: "#8E51FF"
};

const lover: ThemeItem = {
  name: "afterglow",
  bgColor1: "#fdc0cc",
  bgColor2: "#d5b9e4",
  bgColor3: "#7dbedf",
  primaryColor: "#fccee8",
  primaryColorVariant: "#fda5d5",
  secondaryColor: "#7dbedf"
};

const hitMeHardAndSoft: ThemeItem = {
  name: "wildflower",
  bgColor1: "#CBD5E1",
  bgColor2: "#94A3B8",
  bgColor3: "#64748B",
  primaryColor: "#E0F2FE",
  primaryColorVariant: "#B9D6F2",
  secondaryColor: "#1E3A8A"
};

const fancyThat: ThemeItem = {
  name: "stateside",
  bgColor1: "#E2B6B6",
  bgColor2: "#A36B6B",
  bgColor3: "#704141",
  primaryColor: "#FEE2E2", 
  primaryColorVariant: "#FECACA", 
  secondaryColor: "#EF4444" 
};

export const THEMES_LIST: ThemeItem[] = [sweetener, lover, sour, hitMeHardAndSoft, fancyThat];

export const getTheme = (name: string): ThemeItem => {
  return THEMES_LIST.find((theme) => theme.name === name) || THEMES_LIST[0];
}

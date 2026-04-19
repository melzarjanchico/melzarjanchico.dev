// Theme Models
export type ThemeItem = {
    name: string;
    bgColor1: string;
    bgColor2: string;
    bgColor3: string;
    mainColor: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    secondary?: string;
    secondaryLight?: string;
    secondaryDark?: string;
};

export type SectionItem = {
    link: string;
    icon: React.ReactNode,
    name: string;
}

// Component Models
export interface HistoryItem {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description: React.ReactNode[];
    skills: string[];
    location: string;
    image: string;
    itemType?: string;
}

export interface EmploymentHistoryItem extends HistoryItem {
    position: string;
    type: string;
    setup: string;
}

export interface EducationHistoryItem extends HistoryItem {
    degree: string;
    major?: string;
}

// Project Item
export interface ProjectItem {
    id: string;
    name: string;
    description: React.ReactNode;
    date: Date;
    skills: string[];
    image?: string;
    links: {
        icon: React.ReactNode,
        link: string,
    }[];
    status: string;
}

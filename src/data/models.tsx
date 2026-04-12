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
    major: string;
}

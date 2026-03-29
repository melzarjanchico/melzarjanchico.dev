// Component Models
export interface HistoryItem {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string[];
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

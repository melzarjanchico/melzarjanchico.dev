export const historyTypeList: Record<"all" | "work" | "school", string> = {
    all: "All",
    work: "Experience",
    school:  "Education"
} as const;

export const historyTypes = Object.keys(historyTypeList) as Array<keyof typeof historyTypeList>;
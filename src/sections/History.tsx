import type { EducationHistoryItem, EmploymentHistoryItem, HistoryItem } from "@/data/models";
import { useState } from "react";
import { historyTypeList, historyTypes } from "@/data/maps";
import { commonFilterButtonProperties } from "@/data/themes";
import { Button } from "@/components/ui/button";
import TimelineCard from "./section-components/TimelineCard";
import SectionHeader from "./section-components/SectionHeader";

interface HistoryProps {
  history: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  const [filter, setFilter] = useState<"all" | "work" | "school">("all");

  const sortedHistory = [...history]
    .filter((item) => {
      const isValidType = item.itemType === "work" || item.itemType === "school";
      if (!isValidType) return false;
      if (filter === "all") return true;
      return item.itemType === filter;
    })
    .sort((a, b) => {
      const dateA = a.itemType === "work" ? a.startDate : a.endDate;
      const dateB = b.itemType === "work" ? b.startDate : b.endDate;
      return (dateB?.getTime() ?? 0) - (dateA?.getTime() ?? 0);
    });

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const getDateRange = (start: Date, end: Date | null, itemType?: string): string => {
    const now = new Date();
    const startStr = formatDate(start);
    const endStr = formatDate(end);
    const isPresent = !end || (
      end.getMonth() === now.getMonth() && 
      end.getFullYear() === now.getFullYear()
    );

    if (isPresent) return `${startStr} — Present`;
    if (startStr === endStr) return startStr;
    if (itemType && itemType === "school" && filter === 'all') return endStr;

    return `${startStr} — ${endStr}`;
  };

  return (
    <div className="w-full flex flex-col max-w-6xl sm:max-w-[90%] gap-6 select-none relative">
      {/* Header */}
      <SectionHeader title="My History" subtitle="My professional and academic journey"/>

      {/* Filter */}
      <div className="flex flex-wrap justify-start sm:justify-center gap-2">
        {historyTypes.map((type) => (
          <Button
            key={type}
            variant="outline"
            onClick={() => {
              setFilter(type);
            }}
            className={`px-2.5 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all duration-500 cursor-pointer ${
              filter === type
                ? "bg-theme-primary hover:bg-theme-primary dark:bg-theme-primary-light/10 hover:dark:bg-theme-primary-light/10 border border-theme-primary-dark dark:border-theme-primary-dark"
                : `${commonFilterButtonProperties()}`
            }`}
          >
            {historyTypeList[type]}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="relative w-full mt-4">
        {sortedHistory.map((item, index) => {
          const historyItem = item;
          const dateRange = getDateRange(historyItem.startDate, historyItem.endDate, historyItem.itemType);
          const isPresent = dateRange.includes('Present');
          const isLastVisible = index === sortedHistory.length - 1;

          return (
            <div key={historyItem.id} className="mb-5 flex items-start w-full relative">
              
              {/* Vertical Line */}
              <div className={`absolute left-2 top-9 sm:top-9.5 transform -translate-x-1/2 w-px ${isLastVisible ? 'h-[calc(50%+1.5rem)] bg-linear-to-b from-theme-primary-dark to-transparent' : 'h-[calc(100%+12px)] bg-theme-primary-dark'}`}/>

              {/* Center Dot */}
              <div className="absolute left-2 top-6.5 sm:top-7 transform -translate-x-1/2 z-20 flex justify-center">
                {isPresent && <div className="absolute size-3 rounded-full bg-transparent shrink-0 border-2 border-theme-primary-dark animate-ping"/>}
                <div className="relative size-3 rounded-full bg-transparent shrink-0 border-2 border-theme-primary-dark"/>
              </div>

              {/* Timeline Card */}
              <div className="flex w-full justify-start pl-8">
                <div className="block w-full">
                  <TimelineCard 
                    item={"position" in item ? historyItem as EmploymentHistoryItem : historyItem as EducationHistoryItem} 
                    dateRange={dateRange} 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;

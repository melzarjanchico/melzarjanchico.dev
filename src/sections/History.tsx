import type { EducationHistoryItem, EmploymentHistoryItem, HistoryItem } from "@/data/models";
import { useState, useRef } from "react";
import { RiBriefcaseLine, RiGraduationCapLine } from 'react-icons/ri'
import { historyTypeList, historyTypes } from "@/data/maps";
import { Card } from "@/components/ui/card";
import { commonButtonProperties } from "@/data/themes";
import { Button } from "@/components/ui/button";
import { skills } from "@/data/skills";

interface HistoryProps {
  history: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  const [filter, setFilter] = useState<"all" | "work" | "school">("work");

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
    <div className="w-full flex flex-col max-w-5xl gap-6 select-none relative">
      {/* Header */}
      <div className="flex flex-col w-full pt-0 items-start sm:items-center gap-1">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight drop-shadow-[0_0_20px_var(--color-theme-primary)] dark:drop-shadow-[0_0_20px_var(--color-theme-primary-light)]">
          My History
        </h1>
        <h2 className="font-light text-base">
          My professional and academic journey
        </h2>
      </div>

      {/* Filter */}
      <div className="flex justify-start sm:justify-center gap-2">
        {historyTypes.map((type) => (
          <Button
            key={type}
            variant="outline"
            onClick={() => {
              setFilter(type);
            }}
            className={`px-2.5 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all duration-500 cursor-pointer ${
              filter === type
                ? "bg-theme-primary border border-theme-primary-dark dark:bg-theme-primary-light/10 dark:border-theme-primary-dark"
                : `${commonButtonProperties()}`
            }`}
          >
            {historyTypeList[type]}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="relative w-full">
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

const TimelineCard = ({ 
  item, 
  dateRange, 
}: { 
  item: EmploymentHistoryItem | EducationHistoryItem, 
  dateRange: string,
}) => {
  const descriptionRef = useRef<HTMLUListElement>(null);
  
  // const SKILL_LIMIT = 20;
  // const hiddenSkillsCount = (item.skills?.length || 0) - SKILL_LIMIT;

  const title = "position" in item ? item.position : `${item.degree}${item.major ? `, ${item.major}` : ''}`;

  return (
    <Card className="rounded-lg border shadow-md p-6 gap-2.5 w-full text-left hover:border-theme-primary-dark transition-all duration-300">

      <div className="flex justify-between items-center">
        {/* Date Range */}
        <div className="text-xs sm:text-sm font-semibold text-theme-primary-dark uppercase tracking-wider">
          {dateRange}
        </div>

        {/* Item Type Icon */}
        {item.itemType === "work" ?
          <RiBriefcaseLine className="text-gray-400"/> : <RiGraduationCapLine className="text-gray-400"/>
        }
      </div>

      <div className="flex items-center gap-2">
        {/* Company/School Image */}
        <img
          src={item.image}
          className="size-10 sm:size-12 rounded-full bg-gray-300 shrink-0 border border-gray-300 dark:border-zinc-700 transition-all duration-500"
        />
        
        <div className="flex flex-col max-w-full min-w-0">
          {/* Company/School Title */}
          <h3 className="font-bold text-zinc-900 dark:text-white text-sm leading-tight truncate sm:text-base" title={title}>
            {title}
          </h3>

          {/* Company/School Name */}
          <p className="text-xs text-zinc-400 truncate sm:text-sm" title={item.name}>
            {item.name}
          </p>
        </div>
      </div>
      
      {/* Description */}
      <div className="relative">
        <ul 
          ref={descriptionRef}
          className="space-y-2 overflow-hidden transition-[max-height] duration-500 ease-in-out"
        >
          {item.description.map((desc, i) => (
            <li key={i} className="text-xs sm:text-sm font-light leading-4.5-relative pl-3">
              <span className="absolute text-theme-primary-dark left-0">•</span>
              {desc}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Skills */}
      <div className="flex items-center gap-1 mt-2 pt-3 justify-start border-t border-theme-primary-dark">
        <div className="flex flex-wrap items-center gap-1">
          {item.skills
            ?.slice() // Create a shallow copy to avoid mutating the original array
            .sort((a, b) => {
              const labelA = skills[a]?.toLowerCase() || "";
              const labelB = skills[b]?.toLowerCase() || "";
              return labelA.localeCompare(labelB);
            })
            .map(skill => (
              <span key={skill} className="whitespace-nowrap px-1.5 py-0.5 text-theme-primary-dark rounded text-[9px] sm:text-[10px] border border-theme-primary-dark uppercase font-medium">
                {skills[skill]}
              </span>
            ))}
        </div>
      </div>

    </Card>
  );
};

export default History;

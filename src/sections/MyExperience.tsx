import { Card } from "@/components/ui/card";
import type { EducationHistoryItem, EmploymentHistoryItem, HistoryItem } from "@/data/models";
import { useState, useRef, useEffect } from "react";
import { Briefcase, GraduationCap } from 'lucide-react';
import { historyTypeList, historyTypes } from "@/data/maps";

interface HistoryProps {
  history: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);
  const [filter, setFilter] = useState<"all" | "work" | "school">("all");

  const INITIAL_DISPLAY_COUNT = 3;

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

  const visibleHistory = isTimelineExpanded 
    ? sortedHistory 
    : sortedHistory.slice(0, INITIAL_DISPLAY_COUNT);

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
    <Card className="mx-auto w-full max-w-md px-6 py-8 gap-5 lg:px-12 lg:max-w-4xl select-none relative">
      {/* Header */}
      <div className="flex flex-col w-full pt-0 items-start lg:items-center lg:pt-4 lg:gap-1">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          My History
        </h1>
        <h2 className="font-light text-sm lg:text-base">
          My professional and academic journey
        </h2>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-start lg:justify-center gap-2">
        {historyTypes.map((type) => (
          <button
            key={type}
            onClick={() => {
              setFilter(type);
              setIsTimelineExpanded(false);
            }}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border cursor-pointer ${
              filter === type
                ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                : "bg-white text-orange-400 border-orange-200 hover:border-orange-400"
            }`}
          >
            {historyTypeList[type]}
          </button>
        ))}
      </div>

      <div className="relative w-full mx-auto">
        {visibleHistory.map((item, index) => {
          const isEven = index % 2 === 0;
          const historyItem = item;
          const dateRange = getDateRange(historyItem.startDate, historyItem.endDate, historyItem.itemType);
          
          const isLastVisible = index === visibleHistory.length - 1;
          const hasMoreHidden = !isTimelineExpanded && sortedHistory.length > INITIAL_DISPLAY_COUNT;

          return (
            <div key={historyItem.id} className="mb-5 flex items-start w-full relative">
              
              {/* Vertical Line */}
              {(!isLastVisible || hasMoreHidden) && (
                <div 
                  className={`absolute left-2 lg:left-1/2 transform -translate-x-1/2 w-px top-4 ${
                    isLastVisible && hasMoreHidden 
                      ? "h-48 bg-gradient-to-b from-orange-300 to-transparent" 
                      : "h-[calc(100%+1.5rem)] bg-orange-300"
                  }`}
                />
              )}

              {/* Center Dot */}
              <div className="absolute left-2 lg:left-1/2 transform -translate-x-1/2 z-20 flex justify-center py-2.5">
                <div className="size-[10px] rounded-full border-2 border-orange-400 bg-white shrink-0"></div>
              </div>

              {/* Left Slot (Desktop Only) */}
              <div className="hidden lg:flex w-1/2 justify-end lg:pr-8"> 
                {!isEven && (
                  <TimelineCard 
                    item={"position" in item ? historyItem as EmploymentHistoryItem : historyItem as EducationHistoryItem}  
                    dateRange={dateRange} 
                    isExpanded={expandedId === historyItem.id}
                    onToggle={() => setExpandedId(expandedId === historyItem.id ? null : historyItem.id)}
                  />
                )}
              </div>

              {/* Right Slot */}
              <div className="flex w-full lg:w-1/2 justify-start pl-10 lg:pl-8">
                <div className={isEven ? "block w-full" : "lg:hidden block w-full"}>
                  <TimelineCard 
                    item={"position" in item ? historyItem as EmploymentHistoryItem : historyItem as EducationHistoryItem} 
                    dateRange={dateRange} 
                    isExpanded={expandedId === historyItem.id}
                    onToggle={() => setExpandedId(expandedId === historyItem.id ? null : historyItem.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* History Show More Button */}
      {sortedHistory.length > INITIAL_DISPLAY_COUNT && (
        <div className="flex justify-center">
          <button
            onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
            className="text-xs font-bold text-orange-600 uppercase tracking-widest hover:text-orange-700 transition-colors cursor-pointer"
          >
            {isTimelineExpanded ? "Show Less History ↑" : `Show Full History (${sortedHistory.length - INITIAL_DISPLAY_COUNT} more) ↓`}
          </button>
        </div>
      )}
    </Card>
  );
};

const TimelineCard = ({ 
  item, 
  dateRange, 
  isExpanded, 
  onToggle 
}: { 
  item: EmploymentHistoryItem | EducationHistoryItem, 
  dateRange: string,
  isExpanded: boolean,
  onToggle: () => void 
}) => {
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef<HTMLUListElement>(null);
  
  const SKILL_LIMIT = 4;
  const HEIGHT_THRESHOLD = 100; 
  const hiddenSkillsCount = (item.skills?.length || 0) - SKILL_LIMIT;

  const title = "position" in item ? item.position : `${item.degree}${item.major ? `, ${item.major}` : ''}`;

  useEffect(() => {
    const element = descriptionRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(() => {
      const hasOverflow = element.scrollHeight > HEIGHT_THRESHOLD;
      setShowButton(hasOverflow);
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [item.description]);

  return (
    <div className="bg-amber-50 rounded-lg border border-orange-200 shadow-md p-6 w-full text-left transition-all duration-300">

      <div className="flex justify-between items-center">
        {/* Date Range */}
        <div className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
          {dateRange}
        </div>

        {/* Item Type Icon */}
        {item.itemType === "work" ?
          <Briefcase className="h-5 text-gray-400"/> : <GraduationCap className="size-5 text-gray-400"/>
        }
      </div>

      <div className="flex items-center gap-2 mt-2 mb-3">
        {/* Company/School Image */}
        <img
          src={item.image}
          className="size-8 rounded-full bg-gray-300 shrink-0 border border-gray-300"
        />
        
        <div className="flex flex-col max-w-full min-w-0">
          {/* Company/School Title */}
          <h3 className="font-bold text-zinc-900 text-base leading-tight tracking-tight truncate" title={title}>
            {title}
          </h3>

          {/* Company/School Name */}
          <p className="text-xs text-zinc-400 font-medium truncate" title={item.name}>
            {item.name}
          </p>
        </div>
      </div>
      
      {/* Description */}
      <div className="relative">
        <ul 
          ref={descriptionRef}
          className="space-y-2 overflow-hidden transition-[max-height] duration-500 ease-in-out"
          style={{ 
            maxHeight: isExpanded ? `${descriptionRef.current?.scrollHeight}px` : `${HEIGHT_THRESHOLD}px` 
          }}
        >
          {item.description.map((desc, i) => (
            <li key={i} className="text-[11px] text-gray-600 leading-normal relative pl-3">
              <span className="absolute text-amber-500 left-0">•</span>
              {desc}
            </li>
          ))}
        </ul>

        {showButton && !isExpanded && (
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-amber-50 to-transparent pointer-events-none" />
        )}
      </div>

      {/* Description Show More Button */}
      {showButton && (
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
          className="mt-2 text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-tighter relative z-10 cursor-pointer"
        >
          {isExpanded ? "Show Less ↑" : "Show More ↓"}
        </button>
      )}
      
      {/* Skills */}
      <div className="flex items-center gap-1 mt-4 justify-start border-t border-orange-100 pt-3">
        <div className="flex flex-wrap items-center gap-1">
          {item.skills?.slice(0, SKILL_LIMIT).map(skill => (
            <span key={skill} className="whitespace-nowrap px-1.5 py-0.5 bg-white text-orange-300 rounded text-[9px] border border-orange-200 uppercase font-medium">
              {skill}
            </span>
          ))}
          {hiddenSkillsCount > 0 && (
            <span className="text-[10px] text-gray-400 font-bold ml-1 shrink-0">+{hiddenSkillsCount}</span>
          )}
        </div>
      </div>

    </div>
  );
};

export default History;
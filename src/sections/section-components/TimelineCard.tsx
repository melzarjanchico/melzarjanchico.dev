import { Card } from "@/components/ui/card";
import type { EducationHistoryItem, EmploymentHistoryItem } from "@/data/models";
import { skills } from "@/data/skills";
import { RiBriefcaseLine, RiGraduationCapLine } from "react-icons/ri";

const TimelineCard = ({ 
  item, 
  dateRange, 
}: { 
  item: EmploymentHistoryItem | EducationHistoryItem, 
  dateRange: string,
}) => {
  const title = "position" in item ? item.position : `${item.degree}${item.major ? `, ${item.major}` : ''}`;

  return (
    <Card className="rounded-lg border shadow-md p-6 gap-2.5 w-full text-left hover:border-theme-primary-dark transition-all duration-500">

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
          className="space-y-2 overflow-hidden transition-[max-height] duration-500 ease-in-out"
        >
          {item.description.map((desc, i) => (
            <li key={i} className="text-xs sm:text-sm font-light transition-colors leading-normal duration-500 pl-3">
              <span className="absolute text-theme-primary-dark left-0">•</span>
              {desc}
            </li>
          ))}
        </ul>
      </div>
      
      {/* Skills */}
      <div className="flex items-center gap-1 mt-3 pt-3 justify-start border-t border-zinc-300 dark:border-zinc-800 transition-colors duration-500">
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

export default TimelineCard;

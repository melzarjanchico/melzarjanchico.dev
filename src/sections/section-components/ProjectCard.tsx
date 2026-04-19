import { Card } from "@/components/ui/card";
import type { ProjectItem } from "@/data/models";
import { skills } from "@/data/skills";
import { FaCircle, FaCode } from "react-icons/fa";

const ProjectCard = ({ 
  item, 
  date, 
}: { 
  item: ProjectItem, 
  date: string,
}) => {
    const isCompleted = item.status === "completed" || item.status === "done";
    const statusColor = isCompleted ? "text-green-500" : "text-amber-500";
    const statusText = isCompleted ? "Completed" : "Pending";

    return (
    <Card className="group relative py-0 gap-0 flex flex-col sm:flex-row overflow-hidden rounded-lg border shadow-md w-full hover:border-theme-primary-dark transition-all duration-500">
      
        {/* Image & Links Container */}
        <div className={`
            relative w-full h-40 sm:h-auto sm:w-1/5 shrink-0 overflow-hidden
            mask-[linear-gradient(to_bottom,#000_70%,transparent_100%)]
            sm:mask-[linear-gradient(to_right,#000_70%,transparent_100%)]
        `}>
            {item.image ? (
                <img 
                    src={item.image} 
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-500"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <FaCode className="text-4xl text-theme-primary-dark dark:text-theme-primary transition-colors duration-500" />
                </div>
            )}

            {/* Overlay Links: Top-right on mobile, Bottom-right on sm+ */}
            <div className="absolute z-30 flex items-center gap-1 p-2 top-1 right-1 sm:top-auto sm:bottom-1 sm:left-1">
                {item.links?.map((linkItem, idx) => (
                    <a 
                        key={idx} 
                        href={linkItem.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 transition-all duration-500 shadow-sm hover:scale-110"
                    >
                        {linkItem.icon}
                    </a>
                ))}
            </div>
        </div>

      {/* Content Section */}
      <div className="relative z-20 flex flex-col flex-1 min-w-0 p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs sm:text-sm font-semibold text-theme-primary-dark uppercase tracking-wider">
            {date}
          </div>
          <span className="flex items-center text-[10px] font-medium uppercase text-zinc-500 border px-2 py-0.5 rounded-full transition-all duration-500">
            <FaCircle className={`${statusColor} text-[6px] mr-1.5`}/> 
            {statusText}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 mb-2">
          <h3 className="font-bold text-zinc-900 dark:text-white text-sm sm:text-base leading-tight transition-colors duration-500">
            {item.name}
          </h3>
        </div>
        
        <div className="mb-3">
          <p 
            className="text-xs sm:text-sm font-light leading-relaxed transition-colors duration-500"
            style={{ minHeight: '6.5em' }}
          >
            {item.description}
          </p>
        </div>
        
        <div className="pt-3 border-t border-zinc-300 dark:border-zinc-800 transition-colors duration-500">
            <div className="flex flex-wrap items-center gap-1">
            {item.skills
                ?.slice()
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
      </div>
    </Card>
  );
};

export default ProjectCard;

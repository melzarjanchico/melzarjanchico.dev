import type { ProjectItem } from "@/data/models";
import SectionHeader from "./section-components/SectionHeader";
import ProjectCard from "./section-components/ProjectCard";

interface ProjectProps {
  projects: ProjectItem[];
}

const Projects: React.FC<ProjectProps> = ({ projects }) => {

  const sortedProjects = [...projects]
    .sort((a, b) => {
      const dateA = a.date;
      const dateB = b.date;
      return (dateB?.getTime() ?? 0) - (dateA?.getTime() ?? 0);
    });

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="w-full flex flex-col max-w-6xl sm:max-w-[90%] gap-6 select-none relative">
      {/* Header */}
      <SectionHeader title="My Projects" subtitle="My collaborative and personal works"/>

      {/* Content */}
      <div className="relative w-full mt-4">
        {sortedProjects.map((item) => {
          const formattedDate = formatDate(item.date);

          return (
            <div key={item.id} className="mb-5 flex items-start w-full relative">
            
              {/* Project Card */}
              <div className="flex w-full justify-start">
                <div className="block w-full">
                  <ProjectCard 
                    item={item} 
                    date={formattedDate} 
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

export default Projects;

import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col w-full pt-0 items-start sm:items-center gap-1">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight drop-shadow-[0_0_20px_var(--color-theme-primary-dark)] dark:drop-shadow-[0_0_20px_var(--color-theme-primary-light)]">
        {title}
      </h1>
      <h2 className="font-light text-base">
        {subtitle}
      </h2>
    </div>
  );
};

export default SectionHeader;
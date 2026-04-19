import React from 'react';
import { LuCog } from 'react-icons/lu'; // Imported LuCog

interface UnderConstructionProps {
  pageName: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ pageName }) => {
  const displayName = pageName.replace('/', '').charAt(0).toUpperCase() + pageName.slice(2);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Replaced LuConstruction with LuCog and added animate-spin */}
      <LuCog 
        className="w-20 h-20 text-theme-primary-dark dark:text-theme-main mb-4 opacity-80 animate-spin" 
        style={{ animationDuration: '5s' }}
      />
      
      <h2 className="text-2xl font-semibold uppercase text-zinc-800 dark:text-zinc-100">
        {displayName}
      </h2>
      
      <p className="text-sm text-zinc-500 dark:text-zinc-400 tracking-wide uppercase">
        Under Construction
      </p>

      {/* Static minimalist divider using your theme color */}
      <div className="w-12 h-0.5 bg-theme-main mt-6 opacity-50" />
      
      <p className="mt-6 text-zinc-600 dark:text-zinc-500 max-w-xs text-sm">
        This section is currently being updated. 
        Please check back later.
      </p>
    </div>
  );
};

export default UnderConstruction;
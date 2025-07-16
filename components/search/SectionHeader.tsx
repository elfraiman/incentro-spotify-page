import React from 'react';

interface SectionHeaderProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  loading?: boolean;
}

export function SectionHeader({ title, count, icon, gradientFrom, gradientTo, loading }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <div className={`w-10 h-10 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} rounded-xl flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">{title}</h2>
          <p className="text-[var(--text-muted)] text-sm">
            {loading ? 'Loading...' : `${count} ${title.toLowerCase()} found`}
          </p>
        </div>
      </div>
      <div className={`hidden sm:block w-24 h-px bg-gradient-to-r from-${gradientFrom} to-transparent`}></div>
    </div>
  );
} 
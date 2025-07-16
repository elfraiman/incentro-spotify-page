export function LoadingSkeleton() {
  return (
    <div className="animate-pulse min-h-[600px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-[var(--surface-elevated)] backdrop-blur-xl rounded-2xl border border-[var(--border)] p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--primary-mars)] to-[var(--primary-starburst)] rounded-xl animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gradient-to-r from-[var(--primary-mars)] to-[var(--primary-starburst)] rounded-lg animate-pulse"></div>
                <div className="h-3 bg-gradient-to-r from-[var(--primary-mars)] to-[var(--primary-starburst)] rounded-lg animate-pulse w-3/4"></div>
                <div className="h-3 bg-gradient-to-r from-[var(--primary-mars)] to-[var(--primary-starburst)] rounded-lg animate-pulse w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
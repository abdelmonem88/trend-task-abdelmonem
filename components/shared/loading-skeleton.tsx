export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

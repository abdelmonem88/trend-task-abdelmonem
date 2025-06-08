interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progressPercentage = Math.round((current / total) * 100);

  return (
    <div className="px-6 pb-6">
      <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-center mt-3">
        <span className="text-sm text-gray-600">
          {current} من {total} تم الإجابة عليها
        </span>
      </div>
    </div>
  );
}

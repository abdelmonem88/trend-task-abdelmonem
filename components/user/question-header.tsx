interface QuestionHeaderProps {
  text: string;
  onEdit: () => void;
}

export function QuestionHeader({ text, onEdit }: QuestionHeaderProps) {
  return (
    <div className="px-6 pt-6 pb-4">
      <div className="cursor-pointer" onClick={onEdit}>
        <h2 className="text-lg font-medium text-gray-800 text-right leading-relaxed">
          {text}
        </h2>
      </div>
    </div>
  );
}

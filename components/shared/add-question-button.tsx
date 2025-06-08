import { Button } from "@/components/ui/button";
import { SVG } from "@/components/shared/SVG";

interface AddQuestionButtonProps {
  onClick: () => void;
}

export function AddQuestionButton({ onClick }: AddQuestionButtonProps) {
  return (
    <div className="flex justify-center pt-4">
      <Button
        onClick={onClick}
        variant="outline"
        className="border-primary-blue text-primary-blue hover:bg-primary-light px-6 py-3 h-12 rounded-full flex items-center gap-2"
      >
        <SVG name="plus" size={16} color="var(--primary-blue)" />
        إضافة سؤال آخر
      </Button>
    </div>
  );
}

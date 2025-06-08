import { MatrixQuestion } from "@/types/matrix";
import { UserMode } from "../user-mode";

interface QuestionListProps {
  questions: MatrixQuestion[];
  onEditQuestion: (index: number) => void;
}

export function QuestionList({ questions, onEditQuestion }: QuestionListProps) {
  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className="border border-gray-200 rounded-xl overflow-hidden relative"
        >
          <UserMode question={question} onEdit={() => onEditQuestion(index)} />
        </div>
      ))}
    </div>
  );
}

import { MatrixQuestion } from "@/types/matrix";
import { QuestionList } from "./question-list";
import { AddQuestionButton } from "../shared/add-question-button";

interface QuestionsPreviewProps {
  questions: MatrixQuestion[];
  onEditQuestion: (index: number) => void;
  onAddQuestion: () => void;
}

export function QuestionsPreview({
  questions,
  onEditQuestion,
  onAddQuestion,
}: QuestionsPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Show all questions */}
      <QuestionList questions={questions} onEditQuestion={onEditQuestion} />

      {/* Add Question button */}
      <AddQuestionButton onClick={onAddQuestion} />
    </div>
  );
}

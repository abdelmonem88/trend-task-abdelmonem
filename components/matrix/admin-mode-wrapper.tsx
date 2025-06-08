import { MatrixQuestion } from "@/types/matrix";
import { AdminMode } from "../admin-mode";

interface AdminModeWrapperProps {
  question: MatrixQuestion;
  updateQuestion: (question: MatrixQuestion) => void;
  onSave: () => void;
  onAddQuestion: () => void;
}

export function AdminModeWrapper({
  question,
  updateQuestion,
  onSave,
  onAddQuestion,
}: AdminModeWrapperProps) {
  return (
    <div className="space-y-6">
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <AdminMode
          question={question}
          updateQuestion={updateQuestion}
          onSave={onSave}
          onAddQuestion={onAddQuestion}
        />
      </div>
    </div>
  );
}

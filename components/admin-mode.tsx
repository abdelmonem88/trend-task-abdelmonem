"use client";

import { MatrixQuestion, MatrixRow, MatrixColumn } from "@/types/matrix";
import { QuestionInput } from "./admin/question-input";
import { MatrixEditor } from "./admin/matrix-editor";
import { QuestionSettings } from "./admin/question-settings";
import { toast } from "sonner";

interface AdminModeProps {
  question: MatrixQuestion;
  updateQuestion: (question: MatrixQuestion) => void;
  onSave: () => void;
  onAddQuestion?: () => void;
}

export function AdminMode({
  question,
  updateQuestion,
  onSave,
  onAddQuestion,
}: AdminModeProps) {
  const addRow = () => {
    const newRow: MatrixRow = {
      id: `row-${Date.now()}`,
      label: "",
    };
    updateQuestion({
      ...question,
      rows: [...question.rows, newRow],
    });
  };

  const addColumn = () => {
    const newColumn: MatrixColumn = {
      id: `col-${Date.now()}`,
      label: "",
    };
    updateQuestion({
      ...question,
      columns: [newColumn, ...question.columns],
    });
  };

  const removeRow = (rowId: string) => {
    if (question.rows.length > 1) {
      updateQuestion({
        ...question,
        rows: question.rows.filter((row) => row.id !== rowId),
      });
    } else {
      toast.error("لا يمكن حذف الصف الوحيد المتبقي");
    }
  };

  const removeColumn = (columnId: string) => {
    if (question.columns.length > 1) {
      updateQuestion({
        ...question,
        columns: question.columns.filter((col) => col.id !== columnId),
      });
    } else {
      toast.error("لا يمكن حذف العمود الوحيد المتبقي");
    }
  };

  const updateRowLabel = (rowId: string, label: string) => {
    updateQuestion({
      ...question,
      rows: question.rows.map((row) =>
        row.id === rowId ? { ...row, label } : row
      ),
    });
  };

  const updateColumnLabel = (columnId: string, label: string) => {
    updateQuestion({
      ...question,
      columns: question.columns.map((col) =>
        col.id === columnId ? { ...col, label } : col
      ),
    });
  };

  const handleQuestionTextChange = (text: string) => {
    updateQuestion({ ...question, text });
  };

  const handleQuestionUpdate = (updates: Partial<MatrixQuestion>) => {
    updateQuestion({ ...question, ...updates });
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="space-y-8">
        {/* Question Input Section */}
        <QuestionInput
          value={question.text}
          onChange={handleQuestionTextChange}
        />

        {/* Matrix Editor Section */}
        <MatrixEditor
          question={question}
          onUpdateRowLabel={updateRowLabel}
          onUpdateColumnLabel={updateColumnLabel}
          onAddRow={addRow}
          onAddColumn={addColumn}
          onRemoveRow={removeRow}
          onRemoveColumn={removeColumn}
        />

        {/* Question Settings Section */}
        <QuestionSettings
          question={question}
          onUpdateQuestion={handleQuestionUpdate}
          onSave={onSave}
          onAddQuestion={onAddQuestion}
        />
      </div>
    </div>
  );
}

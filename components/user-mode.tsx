"use client";

import { useState } from "react";
import { MatrixQuestion } from "@/types/matrix";
import { QuestionHeader } from "./user/question-header";
import { MatrixDisplay } from "./user/matrix-display";
import { ProgressBar } from "./user/progress-bar";

interface UserModeProps {
  question: MatrixQuestion;
  onEdit: () => void;
}

export function UserMode({ question, onEdit }: UserModeProps) {
  const [responses, setResponses] = useState<Record<string, string | string[]>>(
    {}
  );

  const handleSingleResponse = (rowId: string, columnId: string) => {
    setResponses((prev) => ({
      ...prev,
      [rowId]: columnId,
    }));
  };

  const handleMultipleResponse = (
    rowId: string,
    columnId: string,
    checked: boolean
  ) => {
    setResponses((prev) => {
      const currentResponses = (prev[rowId] as string[]) || [];
      const newResponses = checked
        ? [...currentResponses, columnId]
        : currentResponses.filter((id) => id !== columnId);

      return {
        ...prev,
        [rowId]: newResponses,
      };
    });
  };

  const getResponseCount = () => {
    return Object.keys(responses).filter((rowId) => {
      const response = responses[rowId];
      if (Array.isArray(response)) {
        return response.length > 0;
      }
      return response !== undefined && response !== "";
    }).length;
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      dir="rtl"
    >
      {/* Question Header */}
      <QuestionHeader text={question.text} onEdit={onEdit} />

      {/* Matrix Display */}
      <MatrixDisplay
        question={question}
        responses={responses}
        onSingleResponse={handleSingleResponse}
        onMultipleResponse={handleMultipleResponse}
      />

      {/* Progress Bar */}
      <ProgressBar current={getResponseCount()} total={question.rows.length} />
    </div>
  );
}

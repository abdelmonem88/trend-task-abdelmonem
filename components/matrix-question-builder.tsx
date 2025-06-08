"use client";

import { useQuestionBuilder } from "@/lib/hooks/use-question-builder";
import { LoadingSkeleton } from "./shared/loading-skeleton";
import { AdminModeWrapper } from "./matrix/admin-mode-wrapper";
import { QuestionsPreview } from "./matrix/questions-preview";

export function MatrixQuestionBuilder() {
  const {
    questions,
    isMounted,
    showAdminMode,
    currentQuestion,
    currentSaveHandler,
    updateQuestion,
    addNewQuestion,
    resetCurrentQuestion,
    startEditing,
  } = useQuestionBuilder();

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return <LoadingSkeleton />;
  }

  // Show admin mode for creating first question or editing existing question
  if (showAdminMode && currentQuestion) {
    return (
      <AdminModeWrapper
        question={currentQuestion}
        updateQuestion={updateQuestion}
        onSave={currentSaveHandler}
        onAddQuestion={resetCurrentQuestion}
      />
    );
  }

  // Show questions in preview mode with edit capabilities
  return (
    <QuestionsPreview
      questions={questions}
      onEditQuestion={startEditing}
      onAddQuestion={addNewQuestion}
    />
  );
}

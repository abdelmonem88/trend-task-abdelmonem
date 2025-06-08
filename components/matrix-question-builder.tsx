"use client";

import { useState, useEffect } from "react";

import { MatrixQuestion } from "@/types/matrix";
import { AdminMode } from "./admin-mode";
import { UserMode } from "./user-mode";
import { Button } from "@/components/ui/button";
import { SVG } from "@/components/shared/SVG";

export function MatrixQuestionBuilder() {
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);
  const [questions, setQuestions] = useState<MatrixQuestion[]>([]);
  const [isCreatingFirst, setIsCreatingFirst] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component only renders after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Helper function to create a new question with predictable IDs
  const createQuestion = (index: number): MatrixQuestion => ({
    id: `question-${index + 1}`,
    text: "",
    rows: [{ id: `q${index + 1}-row-1`, label: "" }],
    columns: [{ id: `q${index + 1}-col-1`, label: "" }],
    allowMultiple: false,
    isRequired: false,
  });

  // Initial empty question for first creation
  const [newQuestion, setNewQuestion] = useState<MatrixQuestion>(() =>
    createQuestion(0)
  );

  // Form validation function
  const validateQuestion = (question: MatrixQuestion): string[] => {
    const errors: string[] = [];

    if (!question.text.trim()) {
      errors.push("عنوان السؤال مطلوب");
    }

    const emptyRows = question.rows.filter((row) => !row.label.trim());
    if (emptyRows.length > 0) {
      errors.push("جميع عناوين الصفوف مطلوبة");
    }

    const emptyColumns = question.columns.filter((col) => !col.label.trim());
    if (emptyColumns.length > 0) {
      errors.push("جميع عناوين الأعمدة مطلوبة");
    }

    return errors;
  };

  const updateQuestion = (updatedQuestion: MatrixQuestion) => {
    if (isCreatingFirst) {
      setNewQuestion(updatedQuestion);
    } else if (editingQuestionIndex !== null) {
      setQuestions((prev) =>
        prev.map((q, index) =>
          index === editingQuestionIndex ? updatedQuestion : q
        )
      );
    }
  };

  const saveFirstQuestion = () => {
    const errors = validateQuestion(newQuestion);
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    setQuestions([newQuestion]);
    setIsCreatingFirst(false);
    setEditingQuestionIndex(null);
  };

  const addNewQuestion = () => {
    try {
      // If we're in editing mode, validate current question first
      if (editingQuestionIndex !== null && questions[editingQuestionIndex]) {
        const currentQuestion = questions[editingQuestionIndex];
        const errors = validateQuestion(currentQuestion);
        if (errors.length > 0) {
          alert(errors.join("\n"));
          return;
        }
      }

      // If we're creating first question, validate and save it
      if (isCreatingFirst) {
        const errors = validateQuestion(newQuestion);
        if (errors.length > 0) {
          alert(errors.join("\n"));
          return;
        }
        // Save the current question first
        setQuestions([newQuestion]);
        setIsCreatingFirst(false);
      }

      // Create new question
      const nextIndex = isCreatingFirst ? 1 : questions.length;
      const newQ = createQuestion(nextIndex);

      if (isCreatingFirst) {
        // Reset for new question creation
        setNewQuestion(newQ);
      } else {
        // Add to existing questions and edit it
        setQuestions((prev) => [...prev, newQ]);
        setEditingQuestionIndex(questions.length);
      }
    } catch (error) {
      console.error("Error adding new question:", error);
    }
  };

  const resetCurrentQuestion = () => {
    try {
      if (isCreatingFirst) {
        // Reset the new question being created
        setNewQuestion(createQuestion(0));
      } else if (editingQuestionIndex !== null) {
        // Reset the question being edited
        const resetQuestion = createQuestion(editingQuestionIndex);
        setQuestions((prev) =>
          prev.map((q, index) =>
            index === editingQuestionIndex ? resetQuestion : q
          )
        );
      }
    } catch (error) {
      console.error("Error resetting question:", error);
    }
  };

  const startEditing = (questionIndex: number) => {
    if (questionIndex >= 0 && questionIndex < questions.length) {
      setEditingQuestionIndex(questionIndex);
    }
  };

  const stopEditing = () => {
    try {
      // Validate before stopping edit
      if (editingQuestionIndex !== null && questions[editingQuestionIndex]) {
        const errors = validateQuestion(questions[editingQuestionIndex]);
        if (errors.length > 0) {
          alert(errors.join("\n"));
          return;
        }
      }
      setEditingQuestionIndex(null);
    } catch (error) {
      console.error("Error stopping edit:", error);
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
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

  // Determine if we should show admin mode
  const showAdminMode = isCreatingFirst || editingQuestionIndex !== null;

  // Get the current question and handlers for admin mode
  const getCurrentQuestion = () => {
    if (isCreatingFirst) {
      return newQuestion;
    } else if (editingQuestionIndex !== null) {
      return questions[editingQuestionIndex];
    }
    return null;
  };

  const getCurrentSaveHandler = () => {
    if (isCreatingFirst) {
      return saveFirstQuestion;
    } else {
      return stopEditing;
    }
  };

  // Show admin mode for creating first question or editing existing question
  if (showAdminMode) {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return null;

    return (
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <AdminMode
            question={currentQuestion}
            updateQuestion={updateQuestion}
            onSave={getCurrentSaveHandler()}
            onAddQuestion={resetCurrentQuestion}
          />
        </div>
      </div>
    );
  }

  // Show questions in preview mode with edit capabilities
  return (
    <div className="space-y-6">
      {/* Show all questions */}
      {questions.map((question, index) => (
        <div
          key={question.id}
          className="border border-gray-200 rounded-xl overflow-hidden relative"
        >
          <UserMode question={question} onEdit={() => startEditing(index)} />
        </div>
      ))}

      {/* Single Add Question button at the bottom */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={addNewQuestion}
          variant="outline"
          className="border-primary-blue text-primary-blue hover:bg-primary-light px-6 py-3 h-12 rounded-full flex items-center gap-2"
        >
          <SVG name="plus" size={16} color="var(--primary-blue)" />
          إضافة سؤال آخر
        </Button>
      </div>
    </div>
  );
}

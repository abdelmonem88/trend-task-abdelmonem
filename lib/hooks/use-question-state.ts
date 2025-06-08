import { useState, useEffect } from "react";
import { MatrixQuestion } from "@/types/matrix";
import { createQuestion } from "@/lib/utils/question-utils";

export function useQuestionState() {
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);
  const [questions, setQuestions] = useState<MatrixQuestion[]>([]);
  const [isCreatingFirst, setIsCreatingFirst] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Initial empty question for first creation
  const [newQuestion, setNewQuestion] = useState<MatrixQuestion>(() =>
    createQuestion(0)
  );

  // Ensure component only renders after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    editingQuestionIndex,
    setEditingQuestionIndex,
    questions,
    setQuestions,
    isCreatingFirst,
    setIsCreatingFirst,
    isMounted,
    newQuestion,
    setNewQuestion,
  };
}

import { MatrixQuestion } from "@/types/matrix";
import { createQuestion, validateQuestion } from "@/lib/utils/question-utils";

interface QuestionOperationsProps {
  questions: MatrixQuestion[];
  setQuestions: (
    questions: MatrixQuestion[] | ((prev: MatrixQuestion[]) => MatrixQuestion[])
  ) => void;
  newQuestion: MatrixQuestion;
  setNewQuestion: (question: MatrixQuestion) => void;
  isCreatingFirst: boolean;
  setIsCreatingFirst: (value: boolean) => void;
  editingQuestionIndex: number | null;
  setEditingQuestionIndex: (index: number | null) => void;
}

export function useQuestionOperations({
  questions,
  setQuestions,
  newQuestion,
  setNewQuestion,
  isCreatingFirst,
  setIsCreatingFirst,
  editingQuestionIndex,
  setEditingQuestionIndex,
}: QuestionOperationsProps) {
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

  return {
    updateQuestion,
    addNewQuestion,
    resetCurrentQuestion,
    startEditing,
    stopEditing,
    saveFirstQuestion,
  };
}

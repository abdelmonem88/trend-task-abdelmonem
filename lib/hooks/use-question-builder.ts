import { useQuestionState } from "./use-question-state";
import { useQuestionOperations } from "./use-question-operations";

export function useQuestionBuilder() {
  // Get all state from focused state hook
  const state = useQuestionState();

  // Get all operations from focused operations hook
  const operations = useQuestionOperations(state);

  // Get the current question for admin mode
  const getCurrentQuestion = () => {
    if (state.isCreatingFirst) {
      return state.newQuestion;
    } else if (state.editingQuestionIndex !== null) {
      return state.questions[state.editingQuestionIndex];
    }
    return null;
  };

  // Get the current save handler for admin mode
  const getCurrentSaveHandler = () => {
    if (state.isCreatingFirst) {
      return operations.saveFirstQuestion;
    } else {
      return operations.stopEditing;
    }
  };

  // Determine if we should show admin mode
  const showAdminMode =
    state.isCreatingFirst || state.editingQuestionIndex !== null;

  return {
    // State
    questions: state.questions,
    editingQuestionIndex: state.editingQuestionIndex,
    isCreatingFirst: state.isCreatingFirst,
    isMounted: state.isMounted,
    showAdminMode,

    // Current question data
    currentQuestion: getCurrentQuestion(),
    currentSaveHandler: getCurrentSaveHandler(),

    // Operations
    updateQuestion: operations.updateQuestion,
    addNewQuestion: operations.addNewQuestion,
    resetCurrentQuestion: operations.resetCurrentQuestion,
    startEditing: operations.startEditing,
    stopEditing: operations.stopEditing,
  };
}

import { MatrixQuestion } from "@/types/matrix";

// Helper function to create a new question with predictable IDs
export function createQuestion(index: number): MatrixQuestion {
  return {
    id: `question-${index + 1}`,
    text: "",
    rows: [{ id: `q${index + 1}-row-1`, label: "" }],
    columns: [{ id: `q${index + 1}-col-1`, label: "" }],
    allowMultiple: false,
    isRequired: false,
  };
}

// Form validation function
export function validateQuestion(question: MatrixQuestion): string[] {
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
}

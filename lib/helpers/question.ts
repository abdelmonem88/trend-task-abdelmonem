import { MatrixQuestion } from "@/types/matrix";

/**
 * Creates a new question with predictable IDs and default values
 */
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

/**
 * Validates a question and returns array of error messages
 * Returns empty array if valid
 */
export function validateQuestion(question: MatrixQuestion): string[] {
  const errors: string[] = [];

  // Check question text
  if (!question.text.trim()) {
    errors.push("يرجى إدخال نص السؤال");
  }

  // Check for empty rows
  const emptyRows = question.rows.filter((row) => !row.label.trim());
  if (emptyRows.length > 0) {
    if (emptyRows.length === 1) {
      errors.push("يرجى إدخال تسمية الصف الفارغ");
    } else {
      errors.push(`يرجى إدخال تسميات ${emptyRows.length} صفوف فارغة`);
    }
  }

  // Check for empty columns
  const emptyColumns = question.columns.filter((col) => !col.label.trim());
  if (emptyColumns.length > 0) {
    if (emptyColumns.length === 1) {
      errors.push("يرجى إدخال تسمية العمود الفارغ");
    } else {
      errors.push(`يرجى إدخال تسميات ${emptyColumns.length} أعمدة فارغة`);
    }
  }

  // Check minimum requirements
  if (question.rows.length === 0) {
    errors.push("يجب إضافة صف واحد على الأقل");
  }

  if (question.columns.length === 0) {
    errors.push("يجب إضافة عمود واحد على الأقل");
  }

  return errors;
}

/**
 * Checks if a question is valid (has no validation errors)
 */
export function isQuestionValid(question: MatrixQuestion): boolean {
  return validateQuestion(question).length === 0;
}

/**
 * Gets a human-readable summary of a question
 */
export function getQuestionSummary(question: MatrixQuestion): string {
  const rowCount = question.rows.length;
  const colCount = question.columns.length;
  const type = question.allowMultiple ? "متعدد الخيارات" : "خيار واحد";

  return `${rowCount} صفوف × ${colCount} أعمدة (${type})`;
}

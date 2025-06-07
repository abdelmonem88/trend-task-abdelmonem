export interface MatrixQuestion {
  id: string;
  text: string;
  rows: MatrixRow[];
  columns: MatrixColumn[];
  allowMultiple: boolean;
  isRequired: boolean;
}

export interface MatrixRow {
  id: string;
  label: string;
}

export interface MatrixColumn {
  id: string;
  label: string;
}

import { MatrixQuestion, MatrixRow, MatrixColumn } from "@/types/matrix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SVG } from "@/components/shared/SVG";

interface MatrixEditorProps {
  question: MatrixQuestion;
  onUpdateRowLabel: (rowId: string, label: string) => void;
  onUpdateColumnLabel: (columnId: string, label: string) => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  onRemoveRow: (rowId: string) => void;
  onRemoveColumn: (columnId: string) => void;
}

export function MatrixEditor({
  question,
  onUpdateRowLabel,
  onUpdateColumnLabel,
  onAddRow,
  onAddColumn,
  onRemoveRow,
  onRemoveColumn,
}: MatrixEditorProps) {
  return (
    <div className="space-y-4">
      <div className="scrollable-container overflow-auto max-h-96 max-w-full bg-white">
        <div className="min-w-max">
          {/* Column headers row */}
          <div className="sticky top-0 z-10">
            <div className="flex items-center p-3">
              {/* Row labels header space */}
              <div className="w-32"></div>

              {/* Column headers using logical properties */}
              <div className="flex gap-4 ps-4">
                {[...question.columns].reverse().map((col) => (
                  <div key={col.id} className="relative group w-28">
                    <Input
                      value={col.label}
                      onChange={(e) =>
                        onUpdateColumnLabel(col.id, e.target.value)
                      }
                      className="text-center text-sm h-8 bg-white border border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-200 rounded"
                      dir="rtl"
                      style={{ direction: "rtl", textAlign: "center" }}
                    />
                    {question.columns.length > 1 && (
                      <Button
                        onClick={() => onRemoveColumn(col.id)}
                        variant="ghost"
                        size="sm"
                        className="absolute -top-[40%] -right-[-40%] opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 p-0 rounded flex items-center justify-center"
                        style={{
                          backgroundColor: "rgba(14, 4, 100, 0.2)",
                        }}
                      >
                        <SVG name="x" size={20} color="#041C64" />
                      </Button>
                    )}
                  </div>
                ))}

                {/* Add column button */}
                <div className="w-28 flex justify-center">
                  <Button
                    onClick={onAddColumn}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 hover:bg-primary-light text-base font-medium"
                    style={{ color: "#041C64" }}
                  >
                    <SVG name="plus" size={16} color="#041C64" />
                    <span>إضافة عمود</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Matrix rows */}
          <div className="space-y-2">
            {question.rows.map((row) => (
              <div
                key={row.id}
                className="flex items-center p-3 bg-[#F7F7F7] rounded-[10px]"
              >
                {/* Row label using logical properties */}
                <div className="w-32 relative group pe-3">
                  <Input
                    value={row.label}
                    onChange={(e) => onUpdateRowLabel(row.id, e.target.value)}
                    className="text-end text-sm h-8 bg-white border border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-gray-200 rounded"
                    dir="rtl"
                    style={{ direction: "rtl", textAlign: "right" }}
                  />
                  {question.rows.length > 1 && (
                    <Button
                      onClick={() => onRemoveRow(row.id)}
                      variant="ghost"
                      size="sm"
                      className="absolute -top-[40%] -right-[-40%] opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 p-0 rounded flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(14, 4, 100, 0.2)",
                      }}
                    >
                      <SVG name="x" size={20} color="#041C64" />
                    </Button>
                  )}
                </div>

                {/* Response options in reverse order for RTL */}
                <div className="flex gap-4 ps-4">
                  {[...question.columns].reverse().map((col) => (
                    <div key={col.id} className="w-28 flex justify-center">
                      <div
                        className={`w-6 h-6 border-2 border-gray-300 ${
                          question.allowMultiple ? "rounded" : "rounded-full"
                        } bg-white`}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Add row button inside the matrix, using logical positioning */}
            <div className="flex items-center">
              <div className="w-32 pe-3 flex justify-end">
                <Button
                  onClick={onAddRow}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-primary-light text-base font-medium text-primary-blue"
                  // style={{ color: "#041C64" }}
                >
                  <SVG name="plus" size={16} color="#041C64" />
                  <span>إضافة صف</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

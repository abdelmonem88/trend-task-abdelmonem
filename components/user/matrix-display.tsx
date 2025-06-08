import { MatrixQuestion } from "@/types/matrix";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface MatrixDisplayProps {
  question: MatrixQuestion;
  responses: Record<string, string | string[]>;
  onSingleResponse: (rowId: string, columnId: string) => void;
  onMultipleResponse: (
    rowId: string,
    columnId: string,
    checked: boolean
  ) => void;
}

export function MatrixDisplay({
  question,
  responses,
  onSingleResponse,
  onMultipleResponse,
}: MatrixDisplayProps) {
  return (
    <div className="px-6 pb-4">
      <div className="scrollable-container overflow-auto max-h-96 max-w-full">
        <div className="min-w-max">
          {/* Header row */}
          <div className="sticky top-0 z-10">
            <div className="flex items-center py-3 px-2">
              {/* Row header space */}
              <div className="w-40 text-center"></div>

              {/* Column headers in reverse order for RTL */}
              <div className="flex gap-3 ps-4">
                {[...question.columns].reverse().map((col) => (
                  <div key={col.id} className="w-24 text-center">
                    <div className="text-sm font-medium text-gray-700">
                      {col.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data rows */}
          <div className="space-y-2">
            {question.rows.map((row) => (
              <div
                key={row.id}
                className="flex items-center py-3 px-2 bg-[#F7F7F7] rounded-[10px]"
              >
                {/* Row label */}
                <div className="w-40 text-center px-2">
                  <span className="font-medium text-gray-800 text-sm">
                    {row.label}
                  </span>
                </div>

                {/* Response cells in reverse order for RTL */}
                <div className="flex gap-3 ps-4">
                  {[...question.columns].reverse().map((col) => (
                    <div
                      key={col.id}
                      className="w-24 flex justify-center items-center min-h-[32px]"
                    >
                      {question.allowMultiple ? (
                        <Checkbox
                          id={`${row.id}-${col.id}`}
                          checked={(
                            (responses[row.id] as string[]) || []
                          ).includes(col.id)}
                          onCheckedChange={(checked) =>
                            onMultipleResponse(
                              row.id,
                              col.id,
                              checked as boolean
                            )
                          }
                          data-slot="checkbox"
                        />
                      ) : (
                        <RadioGroup
                          value={(responses[row.id] as string) || ""}
                          onValueChange={(value) =>
                            onSingleResponse(row.id, value)
                          }
                          className="flex items-center justify-center"
                        >
                          <RadioGroupItem
                            value={col.id}
                            id={`${row.id}-${col.id}`}
                          />
                        </RadioGroup>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

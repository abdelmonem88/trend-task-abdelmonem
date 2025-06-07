"use client";

import { useState } from "react";
import { MatrixQuestion } from "@/types/matrix";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface UserModeProps {
  question: MatrixQuestion;
  onEdit: () => void;
}

export function UserMode({ question, onEdit }: UserModeProps) {
  const [responses, setResponses] = useState<Record<string, string | string[]>>(
    {}
  );

  const handleSingleResponse = (rowId: string, columnId: string) => {
    setResponses((prev) => ({
      ...prev,
      [rowId]: columnId,
    }));
  };

  const handleMultipleResponse = (
    rowId: string,
    columnId: string,
    checked: boolean
  ) => {
    setResponses((prev) => {
      const currentResponses = (prev[rowId] as string[]) || [];
      const newResponses = checked
        ? [...currentResponses, columnId]
        : currentResponses.filter((id) => id !== columnId);

      return {
        ...prev,
        [rowId]: newResponses,
      };
    });
  };

  const getResponseCount = () => {
    return Object.keys(responses).filter((rowId) => {
      const response = responses[rowId];
      if (Array.isArray(response)) {
        return response.length > 0;
      }
      return response !== undefined && response !== "";
    }).length;
  };

  const progressPercentage = Math.round(
    (getResponseCount() / question.rows.length) * 100
  );

  return (
    <div
      className="w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100"
      dir="rtl"
    >
      {/* Question text */}
      <div className="p-8 pb-4">
        <div
          className="bg-gray-50 rounded-lg p-6 mb-8 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={onEdit}
        >
          <h2 className="text-xl font-medium text-gray-800 text-right leading-relaxed">
            {question.text}
          </h2>
        </div>

        {/* Matrix container with proper RTL layout and scrolling */}
        <div className="scrollable-container overflow-auto max-h-96 max-w-full border border-gray-200 rounded-lg bg-white">
          <div className="min-w-max">
            {/* Header row */}
            <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <div className="flex items-center p-4">
                {/* Row header space */}
                <div className="w-32 text-center">
                  <div className="text-sm font-medium text-gray-700">
                    العنصر
                  </div>
                </div>

                {/* Column headers in reverse order for RTL */}
                <div className="flex gap-4 ps-4">
                  {[...question.columns].reverse().map((col) => (
                    <div key={col.id} className="w-28 text-center">
                      <div className="text-sm font-medium text-gray-700">
                        {col.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data rows */}
            <div className="divide-y divide-gray-100">
              {question.rows.map((row) => (
                <div
                  key={row.id}
                  className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Row label */}
                  <div className="w-32 text-center border-e border-gray-200 pe-3">
                    <span className="text-sm font-medium text-gray-800">
                      {row.label}
                    </span>
                  </div>

                  {/* Response cells in reverse order for RTL */}
                  <div className="flex gap-4 ps-4">
                    {[...question.columns].reverse().map((col) => (
                      <div key={col.id} className="w-28 flex justify-center">
                        {question.allowMultiple ? (
                          <Checkbox
                            id={`${row.id}-${col.id}`}
                            checked={(
                              (responses[row.id] as string[]) || []
                            ).includes(col.id)}
                            onCheckedChange={(checked) =>
                              handleMultipleResponse(
                                row.id,
                                col.id,
                                checked as boolean
                              )
                            }
                            className="w-5 h-5 border-2 border-gray-300 data-[state=checked]:bg-primary-blue data-[state=checked]:border-primary-blue"
                          />
                        ) : (
                          <RadioGroup
                            value={(responses[row.id] as string) || ""}
                            onValueChange={(value) =>
                              handleSingleResponse(row.id, value)
                            }
                            className="flex items-center justify-center"
                          >
                            <div className="flex items-center">
                              <RadioGroupItem
                                value={col.id}
                                id={`${row.id}-${col.id}`}
                                className="w-5 h-5 border-2 border-gray-300 text-primary-blue data-[state=checked]:border-primary-blue"
                              />
                            </div>
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

      {/* Progress bar */}
      <div className="px-8 pb-8">
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary-blue h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-center mt-3">
          <span className="text-sm text-gray-600">
            {getResponseCount()} من {question.rows.length} تم الإجابة عليها
          </span>
        </div>
      </div>
    </div>
  );
}

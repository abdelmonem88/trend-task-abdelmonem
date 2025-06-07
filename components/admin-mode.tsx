"use client";

import { MatrixQuestion, MatrixRow, MatrixColumn } from "@/types/matrix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Trash2,
  Plus,
  Copy,
  Save,
  MoreHorizontal,
  Palette,
  Grid3X3,
  Link,
  Underline,
  Italic,
  Bold,
  X,
  ChevronDown,
} from "lucide-react";

interface AdminModeProps {
  question: MatrixQuestion;
  updateQuestion: (question: MatrixQuestion) => void;
  onSave: () => void;
  onAddQuestion?: () => void;
}

export function AdminMode({
  question,
  updateQuestion,
  onSave,
  onAddQuestion,
}: AdminModeProps) {
  const addRow = () => {
    const newRow: MatrixRow = {
      id: `row-${Date.now()}`,
      label: "",
    };
    updateQuestion({
      ...question,
      rows: [...question.rows, newRow],
    });
  };

  const addColumn = () => {
    const newColumn: MatrixColumn = {
      id: `col-${Date.now()}`,
      label: "",
    };
    updateQuestion({
      ...question,
      columns: [newColumn, ...question.columns],
    });
  };

  const removeRow = (rowId: string) => {
    if (question.rows.length > 1) {
      updateQuestion({
        ...question,
        rows: question.rows.filter((row) => row.id !== rowId),
      });
    }
  };

  const removeColumn = (columnId: string) => {
    if (question.columns.length > 1) {
      updateQuestion({
        ...question,
        columns: question.columns.filter((col) => col.id !== columnId),
      });
    }
  };

  const updateRowLabel = (rowId: string, label: string) => {
    updateQuestion({
      ...question,
      rows: question.rows.map((row) =>
        row.id === rowId ? { ...row, label } : row
      ),
    });
  };

  const updateColumnLabel = (columnId: string, label: string) => {
    updateQuestion({
      ...question,
      columns: question.columns.map((col) =>
        col.id === columnId ? { ...col, label } : col
      ),
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <div className="space-y-8">
        {/* Question section */}
        <div className="flex gap-4 justify-between items-start">
          {/* Question input field */}
          <div className="flex-3">
            <Input
              value={question.text}
              onChange={(e) =>
                updateQuestion({ ...question, text: e.target.value })
              }
              placeholder="اكتب سؤالك..."
              className="bg-gray-50 border-0 border-b-2 border-primary-blue rounded px-3 pt-1 min-h-12"
              dir="rtl"
              style={{ direction: "rtl", textAlign: "right" }}
            />

            {/* Text editor toolbar */}
            <div className="flex justify-start gap-4 py-3 border-t border-gray-100">
              <Button variant="ghost" size="sm" className="p-2">
                <Palette className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Link className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Underline className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Italic className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Bold className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Type selector with dropdown */}
          <div className="flex items-center justify-between gap-2 px-3 bg-gray-50 rounded-lg border border-gray-200 min-h-12 flex-1">
            <div className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">مصفوفة</span>
            </div>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Scrollable Matrix section */}
        <div className="space-y-4">
          <div className="scrollable-container overflow-auto max-h-96 max-w-full border border-gray-200 rounded-lg bg-white">
            <div className="min-w-max">
              {/* Column headers row */}
              <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                <div className="flex items-center p-3">
                  {/* Row labels header space */}
                  <div className="w-32"></div>

                  {/* Column headers using logical properties */}
                  <div className="flex gap-4 ps-4">
                    {[...question.columns].reverse().map((col, index) => (
                      <div key={col.id} className="relative group w-28">
                        <Input
                          value={col.label}
                          onChange={(e) =>
                            updateColumnLabel(col.id, e.target.value)
                          }
                          className="text-center text-sm h-8 bg-white border border-gray-200 focus:ring-1 focus:ring-primary-blue rounded"
                          dir="rtl"
                          style={{ direction: "rtl", textAlign: "center" }}
                        />
                        {question.columns.length > 1 && (
                          <Button
                            onClick={() => removeColumn(col.id)}
                            variant="ghost"
                            size="sm"
                            className="absolute -top-2 -start-2 opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    ))}

                    {/* Add column button */}
                    <div className="w-28 flex justify-center">
                      <Button
                        onClick={addColumn}
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-primary-blue hover:text-primary-blue hover:bg-primary-blue-light text-sm"
                      >
                        <Plus className="w-3 h-3" />
                        <span>إضافة عمود</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matrix rows */}
              <div className="divide-y divide-gray-100">
                {question.rows.map((row, rowIndex) => (
                  <div
                    key={row.id}
                    className="flex items-center p-3 hover:bg-gray-50"
                  >
                    {/* Row label using logical properties */}
                    <div className="w-32 relative group border-e border-gray-200 pe-3">
                      <Input
                        value={row.label}
                        onChange={(e) => updateRowLabel(row.id, e.target.value)}
                        className="text-end text-sm h-8 bg-white border border-gray-200 focus:ring-1 focus:ring-primary-blue rounded"
                        dir="rtl"
                        style={{ direction: "rtl", textAlign: "right" }}
                      />
                      {question.rows.length > 1 && (
                        <Button
                          onClick={() => removeRow(row.id)}
                          variant="ghost"
                          size="sm"
                          className="absolute -top-2 -end-2 opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 p-0 bg-red-500 hover:bg-red-600 text-white rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>

                    {/* Response options in reverse order for RTL */}
                    <div className="flex gap-4 ps-4">
                      {[...question.columns].reverse().map((col) => (
                        <div key={col.id} className="w-28 flex justify-center">
                          <div
                            className={`w-6 h-6 border-2 border-gray-300 ${
                              question.allowMultiple
                                ? "rounded"
                                : "rounded-full"
                            } bg-white`}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Add row button inside the matrix, using logical positioning */}
                <div className="flex items-center p-3 bg-gray-50/50 border-t border-dashed border-gray-300">
                  <div className="w-32 border-e border-gray-200 pe-3 flex justify-end">
                    <Button
                      onClick={addRow}
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-primary-blue hover:text-primary-blue hover:bg-primary-blue-light text-sm px-4 py-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة صف</span>
                    </Button>
                  </div>
                  <div className="flex-1 ps-4">
                    {/* Empty space for alignment */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Settings section */}
        <div className="space-y-6">
          {/* Question type selector */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-right">طريقة عرض السؤال</h3>
            <div className="flex gap-4 flex-col">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="single-choice"
                  checked={!question.allowMultiple}
                  onCheckedChange={() =>
                    updateQuestion({ ...question, allowMultiple: false })
                  }
                  className="h-6 w-6 rounded-md border-2 border-gray-300 data-[state=checked]:bg-[#0E0464] data-[state=checked]:border-[#0E0464] data-[state=checked]:text-white data-[state=unchecked]:bg-white"
                />
                <Label
                  htmlFor="single-choice"
                  className="text-base font-medium cursor-pointer"
                >
                  اختيار وحيد
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="multiple-choice"
                  checked={question.allowMultiple}
                  onCheckedChange={() =>
                    updateQuestion({ ...question, allowMultiple: true })
                  }
                  className="h-6 w-6 rounded-md border-2 border-gray-300 data-[state=checked]:bg-[#0E0464] data-[state=checked]:border-[#0E0464] data-[state=checked]:text-white data-[state=unchecked]:bg-white"
                />
                <Label
                  htmlFor="multiple-choice"
                  className="text-base font-medium cursor-pointer"
                >
                  اختيارات متعددة
                </Label>
              </div>
            </div>
          </div>

          {/* Bottom section with actions and required toggle - Figma layout */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              {/* Required toggle on the right */}
              <div className="flex items-center gap-4">
                <Switch
                  id="required-switch"
                  checked={question.isRequired}
                  onCheckedChange={(checked) =>
                    updateQuestion({
                      ...question,
                      isRequired: checked,
                    })
                  }
                />
                <Label
                  htmlFor="required-switch"
                  className="text-lg font-medium cursor-pointer"
                >
                  مطلوب
                </Label>
              </div>

              {/* Action buttons on the left */}
              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-primary-blue-light text-primary-blue p-3 rounded-full hover:bg-primary-blue-light/80"
                >
                  <Copy className="w-4 h-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="lg"
                  className="bg-primary-blue-light text-primary-blue p-3 rounded-full hover:bg-primary-blue-light/80"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                {onAddQuestion && (
                  <Button
                    onClick={onAddQuestion}
                    variant="outline"
                    size="lg"
                    className="border-primary-blue text-primary-blue hover:bg-primary-blue-light px-6 py-3 rounded-full flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    إضافة سؤال آخر
                  </Button>
                )}

                <Button
                  onClick={onSave}
                  size="lg"
                  className="bg-primary-blue hover:bg-primary-blue-hover text-white px-6 py-3 rounded-full flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  حفظ السؤال
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

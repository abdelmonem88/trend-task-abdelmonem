"use client";

import { MatrixQuestion, MatrixRow, MatrixColumn } from "@/types/matrix";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Palette } from "lucide-react";
import { SVG } from "@/components/shared/SVG";

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
              className="bg-gray-50 border-0 border-b-2 border-primary-blue rounded-[4px] px-3 py-2 min-h-12 text-lg placeholder:text-[#B1B0BB] placeholder:text-lg"
              dir="rtl"
              style={{ direction: "rtl", textAlign: "right" }}
            />

            {/* Text editor toolbar */}
            <div className="flex justify-start gap-1 py-3 border-t border-gray-100">
              <Button variant="ghost" size="sm" className="p-2">
                <SVG
                  name="text-bold"
                  size={16}
                  color="#575757"
                  fillColor="#fff"
                />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <SVG
                  name="text-italic"
                  size={16}
                  color="#575757"
                  fillColor="#fff"
                />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <SVG
                  name="text-underline"
                  size={16}
                  color="#575757"
                  fillColor="#fff"
                />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <SVG name="link-2" size={16} color="#575757" fillColor="#fff" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <SVG
                  name="gallery"
                  size={16}
                  color="#575757"
                  fillColor="#fff"
                />
              </Button>
            </div>
          </div>

          {/* Type selector with dropdown */}
          <div className="flex items-center justify-between gap-2 px-3 bg-gray-50 rounded-lg border border-gray-200 min-h-12 flex-1">
            <div className="flex items-center gap-2">
              <SVG name="grid" size={16} color="#292D32" fillColor="#fff" />
              <span className="text-sm font-medium">مصفوفة</span>
            </div>
            <Button variant="ghost" size="sm" className="p-1 h-auto">
              <SVG
                name="chevron-down"
                size={16}
                color="#575757"
                fillColor="#fff"
              />
            </Button>
          </div>
        </div>

        {/* Scrollable Matrix section */}
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
                            className="absolute -top-[40%] -right-[-40%] opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 p-0 rounded flex items-center justify-center"
                            style={{
                              backgroundColor: "rgba(14, 4, 100, 0.2)",
                            }}
                          >
                            <SVG name="x" size={12} color="#041C64" />
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
                          className="absolute -top-[40%] -right-[-40%] opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 p-0 rounded flex items-center justify-center"
                          style={{
                            backgroundColor: "rgba(14, 4, 100, 0.2)",
                          }}
                        >
                          <SVG name="x" size={12} color="#041C64" />
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
                <div className="flex items-center p-3">
                  <div className="w-32 pe-3 flex justify-end">
                    <Button
                      onClick={addRow}
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 hover:bg-primary-light text-base font-medium px-4 py-2"
                      style={{ color: "#041C64" }}
                    >
                      <SVG name="plus" size={16} color="#041C64" />
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
                <Button className="bg-primary-light text-primary-blue rounded-full hover:bg-primary-light/80 w-12 h-12">
                  <SVG name="copy" size={20} color="#0e0464" fillColor="#fff" />
                </Button>

                <Button className="bg-primary-light text-primary-blue rounded-full hover:bg-primary-light/80 w-12 h-12">
                  <SVG
                    name="trash"
                    size={20}
                    color="#0e0464"
                    fillColor="#fff"
                  />
                </Button>

                {onAddQuestion && (
                  <Button
                    onClick={onAddQuestion}
                    variant="outline"
                    size="lg"
                    className="border-primary-blue text-primary-blue hover:bg-primary-light px-6 py-3 h-12 rounded-full flex items-center gap-2"
                  >
                    <SVG name="plus" size={16} color="#0e0464" />
                    إضافة سؤال آخر
                  </Button>
                )}

                <Button
                  onClick={onSave}
                  size="lg"
                  className="bg-primary hover:bg-primary-blue-hover text-[#fff]! px-6 py-3 h-12 rounded-full flex items-center gap-2"
                >
                  <SVG name="save" size={20} color="white" />
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

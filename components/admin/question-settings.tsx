import { MatrixQuestion } from "@/types/matrix";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { SVG } from "@/components/shared/SVG";

interface QuestionSettingsProps {
  question: MatrixQuestion;
  onUpdateQuestion: (updates: Partial<MatrixQuestion>) => void;
  onSave: () => void;
  onAddQuestion?: () => void;
}

export function QuestionSettings({
  question,
  onUpdateQuestion,
  onSave,
  onAddQuestion,
}: QuestionSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Question type selector */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-right">طريقة عرض السؤال</h3>
        <div className="flex gap-4 flex-col">
          <div className="flex items-center gap-3">
            <Checkbox
              id="single-choice"
              checked={!question.allowMultiple}
              onCheckedChange={() => onUpdateQuestion({ allowMultiple: false })}
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
              onCheckedChange={() => onUpdateQuestion({ allowMultiple: true })}
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

      {/* Bottom section with actions and required toggle */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center">
          {/* Required toggle on the right */}
          <div className="flex items-center gap-4">
            <Switch
              id="required-switch"
              checked={question.isRequired}
              onCheckedChange={(checked) =>
                onUpdateQuestion({ isRequired: checked })
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
              <SVG name="trash" size={20} color="#0e0464" fillColor="#fff" />
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
  );
}

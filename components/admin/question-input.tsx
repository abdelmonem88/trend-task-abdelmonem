import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SVG } from "@/components/shared/SVG";

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function QuestionInput({
  value,
  onChange,
  placeholder = "اكتب سؤالك...",
}: QuestionInputProps) {
  return (
    <div className="flex gap-4 justify-between items-start">
      {/* Question input field */}
      <div className="flex-3">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-gray-50 border-0 border-b-2 border-primary-blue rounded-[4px] px-3 py-2 min-h-12 text-lg placeholder:text-[#B1B0BB] placeholder:text-lg"
          dir="rtl"
          style={{ direction: "rtl", textAlign: "right" }}
        />

        {/* Text editor toolbar */}
        <div className="flex justify-start gap-1 py-3 border-t border-gray-100">
          <Button variant="ghost" size="sm" className="p-2">
            <SVG name="text-bold" size={16} color="#575757" fillColor="#fff" />
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
            <SVG name="gallery" size={16} color="#575757" fillColor="#fff" />
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
          <SVG name="chevron-down" size={16} color="#575757" fillColor="#fff" />
        </Button>
      </div>
    </div>
  );
}

"use client";

import { MatrixQuestionBuilder } from "@/components/matrix-question-builder";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-50 to-transparent p-8"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        <MatrixQuestionBuilder />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ValidationBadge } from "./ValidationBadge";
import { cn, formatDate } from "@/lib/utils";

interface DesignSpec {
  id: string;
  name: string;
  width: number;
  height: number;
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  buttonSize: number;
  createdAt: string;
  validations: {
    contrastRatio: number;
    contrastPass: boolean;
    touchTargetPass: boolean;
    fontSizePass: boolean;
    safeAreaPass: boolean;
    overallStatus: "pass" | "warning" | "error";
  };
}

interface DesignCardProps {
  design: DesignSpec;
  onDelete: (id: string) => void;
  index: number;
}

export function DesignCard({ design, onDelete, index }: DesignCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(design.id);
    }, 300);
  };

  return (
    <div
      className={cn(
        "group bg-white/70 dark:bg-stone-800/70 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 dark:border-stone-700 p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        isDeleting && "animate-fade-out opacity-0 -translate-x-5"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
            {design.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formatDate(design.createdAt)}
          </p>
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl shadow-inner",
            design.validations.overallStatus === "pass" && "bg-emerald-500",
            design.validations.overallStatus === "warning" && "bg-amber-500",
            design.validations.overallStatus === "error" && "bg-rose-500"
          )}
          style={{
            background: `linear-gradient(135deg, ${design.backgroundColor} 50%, ${design.textColor} 50%)`,
          }}
        />
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Dimensions</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {design.width} × {design.height}px
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Font Size</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {design.fontSize}px
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Touch Target</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {design.buttonSize}px
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <ValidationBadge
          status={design.validations.contrastPass ? "pass" : "error"}
          label="Contrast"
          value={`${design.validations.contrastRatio}:1`}
        />
        <ValidationBadge
          status={design.validations.touchTargetPass ? "pass" : "error"}
          label="Touch Target"
        />
        <ValidationBadge
          status={design.validations.fontSizePass ? "pass" : "warning"}
          label="Font Size"
        />
      </div>

      <button
        onClick={handleDelete}
        className="w-full py-2 px-4 rounded-xl border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-sm font-medium hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors active:scale-95"
      >
        Remove Design
      </button>
    </div>
  );
}
"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import type { ProductFilters } from "@/types";

interface FilterSection {
  id: string;
  title: string;
  type: "checkbox" | "range";
  options: { value: string; label: string; count?: number }[];
}

interface FilterSidebarProps {
  sections: FilterSection[];
  activeFilters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  className?: string;
}

export function FilterSidebar({
  sections,
  activeFilters,
  onFilterChange,
  className,
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(sections.map((s) => s.id))
  );

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getFilterValues = (sectionId: string): string[] => {
    switch (sectionId) {
      case "subcategories":
        return activeFilters.subcategories || [];
      case "priceRanges":
        return activeFilters.priceRanges || [];
      case "materials":
        return activeFilters.materials || [];
      case "tags":
        return activeFilters.tags || [];
      default:
        return [];
    }
  };

  const handleCheckboxChange = (sectionId: string, value: string) => {
    const currentValues = getFilterValues(sectionId);
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    onFilterChange({
      ...activeFilters,
      [sectionId]: newValues.length > 0 ? newValues : undefined,
    });
  };

  const activeFilterCount = Object.values(activeFilters).filter(
    (v) => v !== undefined && (Array.isArray(v) ? v.length > 0 : true)
  ).length;

  const clearAll = () => {
    onFilterChange({});
  };

  return (
    <div className={cn("space-y-1", className)}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/50">
        <h3 className="font-heading text-lg font-bold">Filter By</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-terracotta-500 hover:text-terracotta-600 font-medium flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Sections */}
      {sections.map((section) => {
        const isExpanded = expandedSections.has(section.id);
        const selectedValues = getFilterValues(section.id);

        return (
          <div key={section.id} className="border-b border-border/30 py-3">
            <button
              onClick={() => toggleSection(section.id)}
              className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-terracotta-500 transition-colors"
            >
              <span className="flex items-center gap-2">
                {section.title}
                {selectedValues.length > 0 && (
                  <span className="w-4.5 h-4.5 rounded-full bg-terracotta-500 text-white text-[10px] flex items-center justify-center">
                    {selectedValues.length}
                  </span>
                )}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              />
            </button>

            {isExpanded && (
              <div className="mt-2.5 space-y-2 animate-fade-in">
                {section.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <Checkbox
                      checked={selectedValues.includes(option.value)}
                      onCheckedChange={() =>
                        handleCheckboxChange(section.id, option.value)
                      }
                      className="border-border data-[state=checked]:bg-terracotta-500 data-[state=checked]:border-terracotta-500"
                    />
                    <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors flex-1">
                      {option.label}
                    </span>
                    {option.count !== undefined && (
                      <span className="text-xs text-muted-foreground">
                        ({option.count})
                      </span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

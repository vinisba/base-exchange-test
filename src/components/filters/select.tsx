"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

interface SelectFilterProps {
  options?: { label: string | React.ReactNode; value: string }[];
  placeholder?: string;
}

export function SelectFilter({
  options = [],
  placeholder,
  value,
  onValueChange,
  ...props
}: SelectFilterProps & React.ComponentProps<typeof SelectPrimitive.Root>) {
  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onValueChange?.("");
  };

  return (
    <div className="relative w-36">
      <Select onValueChange={onValueChange} value={value} {...props}>
        <SelectTrigger className="w-full max-w-42">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {true && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-8 top-1/2 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

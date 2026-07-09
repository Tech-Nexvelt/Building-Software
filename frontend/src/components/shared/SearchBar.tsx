"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { debounce } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  debounceMs?: number;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  placeholder = "Search...",
  value: externalValue,
  onChange,
  debounceMs = 300,
  className,
  autoFocus = false,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(externalValue ?? "");
  const debouncedOnChange = useRef(debounce(onChange, debounceMs)).current;

  useEffect(() => {
    if (externalValue !== undefined) {
      setLocalValue(externalValue);
    }
  }, [externalValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    debouncedOnChange(val);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <div className={cn("relative flex items-center", className)}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        autoFocus={autoFocus}
        className="pl-9 pr-9 h-9 text-sm"
        aria-label={placeholder}
      />
      {localValue && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 h-7 w-7 hover:bg-transparent"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}

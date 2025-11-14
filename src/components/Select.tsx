import { forwardRef, memo } from "react";
import Label from "./form/Label";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";

import { XIcon } from "lucide-react";

interface Option {
  value: string | number;
  label: string;
}

interface BaseSelectProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
}

const BaseSelectComponent = forwardRef<HTMLButtonElement, BaseSelectProps>(
  (
    {
      id,
      name,
      label,
      placeholder = "Select an option",
      options,
      value,
      onValueChange,
      description,
      error,
      required = false,
      className,
      prefix,
      suffix,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id || name;

    const describedBy = [
      description && `${selectId}-description`,
      error && `${selectId}-error`,
    ]
      .filter(Boolean)
      .join(" ");

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onValueChange?.("");
    };

    return (
      <div className={className}>
        {label && (
          <Label
            name={selectId}
            label={label}
            required={required}
            error={error}
          />
        )}

        <div className={`flex items-center gap-2 ${label ? "mt-2" : ""}`}>
          {prefix && <div className="text-muted-foreground">{prefix}</div>}

          <Select
            value={value?.toString()}
            onValueChange={(val) => onValueChange?.(val)}
          >
            <div className="relative w-full">
              <SelectTrigger
                id={selectId}
                className="w-full cursor-pointer"
                name={name}
                aria-invalid={!!error}
                aria-required={required}
                aria-describedby={describedBy || undefined}
                disabled={disabled}
                ref={ref}
                {...props}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              {value && !disabled && (
                <Button
                  type="button"
                  variant="link"
                  size="icon"
                  className="absolute top-0 right-6 cursor-pointer"
                  onClick={(e) => handleClear(e)}
                  aria-label="Clear selection"
                >
                  <XIcon className="opacity-30 size-4" />
                </Button>
              )}
            </div>

            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value.toString()}
                  className="cursor-pointer"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {suffix && <div className="text-muted-foreground">{suffix}</div>}
        </div>

        {description && !error && (
          <p
            id={`${selectId}-description`}
            className="text-sm text-muted-foreground mt-0.5"
          >
            {description}
          </p>
        )}

        {error && (
          <p
            id={`${selectId}-error`}
            className="text-sm font-normal text-destructive mt-0.5"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

BaseSelectComponent.displayName = "BaseSelect";

const BaseSelect = memo(BaseSelectComponent);

export default BaseSelect;

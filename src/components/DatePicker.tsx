import {
  forwardRef,
  memo,
  useEffect,
  useState,
  type HTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";
import { format as formatDate, startOfDay } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import Label from "./form/Label";
import Button from "./Button";

interface DatePickerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  description?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
  className?: string;
  value?: Date;
  onChange?: (value: Date | undefined) => void;
  format?: string;
  disabled?: boolean;
  align?: "start" | "center" | "end";
  disabledBefore?: Date;
  disabledAfter?: Date;
}

const DatePickerComponent = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      label,
      description,
      placeholder,
      error,
      required = false,
      id,
      name,
      className,
      value,
      onChange,
      format = "LLL dd, y",
      disabled = false,
      align = "end",
      disabledBefore,
      disabledAfter,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;
    const [isOpen, setIsOpen] = useState(false);

    const describedBy = [
      description && `${inputId}-description`,
      error && `${inputId}-error`,
    ]
      .filter(Boolean)
      .join(" ");

    const displayValue = value != null ? formatDate(value, format) : undefined;

    const [isSmallScreen, setIsSmallScreen] = useState(
      typeof window !== "undefined" ? window.innerWidth < 960 : false
    );

    useEffect(() => {
      const resize = () => setIsSmallScreen(window.innerWidth < 960);
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }, []);

    const handleSelect = (date: Date | undefined) => {
      onChange?.(date);
    };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onChange?.(undefined);
    };

    return (
      <div className={cn(className)} {...props}>
        {label && (
          <Label
            name={inputId}
            label={label}
            required={required}
            error={error}
          />
        )}

        <Popover
          modal
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
          }}
        >
          <div className="relative w-full">
            <PopoverTrigger asChild>
              <Button
                ref={ref}
                id={inputId}
                name={name}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal cursor-pointer",
                  label ? "mt-2" : ""
                )}
                aria-invalid={!!error}
                aria-required={required}
                aria-describedby={describedBy || undefined}
                disabled={disabled}
              >
                <CalendarIcon className="text-muted-foreground" />
                {displayValue || <span>{placeholder}</span>}
              </Button>
            </PopoverTrigger>

            {value && !disabled && (
              <Button
                type="button"
                variant="link"
                size="icon"
                className="absolute top-0 right-0 cursor-pointer"
                onClick={(e) => handleClear(e)}
                aria-label="Clear selection"
              >
                <XIcon className="opacity-30 size-4" />
              </Button>
            )}
          </div>

          <PopoverContent className="w-auto p-0" align={align}>
            <div className="flex items-start">
              <div className="flex flex-col">
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={handleSelect}
                  showOutsideDays={false}
                  disabled={(date) => {
                    const beforeLimit = disabledBefore
                      ? date < startOfDay(disabledBefore)
                      : false;

                    const afterLimit = disabledAfter
                      ? date > startOfDay(disabledAfter)
                      : false;

                    return beforeLimit || afterLimit;
                  }}
                />

                {isSmallScreen && (
                  <div className="flex justify-end gap-4 pb-4 pr-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      Close
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {description && !error && (
          <p
            id={`${inputId}-description`}
            className="text-sm text-muted-foreground mt-0.5"
          >
            {description}
          </p>
        )}

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm font-normal text-destructive mt-0.5"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

DatePickerComponent.displayName = "DatePickerComponent";

const DatePicker = memo(DatePickerComponent);

export default DatePicker;

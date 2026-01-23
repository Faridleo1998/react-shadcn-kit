import {
  forwardRef,
  memo,
  useEffect,
  useState,
  type HTMLAttributes,
  type JSX,
} from "react";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";
import { format as formatDate, startOfDay } from "date-fns";
import { CalendarIcon, CheckIcon, XIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import Label from "./form/label";
import Button from "./button";
import Select from "./select";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export interface Preset {
  name: string;
  label: string;
  getValue?: () => DateRange;
}

interface DatePickerRangeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  description?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
  className?: string;
  value?: DateRange;
  onChange?: (value: DateRange | undefined) => void;
  format?: string;
  disabled?: boolean;
  align?: "start" | "center" | "end";
  presets?: Preset[];
  disabledBefore?: Date;
  disabledAfter?: Date;
}

const DatePickerRangeComponent = forwardRef<
  HTMLButtonElement,
  DatePickerRangeProps
>(
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
      presets = [],
      disabledBefore,
      disabledAfter,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
      undefined
    );
    const hasPresets = presets.length > 0;

    const describedBy = [
      description && `${inputId}-description`,
      error && `${inputId}-error`,
    ]
      .filter(Boolean)
      .join(" ");

    const displayValue =
      value?.from &&
      (value?.to
        ? `${formatDate(value.from, format)} - ${formatDate(value.to, format)}`
        : formatDate(value.from, format));

    const [isSmallScreen, setIsSmallScreen] = useState(
      typeof window !== "undefined" ? window.innerWidth < 960 : false
    );

    useEffect(() => {
      const resize = () => setIsSmallScreen(window.innerWidth < 960);
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }, []);

    const handleSelect = (range: DateRange | undefined) => {
      onChange?.(range);
      if (selectedPreset) {
        setSelectedPreset(undefined);
      }
    };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onChange?.(undefined);
      setSelectedPreset(undefined);
    };

    const getPresetRange = (presetName: string): DateRange => {
      const preset = presets.find(({ name }) => name === presetName);
      if (!preset) throw new Error(`Unknown date range preset: ${presetName}`);

      return preset.getValue
        ? preset.getValue()
        : { from: undefined, to: undefined };
    };

    const setPreset = (preset: string): void => {
      const range = getPresetRange(preset);
      onChange?.(range);
    };

    const PresetButton = ({
      preset,
      label,
      isSelected,
    }: {
      preset: string;
      label: string;
      isSelected: boolean;
    }): JSX.Element => (
      <Button
        className={cn(isSelected && "pointer-events-none")}
        variant="ghost"
        onClick={() => {
          setPreset(preset);
          setSelectedPreset(preset);
        }}
      >
        <>
          <span className={cn("pr-2 opacity-0", isSelected && "opacity-70")}>
            <CheckIcon width={18} height={18} />
          </span>
          {label}
        </>
      </Button>
    );

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

            {value?.from && value?.to && !disabled && (
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
            {isSmallScreen && hasPresets && (
              <div className="pt-4 w-[85%] mx-auto">
                <Select
                  options={presets.map((preset) => {
                    return { label: preset.label, value: preset.name };
                  })}
                  onChange={(value: string | number) => {
                    setPreset(String(value));
                  }}
                />
              </div>
            )}
            <div className="flex items-start">
              <div className="flex flex-col">
                <Calendar
                  mode="range"
                  selected={value}
                  onSelect={handleSelect}
                  numberOfMonths={isSmallScreen ? 1 : 2}
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
              {!isSmallScreen && hasPresets && (
                <ScrollArea className="py-2 mr-2 h-80">
                  <div className="flex flex-col gap-1 items-end pr-4">
                    {presets.map((preset) => (
                      <PresetButton
                        key={preset.name}
                        preset={preset.name}
                        label={preset.label}
                        isSelected={selectedPreset === preset.name}
                      />
                    ))}
                  </div>
                  <ScrollBar />
                </ScrollArea>
              )}
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

DatePickerRangeComponent.displayName = "DatePickerRangeComponent";

const DatePickerRange = memo(DatePickerRangeComponent);

export default DatePickerRange;

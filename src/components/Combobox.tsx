import { Check, ChevronsUpDown, XIcon } from "lucide-react";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "./button";
import Label from "./form/label";

export interface ComboboxOption {
  disabled?: boolean;
  label: string;
  value: string;
}

interface ComboboxProps {
  allowClear?: boolean;
  buttonClassName?: string;
  className?: string;
  description?: string;
  disabled?: boolean;
  emptyMessage?: string;
  error?: string;
  height?: string;
  id?: string;
  label?: string;
  name?: string;
  onChange?: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  popoverClassName?: string;
  required?: boolean;
  searchPlaceholder?: string;
  value?: string;
}

const ComboboxComponent = forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      allowClear = false,
      buttonClassName,
      className,
      description,
      disabled = false,
      emptyMessage = "No results found.",
      error,
      height = "h-48",
      id,
      label,
      name,
      onChange,
      options,
      placeholder = "Select an option",
      popoverClassName,
      required = false,
      searchPlaceholder = "Search...",
      value: controlledValue,
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState("");
    const [triggerWidth, setTriggerWidth] = useState(0);

    const triggerRef = useRef<HTMLButtonElement>(null);

    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    const comboboxId = id || name;
    const describedBy = [
      description && `${comboboxId}-description`,
      error && `${comboboxId}-error`,
    ]
      .filter(Boolean)
      .join(" ");

    useEffect(() => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    }, [open]);

    const handleSelect = useCallback(
      (currentValue: string) => {
        const newValue =
          allowClear && currentValue === value ? "" : currentValue;

        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }

        onChange?.(newValue);
        setOpen(false);
      },
      [value, onChange, controlledValue, allowClear]
    );

    const selectedOption = options.find((opt) => opt.value === value);

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onChange?.("");
    };

    return (
      <div className={className}>
        {label && (
          <Label
            name={comboboxId}
            label={label}
            required={required}
            error={error}
          />
        )}
        <Popover open={open} onOpenChange={setOpen}>
          <div className="relative w-full">
            <PopoverTrigger asChild>
              <Button
                ref={ref || triggerRef}
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-invalid={!!error}
                aria-required={required}
                aria-describedby={describedBy || undefined}
                disabled={disabled}
                id={comboboxId}
                name={name}
                className={cn(
                  "w-full justify-between font-normal hover:bg-transparent",
                  label ? "mt-2" : undefined,
                  buttonClassName,
                  !selectedOption &&
                    "text-muted-foreground hover:text-muted-foreground"
                )}
              >
                {selectedOption?.label || placeholder}
                <ChevronsUpDown className="opacity-30" />
              </Button>
            </PopoverTrigger>

            {value && !disabled && allowClear && (
              <Button
                type="button"
                variant="link"
                size="icon"
                className="absolute top-2 right-6 cursor-pointer"
                onClick={(e) => handleClear(e)}
                aria-label="Clear selection"
              >
                <XIcon className="opacity-30 size-4" />
              </Button>
            )}
          </div>
          <PopoverContent
            className={cn("p-0", popoverClassName, height)}
            style={{ width: triggerWidth, height: "auto" }}
          >
            <Command>
              <CommandInput placeholder={searchPlaceholder} className="h-9" />
              <CommandList>
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={handleSelect}
                      className={cn(
                        option.disabled
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      )}
                    >
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {description && !error && (
          <p
            id={`${comboboxId}-description`}
            className="text-sm text-muted-foreground mt-0.5"
          >
            {description}
          </p>
        )}

        {error && (
          <p
            id={`${comboboxId}-error`}
            className="text-sm font-normal text-destructive mt-0.5"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

ComboboxComponent.displayName = "Combobox";

const Combobox = memo(ComboboxComponent);

export default Combobox;

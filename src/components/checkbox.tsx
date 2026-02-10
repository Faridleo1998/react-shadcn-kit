import { forwardRef, type ComponentProps } from "react";
import { Checkbox as CheckboxShadcn } from "@/components/ui/checkbox";
import Label from "./form/label";

interface CheckboxProps extends ComponentProps<typeof CheckboxShadcn> {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  required?: boolean;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      label,
      description,
      error,
      className,
      required = false,
      id,
      name,
      checked,
      onCheckedChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || name;
    const describedBy = [
      description && `${checkboxId}-description`,
      error && `${checkboxId}-error`,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={className}>
        <div className="flex items-start gap-2">
          <CheckboxShadcn
            ref={ref}
            id={checkboxId}
            name={name}
            checked={checked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={describedBy || undefined}
            {...props}
          />
          {label && (
            <div className="grid gap-1.5 leading-none">
              <Label
                name={checkboxId}
                label={label}
                required={required}
                error={error}
              />
              {description && !error && (
                <p
                  id={`${checkboxId}-description`}
                  className="text-sm text-muted-foreground"
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${checkboxId}-error`}
            className="text-sm font-normal text-destructive mt-1 ml-6"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

import { forwardRef, memo, type TextareaHTMLAttributes } from "react";

import { InputGroup } from "./ui/input-group";
import Label from "./form/label";
import { Textarea as TextareaShadcn } from "@/components/ui/textarea";

interface BaseTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "prefix"> {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  required?: boolean;
}

const BaseTextareaComponent = forwardRef<
  HTMLTextAreaElement,
  BaseTextareaProps
>(
  (
    {
      label,
      description,
      error,
      className,
      required = false,
      id,
      name,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = id || name;

    const describedBy = [
      description && `${textareaId}-description`,
      error && `${textareaId}-error`,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={className}>
        {label && (
          <Label
            name={textareaId}
            label={label}
            required={required}
            error={error}
          />
        )}

        <InputGroup className={label ? "mt-2" : undefined}>
          <TextareaShadcn
            ref={ref}
            id={textareaId}
            name={name}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={describedBy || undefined}
            onChange={onChange}
            className="border-0 focus-visible:ring-4"
            {...props}
          />
        </InputGroup>

        {description && !error && (
          <p
            id={`${textareaId}-description`}
            className="text-sm text-muted-foreground mt-0.5"
          >
            {description}
          </p>
        )}

        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-sm font-normal text-destructive mt-0.5"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

BaseTextareaComponent.displayName = "Textarea";

const Textarea = memo(BaseTextareaComponent);

export default Textarea;

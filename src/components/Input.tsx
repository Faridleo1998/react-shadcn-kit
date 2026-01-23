import { forwardRef, memo, type InputHTMLAttributes } from "react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import Label from "./form/label";

interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  required?: boolean;
}

const getInputMode = (
  type?: string
): React.HTMLAttributes<HTMLInputElement>["inputMode"] => {
  if (!type) return undefined;

  const inputModeMap: Record<
    string,
    React.HTMLAttributes<HTMLInputElement>["inputMode"]
  > = {
    email: "email",
    tel: "tel",
    number: "numeric",
    url: "url",
    search: "search",
  };
  return inputModeMap[type];
};

const BaseInputComponent = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      label,
      description,
      error,
      className,
      prefix,
      suffix,
      required = false,
      id,
      name,
      type = "text",
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;
    const describedBy = [
      description && `${inputId}-description`,
      error && `${inputId}-error`,
    ]
      .filter(Boolean)
      .join(" ");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        if (type === "number" && e.target.value !== "") {
          const numericValue = Number(e.target.value);
          const syntheticEvent = {
            ...e,
            target: {
              ...e.target,
              value: numericValue as unknown as string,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        } else {
          onChange(e);
        }
      }
    };

    return (
      <div className={className}>
        {label && (
          <Label
            name={inputId}
            label={label}
            required={required}
            error={error}
          />
        )}

        <InputGroup className={label ? "mt-2" : undefined}>
          {prefix && <InputGroupAddon>{prefix}</InputGroupAddon>}
          <InputGroupInput
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            inputMode={getInputMode(type)}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={describedBy || undefined}
            onChange={handleChange}
            {...props}
          />
          {suffix && (
            <InputGroupAddon align="inline-end">{suffix}</InputGroupAddon>
          )}
        </InputGroup>

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

BaseInputComponent.displayName = "Input";

const Input = memo(BaseInputComponent);

export default Input;

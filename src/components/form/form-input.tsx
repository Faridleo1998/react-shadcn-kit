import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import Input from "../input";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  description?: string;
  className?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  autoFocus?: boolean;
  disabled?: boolean;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  description,
  className,
  required = false,
  prefix,
  suffix,
  autoFocus = false,
  disabled = false,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={className}>
            <Input
              {...field}
              ref={field.ref}
              id={name}
              type={type}
              label={label}
              placeholder={placeholder}
              description={description}
              error={fieldState.error?.message}
              required={required}
              prefix={prefix}
              suffix={suffix}
              autoFocus={autoFocus}
              disabled={disabled}
            />
            <FormMessage className="sr-only" />
          </FormItem>
        );
      }}
    />
  );
};

export default FormInput;

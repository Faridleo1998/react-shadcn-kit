import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import Textarea from "../textarea";

interface TextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  rows?: number;
}

const FormTextarea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  className,
  required = false,
  autoFocus = false,
  disabled = false,
  rows,
}: TextareaProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={className}>
            <Textarea
              {...field}
              ref={field.ref}
              id={name}
              label={label}
              placeholder={placeholder}
              description={description}
              error={fieldState.error?.message}
              required={required}
              autoFocus={autoFocus}
              disabled={disabled}
              rows={rows}
            />
            <FormMessage className="sr-only" />
          </FormItem>
        );
      }}
    />
  );
};

export default FormTextarea;

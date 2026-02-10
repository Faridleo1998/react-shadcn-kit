import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import Checkbox from "../checkbox";

interface CheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  required = false,
  disabled = false,
}: CheckboxProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <Checkbox
            ref={field.ref}
            id={name}
            name={name}
            checked={field.value}
            onCheckedChange={field.onChange}
            label={label}
            description={description}
            error={fieldState.error?.message}
            required={required}
            disabled={disabled}
          />
          <FormMessage className="sr-only" />
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;

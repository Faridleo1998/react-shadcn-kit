import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

import DatePicker from "../DatePicker";

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  format?: string;
  disabledBefore?: Date;
  disabledAfter?: Date;
}

const FormDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  required = false,
  disabled = false,
  format,
  disabledBefore,
  disabledAfter,
}: FormDatePickerProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={className}>
            <DatePicker
              id={name}
              label={label}
              description={description}
              required={required}
              error={fieldState.error?.message}
              value={field.value as Date | undefined}
              onChange={field.onChange}
              format={format}
              disabled={disabled}
              disabledBefore={disabledBefore}
              disabledAfter={disabledAfter}
            />

            <FormMessage className="sr-only" />
          </FormItem>
        );
      }}
    />
  );
};

export default FormDatePicker;

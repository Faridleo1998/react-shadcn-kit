import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

import DatePickerRange, { type Preset } from "../DatePickerRange";
import type { DateRange } from "react-day-picker";

interface FormDatePickerRangeProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  description?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  format?: string;
  presets?: Preset[];
  disabledBefore?: Date;
  disabledAfter?: Date;
}

const FormDatePickerRange = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  className,
  required = false,
  disabled = false,
  format,
  presets,
  disabledBefore,
  disabledAfter,
}: FormDatePickerRangeProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <FormItem className={className}>
            <DatePickerRange
              id={name}
              label={label}
              description={description}
              required={required}
              error={fieldState.error?.message}
              value={field.value as DateRange | undefined}
              onChange={field.onChange}
              format={format}
              disabled={disabled}
              presets={presets}
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

export default FormDatePickerRange;

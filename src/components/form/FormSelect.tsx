import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import Select, { type Option } from "../Select";

interface SelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
  description?: string;
  className?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  disabled?: boolean;
  allowClear?: boolean;
}

const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  description,
  className,
  required = false,
  prefix,
  suffix,
  disabled = false,
  allowClear = false,
}: SelectProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <Select
            id={name}
            name={name}
            label={label}
            placeholder={placeholder}
            options={options}
            value={field.value}
            onValueChange={field.onChange}
            description={description}
            error={fieldState.error?.message}
            required={required}
            prefix={prefix}
            suffix={suffix}
            disabled={disabled}
            allowClear={allowClear}
          />
          <FormMessage className="sr-only" />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;

import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import Combobox, { type ComboboxOption } from "../Combobox";

interface FormComboboxProps<T extends FieldValues> {
  allowClear?: boolean;
  className?: string;
  control: Control<T>;
  description?: string;
  disabled?: boolean;
  emptyMessage?: string;
  height?: string;
  label?: string;
  name: Path<T>;
  options: ComboboxOption[];
  placeholder?: string;
  required?: boolean;
  searchPlaceholder?: string;
}

const FormCombobox = <T extends FieldValues>({
  allowClear = false,
  className,
  control,
  description,
  disabled = false,
  emptyMessage,
  height,
  label,
  name,
  options,
  placeholder,
  required = false,
  searchPlaceholder,
}: FormComboboxProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <Combobox
            allowClear={allowClear}
            description={description}
            disabled={disabled}
            emptyMessage={emptyMessage}
            error={fieldState.error?.message}
            height={height}
            id={name}
            label={label}
            name={name}
            onChange={field.onChange}
            options={options}
            placeholder={placeholder}
            required={required}
            searchPlaceholder={searchPlaceholder}
            value={field.value ?? ""}
          />
          <FormMessage className="sr-only" />
        </FormItem>
      )}
    />
  );
};

export default FormCombobox;

import type { Control, FieldValues, Path } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import Combobox, { type ComboboxOption } from "../Combobox";

interface FormComboboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  options: ComboboxOption[];
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  allowClear?: boolean;
  emptyMessage?: string;
  searchPlaceholder?: string;
}

const FormCombobox = <T extends FieldValues>({
  control,
  name,
  options,
  label,
  placeholder,
  description,
  className,
  disabled = false,
  required = false,
  allowClear = false,
  emptyMessage,
  searchPlaceholder,
}: FormComboboxProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          <Combobox
            options={options}
            value={field.value ?? ""}
            onChange={field.onChange}
            label={label}
            description={description}
            placeholder={placeholder}
            error={fieldState.error?.message}
            disabled={disabled}
            required={required}
            allowClear={allowClear}
            emptyMessage={emptyMessage}
            searchPlaceholder={searchPlaceholder}
            id={name}
            name={name}
          />
          <FormMessage className="sr-only" />
        </FormItem>
      )}
    />
  );
};

export default FormCombobox;

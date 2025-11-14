import { Label as LabelShadcn } from "../ui/label";

interface LabelProps {
  name?: string;
  label?: string;
  required?: boolean;
  error?: string;
}

const Label = ({ name, label, required, error }: LabelProps) => {
  return (
    <LabelShadcn
      htmlFor={name}
      className={`font-normal ${error ? "text-destructive" : ""}`}
    >
      {label}
      {required && <span className="text-destructive">*</span>}
    </LabelShadcn>
  );
};

export default Label;

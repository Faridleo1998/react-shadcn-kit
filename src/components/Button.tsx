import { forwardRef, memo, type ComponentProps } from "react";
import { Button as ButtonShadcn, buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { Spinner } from "./ui/spinner";

interface ButtonWrapperProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonWrapperProps>(
  (
    {
      loading = false,
      disabled,
      variant,
      size,
      asChild,
      icon,
      className,
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <ButtonShadcn
        ref={ref}
        type={type}
        disabled={isDisabled}
        variant={variant}
        size={size}
        asChild={asChild}
        aria-busy={loading}
        aria-disabled={isDisabled}
        aria-live={loading ? "polite" : undefined}
        className={`cursor-pointer ${className}`}
        {...props}
      >
        {loading ? <Spinner /> : icon}
        {children}
      </ButtonShadcn>
    );
  }
);

ButtonComponent.displayName = "Button";

const Button = memo(ButtonComponent);

export default Button;

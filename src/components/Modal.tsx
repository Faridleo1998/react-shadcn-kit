import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  forwardRef,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";
import Button from "./Button";

type DialogContentProps = ComponentPropsWithoutRef<typeof DialogContent>;

interface ModalProps extends Omit<DialogContentProps, "children"> {
  trigger?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footerButtons?: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeButtonText?: string;
  disableCloseButton?: boolean;
  closeButtonPosition?: "left" | "right";
  showFooter?: boolean;
}

const sizeClasses = {
  sm: "sm:max-w-[425px]",
  md: "sm:max-w-[525px]",
  lg: "sm:max-w-[725px]",
  xl: "sm:max-w-[925px]",
  full: "sm:max-w-[95vw]",
} as const;

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      trigger,
      title,
      description,
      children,
      footerButtons,
      open,
      onOpenChange,
      size = "sm",
      showCloseButton = true,
      closeButtonText = "Close",
      disableCloseButton = false,
      closeButtonPosition = "right",
      showFooter = true,
      className,
      ...dialogContentProps
    },
    ref
  ) => {
    const hasFooterContent = showCloseButton || footerButtons;
    const shouldShowFooter = showFooter && hasFooterContent;

    const closeButton = showCloseButton ? (
      <DialogClose asChild>
        <Button
          variant="secondary"
          disabled={disableCloseButton}
          aria-label={closeButtonText}
        >
          {closeButtonText}
        </Button>
      </DialogClose>
    ) : null;

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent
          ref={ref}
          className={`${sizeClasses[size]} ${className || ""}`}
          {...dialogContentProps}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          {children}

          {shouldShowFooter && (
            <DialogFooter>
              {closeButtonPosition === "left" && closeButton}
              {footerButtons}
              {closeButtonPosition === "right" && closeButton}
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;

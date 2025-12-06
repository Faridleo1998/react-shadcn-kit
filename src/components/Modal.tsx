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
import { ScrollArea } from "./ui/scroll-area";

type DialogContentProps = ComponentPropsWithoutRef<typeof DialogContent>;

const sizeClasses = {
  sm: "sm:max-w-[425px]",
  md: "sm:max-w-[525px]",
  lg: "sm:max-w-[725px]",
  xl: "sm:max-w-[925px]",
  full: "sm:max-w-[95vw]",
} as const;

const heightPresets = {
  sm: "50vh",
  md: "70vh",
  lg: "90vh",
  full: "95vh",
  auto: "none",
} as const;

interface ModalProps extends Omit<DialogContentProps, "children"> {
  children: ReactNode;
  closeButtonPosition?: "left" | "right";
  closeButtonText?: string;
  description?: string;
  disableCloseButton?: boolean;
  footerButtons?: ReactNode;
  heightPreset?: "sm" | "md" | "lg" | "full" | "auto";
  maxHeight?: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  showCloseButton?: boolean;
  showFooter?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  title: string;
  trigger?: ReactNode;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      className,
      closeButtonPosition = "right",
      closeButtonText = "Close",
      description,
      disableCloseButton = false,
      footerButtons,
      heightPreset = "lg",
      maxHeight,
      onOpenChange,
      open,
      showCloseButton = true,
      showFooter = true,
      size = "sm",
      title,
      trigger,
      ...dialogContentProps
    },
    ref
  ) => {
    const hasFooterContent = showCloseButton || footerButtons;
    const shouldShowFooter = showFooter && hasFooterContent;

    const finalMaxHeight = maxHeight || heightPresets[heightPreset];

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
          className={`${sizeClasses[size]} ${
            className || ""
          } overflow-hidden grid grid-rows-[auto_1fr_auto]`}
          style={{ maxHeight: finalMaxHeight }}
          {...dialogContentProps}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className={description ? "" : "sr-only"}>
              {description || title}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="overflow-y-auto -mr-4">
            <div className="pr-4">{children}</div>
          </ScrollArea>
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

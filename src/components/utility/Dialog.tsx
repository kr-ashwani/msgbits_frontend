import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { ReactNode } from "react";

interface DialogProps {
  children: ReactNode;
  title?: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmClassName?: string;
  cancelClassName?: string;
  className?: string;
  reverseButtonOrder?: boolean;
  alertDialogProps?: Omit<React.ComponentProps<typeof AlertDialog>, "children">;
}

export function Dialog({
  children,
  title = "Are you sure?",
  description,
  onConfirm,
  onCancel,
  cancelButtonText = "Cancel",
  confirmButtonText = "Continue",
  className = "",
  cancelClassName = "",
  confirmClassName = "",
  reverseButtonOrder = false,
  alertDialogProps = {},
}: DialogProps) {
  const buttons = [
    cancelButtonText.trim().length ? (
      <AlertDialogCancel
        key="cancel"
        onClick={onCancel}
        className={cancelClassName}
      >
        {cancelButtonText}
      </AlertDialogCancel>
    ) : null,
    confirmButtonText.trim().length ? (
      <AlertDialogAction
        key="confirm"
        onClick={onConfirm}
        className={confirmClassName}
      >
        {confirmButtonText}
      </AlertDialogAction>
    ) : null,
  ];

  if (reverseButtonOrder) {
    buttons.reverse();
  }

  return (
    <AlertDialog {...alertDialogProps}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>{buttons}</AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

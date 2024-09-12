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
  continueCallback: () => void;
  cancelCallback?: () => void;
}

export function Dialog({
  children,
  title = "Are you sure?",
  description,
  continueCallback,
  cancelCallback,
}: DialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelCallback}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={continueCallback}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

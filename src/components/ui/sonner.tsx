"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={props["theme"]}
      position="top-right"
      className="toaster group font-montserrat"
      toastOptions={{
        classNames: {
          icon: "size-lg group-data-[type=error]:text-red-500 group-data-[type=success]:text-green-500 group-data-[type=warning]:text-amber-500 group-data-[type=info]:text-blue-500",
          title: "text-sm pb-1",
          toast: `p-3 sm:p-5 max-[600px]:!w-[80%] max-[600px]:!right-[30px] max-[600px]:!left-auto  group toast group-[.toaster]:bg-whilte group-[.toaster]:text-black
             group-[.toaster]:border-slate-100 group-[.toaster]:shadow-[10px_10px_20px_8px_#00000024]  group-[.toaster]:shadow-2xl `,
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

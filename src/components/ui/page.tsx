import { cn } from "@/lib/utils";
import type * as React from "react";

export function Page({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("rounded-xl border bg-card", className)} {...props}>
      {children}
    </div>
  );
}

export function PageTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "flex flex-row gap-2 items-center text-xl font-semibold p-4 border-b",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function PageContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 p-4", className)} {...props}>
      {children}
    </div>
  );
}

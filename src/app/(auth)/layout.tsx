import { BadgeDollarSign } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { APP_NAME } from "@/utils/constans";
import { headers } from "next/headers";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/dashboard");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <span className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BadgeDollarSign className="size-5" />
          </div>
          {APP_NAME}
        </span>
        {children}
      </div>
    </div>
  );
}

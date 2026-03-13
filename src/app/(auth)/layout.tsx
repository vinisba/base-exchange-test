import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { APP_NAME } from "@/utils/constans";
import { headers } from "next/headers";
import { Logo } from "@/components/ui/logo";

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
          <Logo />
          {APP_NAME}
        </span>
        {children}
      </div>
    </div>
  );
}

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Header } from "@/components/layout/header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  return (
    <div className="flex min-h-svh flex-col items-center bg-muted p-4 pt-24 md:p-6 md:pt-28">
      <div className="flex flex-col w-full max-w-6xl gap-6">
        <Header />
        <main className="bg-white">{children}</main>
      </div>
    </div>
  );
}

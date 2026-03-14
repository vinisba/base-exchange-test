import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { NavbarMenu } from "@/components/ui/navbar-menu";
import { Toaster } from "@/components/ui/sonner";
import { NavUser } from "@/components/user/nav-user";
import { auth } from "@/lib/auth";
import { Providers } from "@/lib/providers";
import { Navbar } from "./navbar";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Minhas ordens", href: "/orders" },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default async function AdminLayout({
  children,
  modal,
}: AdminLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  return (
    <Providers>
      <div className="flex min-h-svh flex-col items-center bg-muted p-4 pt-24 md:p-6 md:pt-28">
        <div className="flex flex-col w-full max-w-7xl gap-6">
          <Navbar>
            <Logo />
            <NavbarMenu items={menuItems} />
            <NavUser user={session.user} />
          </Navbar>
          <main>{children}</main>
          {modal}
        </div>
      </div>
      <Toaster position="top-center" />
    </Providers>
  );
}

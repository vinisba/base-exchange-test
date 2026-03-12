import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/client";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  className?: string;
}

function UserAvatar({ src, alt, initials, className }: UserAvatarProps) {
  return (
    <Avatar className={cn("h-8 w-8 rounded-lg", className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
    </Avatar>
  );
}

export function NavUser() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const initials: string = session?.user.name
    ? session?.user.name?.charAt(0).toUpperCase() +
      session?.user.name
        ?.charAt(session?.user.name?.indexOf(" ") + 1)
        .toUpperCase()
    : "";

  function handleLogout() {
    authClient.signOut().then(() => router.push("/sign-in"));
  }

  if (isPending) {
    return <Skeleton className="h-8 w-8 rounded-lg" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-0">
        <UserAvatar
          className="cursor-pointer"
          src={session?.user.image as string | undefined}
          alt={session?.user.name}
          initials={initials}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal text-foreground">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar
              src={session?.user.image as string | undefined}
              alt={session?.user.name}
              initials={initials}
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{session?.user.name}</span>
              <span className="truncate text-xs">{session?.user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          <LogOut />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col gap-4">
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
}

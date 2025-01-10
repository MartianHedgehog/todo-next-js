import { ReactNode } from "react";
import { getSession } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await getSession();

  if (session?.user) {
    redirect("/board");
  }

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow">{children}</main>
    </div>
  );
}

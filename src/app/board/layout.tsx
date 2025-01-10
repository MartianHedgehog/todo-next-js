import { ReactNode } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { redirect } from "next/navigation";
import { getSession } from "@/app/actions";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="w-full h-full">
      <SidebarProvider>
        <AppSidebar session={session} />

        <SidebarInset>
          <header className="flex flex-row-reverse md:flex-row h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />

              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold">Task Board</span>
              </div>
            </div>
          </header>

          {children}
        </SidebarInset>
      </SidebarProvider>
    </main>
  );
}

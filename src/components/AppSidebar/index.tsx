"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { MainNavigation } from "@/components/MainNavigation";
import { MOCK_DATA } from "@/components/AppSidebar/mockData";
import { UserNavigation } from "@/components/UserNavigation";
import { Session } from "next-auth";

// TODO - Add footer to sidebar

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  session: Session;
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      variant={isMobile ? "sidebar" : "floating"}
      {...props}
    >
      <SidebarHeader>
        <UserNavigation user={session.user} />
      </SidebarHeader>
      <SidebarContent>
        <MainNavigation items={MOCK_DATA.navMain} />
      </SidebarContent>
      {/*<SidebarFooter></SidebarFooter>*/}
      <SidebarRail />
    </Sidebar>
  );
}

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

// TODO - Add footer to sidebar

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      variant={isMobile ? "sidebar" : "floating"}
      {...props}
    >
      <SidebarHeader>
        <UserNavigation user={MOCK_DATA.user} />
      </SidebarHeader>
      <SidebarContent>
        <MainNavigation items={MOCK_DATA.navMain} />
      </SidebarContent>
      {/*<SidebarFooter></SidebarFooter>*/}
      <SidebarRail />
    </Sidebar>
  );
}

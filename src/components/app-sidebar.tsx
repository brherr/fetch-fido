import * as React from "react";
import { useLocation } from "@tanstack/react-router";
import { useFidoStore } from "@/lib/store";
import { useSidebar } from "@/components/ui/sidebar";
import { NavMain } from "@/components/nav-main";
import { NavFilters } from "@/components/navFilters";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Dog } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const user = useFidoStore((state) => state.user);
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        {location.pathname === "/" && <NavFilters />}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-center mb-2 gap-2 font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Dog className="size-4" />
          </div>
          {open && "FetchFido"}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

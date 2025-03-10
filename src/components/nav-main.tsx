"use client";

import { Link } from "@tanstack/react-router";
import { ChevronRight, Heart, Dog, type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        <Link to="/">
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Browse Dogs" className="cursor-pointer">
              <Dog />
              <span>Browse Dogs</span>
              <ChevronRight className="ml-auto transition-transform duration-200 " />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>
        <Link to="/favorites">
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Favorites" className="cursor-pointer">
              <Heart />
              <span>Favorites</span>
              <ChevronRight className="ml-auto transition-transform duration-200 " />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>

        {/* {items.map((item) => (
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={item.title}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 " />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))} */}
      </SidebarMenu>
    </SidebarGroup>
  );
}

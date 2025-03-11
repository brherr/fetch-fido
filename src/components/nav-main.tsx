"use client";

import { Link } from "@tanstack/react-router";
import { ChevronRight, Heart, Dog, PawPrint } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({}) {
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
        <Link to="/match">
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Your Match" className="cursor-pointer">
              <PawPrint />
              <span>Your Match</span>
              <ChevronRight className="ml-auto transition-transform duration-200 " />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </Link>
      </SidebarMenu>
    </SidebarGroup>
  );
}

"use client";

import { Link } from "@tanstack/react-router";
import { useFidoStore } from "@/lib/store";
import { ChevronRight, Heart, Dog, PawPrint } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({}) {
  const favorites = useFidoStore((state) => state.favorites);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
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
              {favorites.length > 0 && (
                <div className="pr-0.3 pb-0.45 h-4 w-4 bg-chart-5 rounded-full flex justify-center items-center text-xs font-medium shadow-sm leading-none">
                  {favorites.length}
                </div>
              )}
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

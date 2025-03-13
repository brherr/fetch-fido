import { JSX, ReactNode, useMemo } from "react";
import { useLocation } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface SideBarLayoutT {
  children: ReactNode;
}

export const SideBarWrapper = ({ children }: SideBarLayoutT): JSX.Element => {
  const location = useLocation();
  const baseUrl = import.meta.env.BASE_URL;

  const breadcrumbTitle = {
    "/": "Search Dogs",
    "/favorites": "Choose Your Favorites",
    "/match": "Generate Your Match",
  };

  const getNormalizedPath = (path: string) => {
    if (baseUrl !== "/") {
      if (path.startsWith(baseUrl)) {
        return path.substring(baseUrl.length - 1) || "/";
      }
    }
    return path;
  };

  const normalizedPath = useMemo(
    () => getNormalizedPath(location.pathname),
    [location.pathname, baseUrl]
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">FetchFido</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {breadcrumbTitle[
                      normalizedPath as keyof typeof breadcrumbTitle
                    ] || "Search Dogs"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

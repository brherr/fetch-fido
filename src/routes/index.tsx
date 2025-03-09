import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchDogs } from "@/lib/api/dogData";
import { useSearchDogs } from "@/hooks/dogDataHooks";
import DogCard from "@/components/DogCard";
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

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async ({ context }) => {
    if (!context.user) throw redirect({ to: "/login" });
  },
});

function Index() {
  const searchParams = {
    // size: 10,
    sort: "breed:asc",
  };

  const {
    data: searchData,
    isLoading: searchLoading,
    error: searchError,
  } = useSearchDogs(searchParams);

  const dogIds = searchData?.resultIds ?? [];

  const {
    data: dogDetails,
    isLoading: dogsLoading,
    error: dogsError,
  } = useQuery({
    queryKey: ["fetchDogs", dogIds],
    queryFn: () => fetchDogs(dogIds),
    enabled: dogIds.length > 0,
  });

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
                  <BreadcrumbPage>Find Your New Best Friend</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dogDetails
              ? dogDetails.map((dog) => <DogCard key={dog.id} dog={dog} />)
              : [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-xl bg-muted/50"
                  />
                ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

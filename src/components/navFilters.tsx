import { useState } from "react";
import { useFetchBreeds } from "@/hooks/dogDataHooks";
import { BreedMultiSelect } from "./BreedMultiSelect";
import {
  Folder,
  Forward,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function NavFilters({}) {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const { isMobile } = useSidebar();

  const {
    data: dogBreeds,
    isLoading: breedsLoading,
    error: breedsError,
  } = useFetchBreeds();

  const multiSelectOptions =
    dogBreeds?.map((breed) => ({
      value: breed.toLowerCase().replace(/\s+/g, "-"),
      label: breed,
    })) || [];

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Filters</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem key="Filters">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breed:asc">Breed Ascending</SelectItem>
              <SelectItem value="breed:desc">Breed Descending</SelectItem>
            </SelectContent>
          </Select>
          <BreedMultiSelect
            options={multiSelectOptions}
            onValueChange={setSelectedBreeds}
            defaultValue={selectedBreeds}
            placeholder="Select Breeds..."
            variant="inverted"
            animation={2}
            maxCount={10}
          />
          {/* <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Breeds" />
            </SelectTrigger>
            <SelectContent>
              {dogBreeds?.map((breed) => (
                <SelectItem value={breed}>{breed}</SelectItem>
              ))}
            </SelectContent>
          </Select> */}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

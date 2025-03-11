import { useState } from "react";
import { useFidoStore } from "@/lib/store";
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
  const searchFilters = useFidoStore((state) => state.searchFilters);
  const setSort = useFidoStore((state) => state.setSort);
  const setBreeds = useFidoStore((state) => state.setBreeds);

  const {
    data: dogBreeds,
    isLoading: breedsLoading,
    error: breedsError,
  } = useFetchBreeds();

  const multiSelectOptions =
    dogBreeds?.map((breed) => ({
      value: breed,
      label: breed,
    })) || [];

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Filters</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem className="space-y-3" key="Filters">
          <Select value={searchFilters.sort} onValueChange={setSort}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort " />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breed:asc">Breed (Ascending)</SelectItem>
              <SelectItem value="breed:desc">Breed (Descending)</SelectItem>
              <SelectItem value="name:asc">Name (Ascending)</SelectItem>
              <SelectItem value="name:desc">Name (Descending)</SelectItem>
              <SelectItem value="age:asc">Age (Ascending)</SelectItem>
              <SelectItem value="age:desc">Age (Descending)</SelectItem>
            </SelectContent>
          </Select>
          <BreedMultiSelect
            options={multiSelectOptions}
            onValueChange={setBreeds}
            defaultValue={searchFilters.breeds}
            placeholder="Select Breeds..."
            variant="inverted"
            animation={2}
            maxCount={10}
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

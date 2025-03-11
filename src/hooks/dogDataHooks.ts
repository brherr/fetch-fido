import { useQuery } from "@tanstack/react-query";
import { searchDogs, fetchBreeds, DogSearchResponse } from "@/lib/api/dogData";
import { useFidoStore } from "@/lib/store";

export const useSearchDogs = () => {
  const searchFilters = useFidoStore((state) => state.searchFilters);
  return useQuery<DogSearchResponse, Error>({
    queryKey: ["searchDogs", searchFilters],
    queryFn: () => searchDogs(searchFilters),
  });
};

export const useFetchBreeds = () => {
  return useQuery<string[], Error>({
    queryKey: ["fetchBreeds"],
    queryFn: () => fetchBreeds(),
  });
};

import { useQuery, useMutation } from "@tanstack/react-query";
import {
  searchDogs,
  fetchDogs,
  fetchBreeds,
  DogSearchResponse,
  DogSearchT,
  DogT,
  DogIdsT,
} from "@/lib/api/dogData";
import { useFidoStore } from "@/lib/store";

export const useSearchDogs = () => {
  const searchFilters = useFidoStore((state) => state.searchFilters);
  return useQuery<DogSearchResponse, Error>({
    queryKey: ["searchDogs", searchFilters],
    queryFn: () => searchDogs(searchFilters),
    // enabled: !!searchParams, // prevents fetch if no params
  });
};

// export const useFetchDogs = () => {
//   return useMutation<DogT[], Error, DogIdsT>({
//     mutationFn: (data: DogIdsT) => fetchDogs(data),
//   });
// };

export const useFetchBreeds = () => {
  return useQuery<string[], Error>({
    queryKey: ["fetchBreeds"],
    queryFn: () => fetchBreeds(),
  });
};

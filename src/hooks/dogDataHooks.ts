import { useQuery, useMutation } from "@tanstack/react-query";
import {
  searchDogs,
  fetchDogs,
  DogSearchResponse,
  DogSearchT,
  DogT,
  DogIdsT,
} from "@/lib/api/dogData";

export const useSearchDogs = (searchParams: DogSearchT) => {
  return useQuery<DogSearchResponse, Error>({
    queryKey: ["searchDogs", searchParams],
    queryFn: () => searchDogs(searchParams),
    // enabled: !!searchParams, // prevents fetch if no params
  });
};

export const useFetchDogs = () => {
  return useMutation<DogT[], Error, DogIdsT>({
    mutationFn: (data: DogIdsT) => fetchDogs(data),
  });
};

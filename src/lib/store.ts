import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type UserT = {
  name: string;
  email: string;
};

type SearchFiltersT = {
  size: number;
  sort: string;
  breeds?: string[];
  from?: string;
};

type StateT = {
  user?: UserT;
  favorites: string[];
  searchFilters: SearchFiltersT;
  setUser: (user?: UserT) => void;
  setSort: (sort: string) => void;
  setBreeds: (breeds: string[]) => void;
  setFrom: (from: string) => void;
  resetFilters: () => void;
  addFavorite: (dogId: string) => void;
  removeFavorite: (dogId: string) => void;
  clearFavorites: () => void;
};

const middleware = <T>(f: StateCreator<T>) =>
  devtools(persist(f, { name: "all-storage" }));

export const useFidoStore = create<StateT>()(
  middleware((set, get) => ({
    user: undefined,
    favorites: [],
    searchFilters: {
      size: 24,
      sort: "breed:asc",
      breeds: [],
      from: "",
    },
    setUser: (user) => set({ user }),
    setSort: (sort: string) =>
      set((state) => ({ searchFilters: { ...state.searchFilters, sort } })),
    setBreeds: (breeds: string[]) =>
      set((state) => ({ searchFilters: { ...state.searchFilters, breeds } })),
    setFrom: (from: string) =>
      set((state) => ({ searchFilters: { ...state.searchFilters, from } })),
    resetFilters: () =>
      set(() => ({
        searchFilters: { size: 24, sort: "breed:asc", breeds: [] },
      })),
    addFavorite: (dogId: string) =>
      set((state) => ({ favorites: [...state.favorites, dogId] })),
    removeFavorite: (dogId: string) =>
      set((state) => ({
        favorites: state.favorites.filter((id) => id !== dogId),
      })),
    clearFavorites: () => set({ favorites: [] }),
  }))
);

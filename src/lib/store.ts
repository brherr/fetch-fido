/* eslint-disable @typescript-eslint/no-unused-vars */
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const searchFiltersSchema = z.object({
  size: z.number().default(24),
  sort: z.string().default("breed:asc"),
  breeds: z.array(z.string()).optional(),
  from: z.string().optional(),
});

const stateSchema = z.object({
  user: userSchema.optional(),
  favorites: z.array(z.string()).default([]),
  searchFilters: searchFiltersSchema.default({
    size: 24,
    sort: "breed:asc",
    breeds: [],
    from: "",
  }),
});

export type UserT = z.infer<typeof userSchema>;
export type SearchFiltersT = z.infer<typeof searchFiltersSchema>;
export type StoreStateT = z.infer<typeof stateSchema>;

type StoreActionsT = {
  setUser: (user?: UserT) => void;
  setSort: (sort: string) => void;
  setBreeds: (breeds: string[]) => void;
  setFrom: (from: string) => void;
  resetFilters: () => void;
  addFavorite: (dogId: string) => void;
  removeFavorite: (dogId: string) => void;
  clearFavorites: () => void;
};

type StateT = StoreStateT & StoreActionsT;

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
    setUser: (user) => {
      // validate user if provided
      if (user) {
        const result = userSchema.safeParse(user);
        if (!result.success) {
          console.error("Invalid user data:", result.error);
          return;
        }
      }
      set({ user });
    },
    setSort: (sort: string) => {
      // validate sort string
      if (typeof sort !== "string" || sort.trim() === "") {
        console.error("Invalid sort value");
        return;
      }
      set((state) => ({
        searchFilters: { ...state.searchFilters, sort },
      }));
    },
    setBreeds: (breeds: string[]) => {
      // validate breeds array
      if (!Array.isArray(breeds)) {
        console.error("Breeds must be an array");
        return;
      }
      set((state) => ({
        searchFilters: { ...state.searchFilters, breeds },
      }));
    },
    setFrom: (from: string) => {
      // validate from string
      if (typeof from !== "string") {
        console.error("From must be a string");
        return;
      }
      set((state) => ({
        searchFilters: { ...state.searchFilters, from },
      }));
    },
    resetFilters: () => {
      // get default values from the schema
      const defaults = searchFiltersSchema.parse({
        size: 24,
        sort: "breed:asc",
        breeds: [],
        from: "",
      });
      set(() => ({ searchFilters: defaults }));
    },
    addFavorite: (dogId: string) => {
      // validate dogId
      if (typeof dogId !== "string" || dogId.trim() === "") {
        console.error("Invalid dog ID");
        return;
      }
      // check if already in favorites
      const favorites = get().favorites;
      if (favorites.includes(dogId)) {
        return; // already in favorites
      }
      set((state) => ({ favorites: [...state.favorites, dogId] }));
    },
    removeFavorite: (dogId: string) => {
      // validate dogId
      if (typeof dogId !== "string") {
        console.error("Invalid dog ID");
        return;
      }
      set((state) => ({
        favorites: state.favorites.filter((id) => id !== dogId),
      }));
    },
    clearFavorites: () => set({ favorites: [] }),
  }))
);

// export validator helpers if needed
export const validateUser = (user: unknown): UserT | null => {
  const result = userSchema.safeParse(user);
  return result.success ? result.data : null;
};

export const validateSearchFilters = (
  filters: unknown
): SearchFiltersT | null => {
  const result = searchFiltersSchema.safeParse(filters);
  return result.success ? result.data : null;
};

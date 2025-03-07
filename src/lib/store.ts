import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type UserT = {
  name: string;
  email: string;
};

type StateT = {
  user?: UserT;
  favorites: string[];
  setUser: (user?: UserT) => void;
};

const middleware = <T>(f: StateCreator<T>) =>
  devtools(persist(f, { name: "all-storage" }));

export const useFidoStore = create<StateT>()(
  middleware((set, get) => ({
    user: undefined,
    favorites: [],
    setUser: (user) => set({ user }),
  }))
);

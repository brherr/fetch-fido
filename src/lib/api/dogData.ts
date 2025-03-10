import axiosInstance from "./axios";
import { z } from "zod";

const dogSchema = z.object({
  id: z.string(),
  img: z.string(),
  name: z.string(),
  age: z.number(),
  zip_code: z.string(),
  breed: z.string(),
});
export type DogT = z.infer<typeof dogSchema>;

export const dogSearchSchema = z.object({
  breeds: z.array(z.string()).optional(),
  zipCodes: z.array(z.string()).optional(),
  ageMin: z.number().optional(),
  ageMax: z.number().optional(),
  size: z.number().optional(),
  from: z.string().optional(),
  sort: z.string(),
});
export type DogSearchT = z.infer<typeof dogSearchSchema>;

export interface DogSearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export interface MatchResponseT {
  match: string;
}

export interface DogIdsT {
  dogIds: string[];
}

export const searchDogs = async (
  params: DogSearchT
): Promise<DogSearchResponse> => {
  const response = await axiosInstance.get("/dogs/search", {
    params,
  });
  return response.data;
};

export const fetchDogs = async (dogIds: string[]): Promise<DogT[]> => {
  const response = await axiosInstance.post("/dogs", dogIds);
  return response.data;
};

export const fetchBreeds = async (): Promise<string[]> => {
  const response = await axiosInstance.get("/dogs/breeds");
  return response.data;
};

export const fetchMatch = async (dogIds: string[]): Promise<MatchResponseT> => {
  const response = await axiosInstance.post("/dogs/match", dogIds);
  return response.data;
};

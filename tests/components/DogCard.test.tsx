import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { useFidoStore } from "@/lib/store";
import zipcodes from "zipcodes";
import DogCard from "../../src/components/DogCard";
import { DogT } from "../../src/lib/api/dogData";

vi.mock("@/lib/store");
vi.mock("zipcodes");

const mockedUseFidoStore = vi.mocked(useFidoStore);
const mockedZipcodes = vi.mocked(zipcodes);

describe("DogCard", () => {
  const mockDog: DogT = {
    id: "fido2299",
    name: "Fido",
    breed: "Beagle",
    age: 9,
    zip_code: "90210",
    img: "dog-image.jpg",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockedUseFidoStore.mockImplementation((selector) =>
      selector({
        favorites: [],
        addFavorite: vi.fn(),
        removeFavorite: vi.fn(),
      })
    );

    mockedZipcodes.lookup.mockReturnValue(undefined);
  });

  it("renders dog information correctly", () => {
    render(<DogCard dog={mockDog} />);

    expect(screen.getByText("Fido")).toBeInTheDocument();
    expect(screen.getByText("Beagle")).toBeInTheDocument();
    expect(screen.getByText("Age: 9")).toBeInTheDocument();

    const image = screen.getByAltText("dog-card");
    expect(image).toHaveAttribute("src", "dog-image.jpg");
  });

  it("renders add to favorites button when dog is not a favorite", () => {
    render(<DogCard dog={mockDog} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/add to favorites/i);
  });

  it("renders remove from favorites button when dog is a favorite", () => {
    mockedUseFidoStore.mockImplementation((selector) =>
      selector({
        favorites: ["fido2299"],
        addFavorite: vi.fn(),
        removeFavorite: vi.fn(),
      })
    );

    render(<DogCard dog={mockDog} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/remove from favorites/i);
  });

  it("calls addFavorite when add to favorites button is clicked", () => {
    const mockAddFavorite = vi.fn();
    mockedUseFidoStore.mockImplementation((selector) => {
      const state = {
        favorites: [],
        addFavorite: mockAddFavorite,
        removeFavorite: vi.fn(),
      };
      return selector(state);
    });

    render(<DogCard dog={mockDog} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockAddFavorite).toHaveBeenCalledWith("fido2299");
    expect(mockAddFavorite).toHaveBeenCalledOnce();
  });

  it("calls removeFavorite when remove from favorites button is clicked", () => {
    const mockRemoveFavorite = vi.fn();
    mockedUseFidoStore.mockImplementation((selector) => {
      const state = {
        favorites: ["fido2299"],
        addFavorite: vi.fn(),
        removeFavorite: mockRemoveFavorite,
      };
      return selector(state);
    });

    render(<DogCard dog={mockDog} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockRemoveFavorite).toHaveBeenCalledWith("fido2299");
    expect(mockRemoveFavorite).toHaveBeenCalledOnce();
  });
});

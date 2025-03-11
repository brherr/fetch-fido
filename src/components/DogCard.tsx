import React, { useState, useEffect } from "react";
import { useFidoStore } from "@/lib/store";
import zipcodes from "zipcodes";
import { Button } from "@/components/ui/button";
import { DogT } from "@/lib/api/dogData";
import { Heart } from "lucide-react";

const DogCard: React.FC<{ dog: DogT }> = ({ dog }) => {
  const [cityState, setCityState] = useState(dog.zip_code);

  const { addFavorite } = useFidoStore((state) => state);
  const { removeFavorite } = useFidoStore((state) => state);

  const isInFavoritesState = (dogId: string) => {
    const favorites = useFidoStore((state) => state.favorites);
    return favorites.includes(dogId);
  };

  const isFavorite = isInFavoritesState(dog.id);

  useEffect(() => {
    const locationData = zipcodes.lookup(dog.zip_code);

    if (locationData) {
      setCityState(`${locationData.city}, ${locationData.state}`);
    } else {
      setCityState(`Zipcode: ${dog.zip_code}`);
    }
  }, [dog.zip_code]);

  return (
    <div className="flex flex-col h-full bg-card shadow-sm border border-slate-200 rounded-lg overflow-hidden transition duration-300 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={dog.img}
          alt="dog-card-image"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-card-foreground text-xl font-semibold">
            {dog.name}
          </p>
          <p className="text-cyan-600 text-base font-semibold">{dog.breed}</p>
        </div>
        <div className="flex-grow space-y-1">
          <p className="text-slate-400 text-sm">Age: {dog.age}</p>
          <p className="text-slate-400 text-sm">{cityState}</p>
        </div>
        <Button
          className={`rounded-md w-full mt-6 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg active:shadow-none cursor-pointer ${
            isFavorite
              ? "bg-cyan-700 text-white hover:bg-chart-1 active:bg-chart-1"
              : "bg-chart-5 text-white hover:bg-cyan-700 active:bg-cyan-700"
          }`}
          type="button"
          onClick={() =>
            isFavorite ? removeFavorite(dog.id) : addFavorite(dog.id)
          }
        >
          <Heart />
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </div>
    </div>
  );
};

export default DogCard;

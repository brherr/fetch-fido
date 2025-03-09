import React, { useState, useEffect } from "react";
import zipcodes from "zipcodes";
import { Button } from "@/components/ui/button";
import { DogT } from "@/lib/api/dogData";
import { Heart } from "lucide-react";

const DogCard: React.FC<{ dog: DogT }> = ({ dog }) => {
  const [cityState, setCityState] = useState(dog.zip_code);

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
          alt="card-image"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-card-foreground text-xl font-semibold">
            {dog.name}
          </p>
          <p className="text-cyan-600 text-xl font-semibold">{dog.breed}</p>
        </div>
        <div className="flex-grow space-y-1">
          <p className="text-slate-400 text-sm">Age: {dog.age}</p>
          <p className="text-slate-400 text-sm">{cityState}</p>
        </div>
        <Button
          className="rounded-md w-full mt-6 bg-chart-5 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg  focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          <Heart />
          Add to Favorites
        </Button>
      </div>
    </div>
  );
};

export default DogCard;

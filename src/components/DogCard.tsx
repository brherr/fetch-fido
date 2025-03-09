import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { DogT } from "@/lib/api/dogData";

const DogCard: React.FC<{ dog: DogT }> = ({ dog }) => {
  console.log("🚀 ~ DogCard ~ dog:", dog);
  return (
    <Card className="relative w-full max-w-xs flex flex-col rounded-xl shadow-lg overflow-hidden">
      {/* Background Image */}
      <div className="relative w-full h-60">
        <img
          src={dog.img}
          alt={dog.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Favorite Button - Top Right */}
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 bg-black/50 text-white "
        >
          ❤️
        </Button>

        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/100 to-transparent p-3 flex justify-between text-white">
          <div>
            <p className="text-lg font-bold">{dog.name}</p>
            <p className="text-sm">{dog.breed}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">
              <strong>Age:</strong> {dog.age}
            </p>
            <p className="text-sm">
              <strong>Location:</strong> {dog.zip_code}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DogCard;

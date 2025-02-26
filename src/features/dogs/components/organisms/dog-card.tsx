import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dog } from "@/features/dogs/types/models/dog";
import { Heart } from "lucide-react";
import { FC } from "react";
import { Button } from "../../../../components/ui/button";
interface DogCardProps {
  dog: Dog
  isFavorite: boolean
  onFavoriteToggle: (dog: Dog) => void
}
export const DogCard: FC<DogCardProps> = ({ dog, onFavoriteToggle, isFavorite }) => (<Card >
  <CardHeader>
    <img
      alt={`Photo of ${dog.name}`}
      className="aspect-square w-full object-cover rounded-md"
      src={dog.img}
    />
    <CardTitle className="font-medium text-lg">{dog.name}</CardTitle>


  </CardHeader>
  <CardContent>

    <div className="flex flex-col">
      <div><span className="font-medium">Breed:</span> {dog.breed}</div>
      <div><span className="font-medium">Age:</span> {dog.age} {dog.age === 1 ? "year" : "years"}</div>
      <div><span className="font-medium">Location (zip):</span> {dog.zip_code}</div>
    </div>
  </CardContent>

  <CardFooter>
    <Button variant="ghost" size="icon" onClick={() => onFavoriteToggle(dog)} className={isFavorite ? 'text-red-300' : 'text-grey-300'} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} /></Button>
  </CardFooter>
</Card>)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dog } from "@/features/dogs/types/models/dog";
import { FC } from "react";
interface DogCardProps {
  dog: Dog
}
export const DogCard: FC<DogCardProps> = ({ dog }) => (<Card >
  <CardHeader>
    <img
      alt={`Photo of ${dog.name}`}
      className="aspect-square h-48 w-full object-cover"
      src={dog.img}
    />
    <CardTitle>{dog.name}</CardTitle>
    <CardDescription>
      <ul>
        <li>Breed: {dog.breed}</li>
        <li>Age: {dog.age}</li>
      </ul>
    </CardDescription>
  </CardHeader>
  <CardContent>

  </CardContent>
</Card>)
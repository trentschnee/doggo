import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { batchGetDogs } from "@/features/dogs/api";
import { Dog } from "@/features/dogs/types/models/dog";
import { useEffect, useState } from "react";

interface MatchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  matchedDogId: string | null;
}

export const MatchDialog: React.FC<MatchDialogProps> = ({
  isOpen,
  onClose,
  matchedDogId,
}) => {
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMatchedDog = async () => {
      if (matchedDogId) {
        setIsLoading(true);
        try {
          const dogs = await batchGetDogs([matchedDogId]);
          if (dogs && dogs.length > 0) {
            setMatchedDog(dogs[0]);
          }
        } catch (error) {
          console.error("Failed to fetch matched dog:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (isOpen && matchedDogId) {
      fetchMatchedDog();
    } else {
      setMatchedDog(null);
    }
  }, [isOpen, matchedDogId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Your Perfect Match!</DialogTitle>
          <DialogDescription>
            We found the perfect dog for you based on your favorites.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (

          <p>Finding your perfect match...</p>

        ) : matchedDog ? (

          <div className="flex flex-col items-center space-y-4">
            {matchedDog.img && (
              <div className="w-full overflow-hidden rounded-md">
                <img
                  src={matchedDog.img}
                  alt={`Photo of ${matchedDog.name}`}

                />
              </div>
            )}

            <div className="text-center">
              <h2 className="text-2xl font-bold">{matchedDog.name}</h2>
              <p className="text-muted-foreground">{matchedDog.breed}</p>
              <p>
                {matchedDog.age} {matchedDog.age === 1 ? "year" : "years"} old
              </p>
              <p>Location (zip): {matchedDog.zip_code}</p>
            </div>


          </div>
        ) : (
          <p>No match found. Please try again.</p>

        )}

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
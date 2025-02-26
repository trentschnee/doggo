
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { batchGetDogs } from "@/features/dogs/api"
import { DogCard } from "@/features/dogs/components/organisms/dog-card"
import { useDogBreeds, useDogSearch } from "@/features/dogs/hooks"
import { SearchFilters } from "@/features/dogs/types"
import { Dog } from "@/features/dogs/types/models/dog"
import { useCallback, useEffect, useState } from "react"
import { FilterForm } from "../../features/dogs/components/organisms/filter-form/filter-form.component"


export const DoggosPage: React.FC = () => {
  const { logout } = useAuth();

  const { data: breeds = [] } = useDogBreeds();
  const [filters, setFilters] = useState<SearchFilters>({
    breeds: [],
    sortBy: "breed",
    sortOrder: "asc",
    pageSize: 16
  });

  const { data: searchResults, isLoading: searchResultsLoading, refetch } = useDogSearch(filters);





  const handleFilterSubmit = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    refetch();
  };
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchDogs = async () => {
      if (searchResults?.dogIds) {
        // Process in chunks of 100 as per API requirement
        const allDogs: Dog[] = [];
        for (let i = 0; i < searchResults.dogIds.length; i += 100) {
          const chunk = searchResults.dogIds.slice(i, i + 100);
          const batchResult = await batchGetDogs(chunk);
          allDogs.push(...batchResult);
        }
        setDogs(allDogs);
      }
    };
    fetchDogs();
  }, [searchResults?.dogIds]);

  /**
   * Favorites functionality
   * stores the dog ids in the state for matching later
   */
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  // uses useCallback to memoize the function
  const handleFavoriteToggle = useCallback((dog: Dog) => {
    setFavoriteIds((prev => {
      if (prev.includes(dog.id)) {
        return prev.filter(id => id !== dog.id)
      }
      else {
        return [...prev, dog.id]
      }
    }))
  }, [])
  const isFavorite = useCallback((dogId: string) => favoriteIds.some((dog) => dog === dogId), [favoriteIds])
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b ">
        <div className="container mx-auto max-w-6xl px-4 flex items-center justify-between h-16 gap-4">

          <h4>Doggo Finder</h4>
          {/* <Input className="flex-1" type="email" placeholder="Border Collie" /> */}
          <Button variant={"link"} onClick={() => logout()}>Logout</Button>
        </div>
      </header>
      <div className="flex-1 py-6">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex gap-8 ">
            <aside>
              <FilterForm isLoading={searchResultsLoading} breeds={
                breeds
              } onSubmit={handleFilterSubmit} />
            </aside>
            <main className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {dogs.map((dog, id) => (
                  <DogCard key={id} dog={dog} onFavoriteToggle={handleFavoriteToggle} isFavorite={isFavorite(dog.id)} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
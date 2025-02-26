
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { batchGetDogs } from "@/features/dogs/api"
import { DogCard } from "@/features/dogs/components/organisms/dog-card"
import { MatchDialog } from "@/features/dogs/components/organisms/matched-dog-dialog"
import { useDogBreeds, useDogSearch } from "@/features/dogs/hooks"
import { SearchFilters } from "@/features/dogs/types"
import { Dog } from "@/features/dogs/types/models/dog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { FilterForm } from "../../features/dogs/components/organisms/filter-form/filter-form.component"
import { useMatchDogs } from "../../features/dogs/hooks/use-dog-match"


export const DoggosPage: React.FC = () => {
  const { logout } = useAuth();

  const { data: breeds = [] } = useDogBreeds();
  const [filters, setFilters] = useState<SearchFilters>({
    breeds: [],
    sortBy: "breed",
    sortOrder: "asc",
    pageSize: 12
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
  /**
   * Pagination functionality
   */
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = useCallback(() => {
    if (searchResults?.nextCursor) {
      setFilters(prev => ({
        ...prev,
        cursor: searchResults.nextCursor
      }));
      setCurrentPage(prev => prev + 1);
    }
  }, [searchResults?.nextCursor]);

  const handlePreviousPage = useCallback(() => {
    if (searchResults?.previousCursor) {
      setFilters(prev => ({
        ...prev,
        cursor: searchResults.previousCursor
      }));
      setCurrentPage(prev => prev - 1);
    }
  }, [searchResults?.previousCursor]);
  /**
   * Matching functionality
   */
  const [matchedDialogIsOpen, setMatchedDialogOpen] = useState(false);
  const [matchedDogId, setMatchedDogId] = useState<string | null>(null);

  const close = () => {
    setMatchedDialogOpen(false);
  };
  const matchMutation = useMatchDogs({
    onMatchSuccess: (matchId) => {
      setMatchedDogId(matchId);
      setMatchedDialogOpen(true);
    }
  });
  const handleMatch = () => {
    if (favoriteIds.length > 0) {
      matchMutation.mutate(favoriteIds);
    }
  };
  const isFavorite = useCallback((dogId: string) => favoriteIds.some((dog) => dog === dogId), [favoriteIds])
  return (
    <>
      <div className="flex min-h-screen flex-col">

        <header className="w-full border-b ">
          <div className="container mx-auto max-w-6xl px-4 flex items-center justify-between h-16 gap-4">

            <h4>Doggo Finder</h4>
            <Button variant={"link"} onClick={() => logout()}>Logout</Button>
          </div>
        </header>
        <div className="flex-1 py-6">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex gap-8 h-[calc(100vh-8rem)]">
              <aside className="w-60 flex-shrink-0">

                <FilterForm isLoading={searchResultsLoading} breeds={
                  breeds
                } onSubmit={handleFilterSubmit} />
                <Button
                  onClick={handleMatch}
                  disabled={favoriteIds.length === 0 || matchMutation.isPending}
                  variant="default"
                  className="w-full"
                >
                  {matchMutation.isPending ? 'Finding match...' : 'Find My Match!'}
                </Button>
              </aside>
              <main className="flex-1 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold">Available Dogs</h2>
                    {favoriteIds.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {favoriteIds.length} {favoriteIds.length === 1 ? 'dog' : 'dogs'} favorited
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
                    {dogs.map((dog, id) => (
                      <DogCard key={id} dog={dog} onFavoriteToggle={handleFavoriteToggle} isFavorite={isFavorite(dog.id)} />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between space-x-2 mt-auto pt-2">
                  <Button variant="outline" size="sm" disabled={!searchResults?.hasPreviousPage} onClick={handlePreviousPage}>    <ChevronLeft className="h-4 w-4 mr-1" /> Previous</Button>
                  <span>Page:{currentPage}</span>
                  <Button variant="outline" size="sm" disabled={!searchResults?.hasNextPage} onClick={handleNextPage}>Next   <ChevronRight className="h-4 w-4 ml-1" /></Button>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <MatchDialog isOpen={matchedDialogIsOpen} matchedDogId={matchedDogId} onClose={close} /></>
  )
}
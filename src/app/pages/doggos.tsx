
import { useDogSearch } from "@/features/dogs/hooks"
import { SearchFilters } from "@/features/dogs/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useAuth } from "../../features/auth/hooks/use-auth"


export const DoggosPage: React.FC = () => {
  const { logout } = useAuth();
  const filters: SearchFilters = {
    breeds: [],
    sortBy: 'breed',
    sortOrder: 'asc',
    pageSize: 25
  }
  const { data: searchResults, isLoading } = useDogSearch(filters)

  return (<>
    <header>
      <div className="container ">
        <div className="flex items-center gap-1">
          <h4>Doggo Finder</h4>
          <Input className="flex-1" type="email" placeholder="Border Collie" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>username</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem onClick={() => logout()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

    </header>
    <main>
      <div className="min-h-screen">
        {searchResults && searchResults.dogIds.map((dogId, idx) => (<p key={idx}>{dogId}</p>))}
      </div>
    </main>
  </>
  )
}
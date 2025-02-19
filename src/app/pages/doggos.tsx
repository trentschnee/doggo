
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

  return (<div className="flex min-h-screen flex-col">
    <header className="w-full border-b ">
      <div className="container mx-auto max-w-6xl px-4 flex items-center justify-between h-16 gap-4">

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

    </header>
    <main className="flex-1">
      <div className="container mx-auto max-w-6xl px-4">
        content
        {/* <div className="min-h-screen">
        {searchResults && searchResults.dogIds.map((dogId, idx) => (<p key={idx}>{dogId}</p>))}
      </div> */}
      </div>

    </main>
  </div>
  )
}